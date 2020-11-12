import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import * as Location from "expo-location";
import { Platform } from "react-native";

import { verifyPermission, loadShops } from "@redux/shops/action";

import styles from "./styles";
import clone from "clone";

import { Text, View } from "@components/atoms";

import { Card, CardSection } from "@components/molecules";

import Icon from "react-native-vector-icons/FontAwesome";

import { ShopList } from "@components/templates";

const ITEMS_PER_PAGE = 10;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataSource: [],
      filteredData: [],
      page: 0,
      // isLoading:false,
      isRefreshing: false,
      tags: props.tags,
      categories: props.categories,
      selectedCategory: props.selectedCategory,
      selectedTag: "All", //default all tag selected
    };

    this.onSubscribePressed = this.onSubscribePressed.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.filterData = this.filterData.bind(this);
  }

  // old ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  componentDidMount = async () => {
    this.props.verifyPermission().then((permissions) => {
      if (permissions.location !== "granted") {
        alert("Permission to access location is necessary");
      } else this.handleRefresh();
      // if (parseInt(Platform.Version) <= 28) {
      //   if (permissions.location !== "granted") {
      //     alert("Permission to access location is necessary");
      //   } else this.handleRefresh();
      // } else if (parseInt(Platform.Version) > 28) {
      //   if (
      //     permissions.location !== "granted" ||
      //     permissions.location.permissions.location.foregroundGranted === "undefined"
      //       ? false
      //       : false
      //   ) {
      //     alert("Permission to access location is necessary");
      //   } else this.handleRefresh();
      // }
    });
  };

  handleRefresh = async () => {
    const radius = 50;
    let i = 1;
    this.setState({ isRefreshing: true });
    //this.setState({ selectedCategory: this.props.selectedCategory });
    let location = await Location.getCurrentPositionAsync({});
    do {
      await this.props
        .loadShops({
          radius: radius * i,
          latitude: location.coords.latitude,
          longtitude: location.coords.longitude,
          //selectedCategory: this.props.selectedCategory ? this.props.selectedCategory : null,
          selectedCategory: this.state.selectedCategory.id
            ? this.state.selectedCategory.id
            : this.props.selectedCategory.id,
        })
        .then((Data) => {
          this.setState({ dataSource: Data, page: 0, data: [] });
          Data.length !== 0 && this.filterData();
        })
        .catch((error) => {
          alert(error);
        });
      i = i * 3;
    } while (this.state.dataSource.length === 0 && radius * i < 1000);
    this.setState({
      isRefreshing: false,
      //isLoading:false
    });
    i = 1;
    //console.log(this.state.dataSource.length)
  };

  handleLoadMore() {
    //this.setState({isLoading:true})
    const { page, data } = this.state;
    const start = page * ITEMS_PER_PAGE;
    const end = (page + 1) * ITEMS_PER_PAGE;

    const newData = this.state.filteredData.slice(start, end); // here, we will receive next batch of the items
    this.setState({ data: [...data, ...newData], page: page + 1 }); // here we are appending new batch to existing batch
  }

  filterData() {
    const filteredData =
      this.state.selectedTag !== "All"
        ? this.state.dataSource.filter((item) => {
            return item.tags
              .map((tag) => {
                return tag;
              })
              .includes(this.state.selectedTag);
          })
        : this.state.dataSource;
    const dataDisplay = [];
    filteredData.map((data) => {
      dataDisplay.push({
        ...data,
        //subscribed: this.props.subscribedList.includes(data.id)
      });
    });
    this.setState({ filteredData: dataDisplay, page: 0, data: [] });
    this.handleLoadMore();
  }

  renderFooter({ empty }) {
    if (empty) {
      return (
        // this.state.isLoading?
        // <View style={styles.loader}>
        //     <ActivityIndicator size="large"/>
        // </View> :null
        Platform.OS === "ios" ? (
          <Card style={{ backgroundColor: "transparent" }}>
            <CardSection style={styles.emptySection}>
              <Icon name="inbox" size={64} style={styles.emptyIcon} />
              <Text style={styles.emptyText}>NO MERCHANT FOUND</Text>
            </CardSection>
          </Card>
        ) : (
          <Card style={{ backgroundColor: "transparent", elevation: 0 }}>
            <CardSection style={[styles.emptySection, { elevation: 0 }]}>
              <Icon name="inbox" size={64} style={styles.emptyIcon} />
              <Text style={styles.emptyText}>NO MERCHANT FOUND</Text>
            </CardSection>
          </Card>
        )
      );
    } else {
      return <View style={{ marginBottom: 10 }} />;
    }
  }

  onMerchantPressed(item) {
    Actions.SingleMerchant({ shopId: item.id });
  }

  onSubscribePressed = async (status, shopID, index) => {
    const data = this.state.data;
    //console.log(this.props.idToken)
    let subscribedList = this.props.subscribedList;

    if (!status) {
      subscribedList.push(shopID);
      this.props.updateSubscribeList({ subscribedList });
      data[index].subscribed = true;
      this.setState({ data: data });

      fetch(`${FIREBASE_CLOUD_FUNCTION}/subscribes/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
          Authorization: "Bearer" + this.props.idToken,
        },
        body: JSON.stringify({ shopID }),
      })
        .then(async (response) => {
          const responseJson = await response.json();

          if (response.status === 200) {
          } else {
            console.log("Subscribe error :" + JSON.stringify(responseJson));
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      subscribedList = subscribedList.filter((item) => item !== shopID);
      this.props.updateSubscribeList({ subscribedList });
      data[index].subscribed = false;
      this.setState({ data: data });

      fetch(`${FIREBASE_CLOUD_FUNCTION}/subscribes/unsubscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
          Authorization: "Bearer" + this.props.idToken,
        },
        body: JSON.stringify({ shopID }),
      })
        .then(async (response) => {
          const responseJson = await response.json();

          if (response.status === 200) {
          } else {
            console.log("unSubscribe error :" + JSON.stringify(responseJson));
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  onCategoryChange = (value) => {
    console.log("selected: " + value);
    this.setState({ selectedCategory: value, selectedTag: "All" });
    this.handleRefresh();
  };

  onTagChange = (value) => {
    this.setState({ selectedTag: value });
    this.handleRefresh();
    this.filterData();
  };

  render() {
    return (
      <ShopList
        handleRefresh={this.handleRefresh.bind(this)}
        handleLoadMore={this.handleLoadMore.bind(this)}
        filterData={this.filterData.bind(this)}
        renderFooter={this.renderFooter.bind(this)}
        onMerchantPressed={this.onMerchantPressed.bind(this)}
        onSubscribePressed={this.onSubscribePressed.bind(this)}
        onCategoryChange={this.onCategoryChange.bind(this)}
        onTagChange={this.onTagChange.bind(this)}
        state={this.state}
        props={this.props}
        displayCategory={this.props.selectedCategory.id}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { categories, tags } = state.Settings;
  const { uid } = state.Auth.user;
  const { subscribedList, idToken } = state.Auth;
  const { shops } = state.Shops;

  return { categories, tags, uid, idToken, subscribedList, shops };
};

export default connect(mapStateToProps, { verifyPermission, loadShops })(index);
