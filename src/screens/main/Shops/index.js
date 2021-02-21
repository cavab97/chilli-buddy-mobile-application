import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import * as Location from "expo-location";

import {
  toggleCategory,
  toggleFavourite,
  toggleTag,
  verifyPermission,
  loadShops,
  onFavouriteClick,
} from "@redux/shops/action";

import {
  update,
  submitToBackend,
  readFromDatabase,
  updateIsFavourite,
} from "@redux/favourite/action";

import clone from "clone";

import { ShopList } from "@components/templates";

const ITEMS_PER_PAGE = 10;
const RADIUS = 50;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radiusAddition: 1,
      data: [],
      dataSource: [],
      filteredData: [],
      page: 0,
      // isLoading:false,
      isRefreshing: false,
      tags: props.tags,
      categories: props.categories,
      selectedCategory: { id: "", tags: ["All"], title: "All" },
      selectedTag: "All", //default all tag selected
    };
    //this.onSubscribePressed = this.onSubscribePressed.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    //this.renderFooter = this.renderFooter.bind(this);
    this.filterData = this.filterData.bind(this);
  }

  // old ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  componentDidMount = async () => {
    //this.handleRefresh();
    this.props.verifyPermission().then((permissions) => {
      if (permissions.location !== "granted") {
        if (permissions.location.permissions.location.foregroundGranted === undefined) {
          alert("Permission to access location is necessary");
          this.handleRefresh();
        } else if (permissions.location.permissions.location.foregroundGranted === true) {
          this.handleRefresh();
        }
      } else this.handleRefresh();
    });
  };

  handleRefresh = async () => {
    const { categories } = this.props;
    let filteredCategories = categories.filter((category) => category.title !== "All");

    let location = await Location.getCurrentPositionAsync({});

    await this.props.loadShops({
      radius: RADIUS * this.state.radiusAddition,
      latitude: location.coords.latitude,
      longtitude: location.coords.longitude,
      selectedCategory: this.state.selectedCategory.id ? this.state.selectedCategory.id : null,
      selectedTag: this.state.selectedTag !== "All" ? this.state.selectedTag : null,
    });

    await this.props.toggleCategory(filteredCategories[0].id);
    //await this.props.readFromDatabase();
  };

  componentDidUpdate(prevProps, prevState) {
    const currentShop = this.props.shopState.shops;
    const readError = this.props.shopState.readError;
    // const readLoading = this.props.bookmarkState.readLoading;

    // if no shop in the radius, call handleRefresh read again by increase radiusAddition state
    if (currentShop.length === 0 && RADIUS * this.state.radiusAddition < 1000) {
      if (prevState.radiusAddition === this.state.radiusAddition) {
        this.setState({ radiusAddition: this.state.radiusAddition * 3 });
      }
      this.handleRefresh();
    }

    // if get shop in the radius, reset the radiusAddition to 1 for read next time
    if (prevProps.shopState.shops !== currentShop && currentShop.length > 0) {
      this.setState({ radiusAddition: 1 });
    }

    if (prevProps.shopState.readError !== readError && readError !== false) {
      alert(readError);
    }
  }

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

  onCategorySelected(id = null) {
    this.props.toggleCategory(id);
  }

  onFavouriteFiltered() {
    this.props.toggleFavourite();
  }

  onMerchantPressed(item) {
    console.log(item.category);
    Actions.SingleMerchant({
      shopId: item.id,
      distance: item.distance,
      categoryName: item.category,
    });
  }

  onCategoryChange = (value) => {
    this.setState({ selectedCategory: value, selectedTag: "All" });
    this.handleRefresh();
  };

  onTagChange = (tag) => {
    /* this.setState({ selectedTag: value });
    this.handleRefresh();
    this.filterData(); */
    this.props.toggleTag(tag.id);
  };

  lookingForFavourite({ shopId } = null) {
    const favourites = this.props.favouriteState.favourites;

    let favouriteId = null;

    favourites.forEach((favourite) => {
      if (favourite.shopIds[0] === shopId) {
        favouriteId = favourite.id;
      }
    });
    return favouriteId;
  }

  onFavouritePressed = async (item) => {
    const shopId = item.id;
    // console.log(shopId);
    const favouriteId = this.lookingForFavourite({ shopId });
    const isFavourite = !item.isFavourite;
    // console.log("favouriteId");

    // console.log(favouriteId);
    this.props.onFavouriteClick(shopId);
    this.props.updateIsFavourite(shopId);

    if (favouriteId === null) {
      const data = { shopId, isFavourite };
      await this.props.submitToBackend(data, "create");
    } else {
      const data = { favouriteId, isFavourite };
      await this.props.submitToBackend(data, "update");
    }
  };

  render() {
    const {
      shops,
      selectedCategory,
      favouriteControl,
      selectedTag,
      loading,
    } = this.props.shopState;

    const { categories, tags } = this.props;

    let filteredShop;
    let filteredCategories;
    let selectedCategoryTag;
    let filteredTags = [];

    // Get Shop Category
    shops.map((shop) => {
      let shopCategory = categories.filter((category) => category.id === shop.categories[0]);

      shopCategory ? (shop.category = shopCategory[0].title) : "";
    });

    // Remove all category
    filteredCategories = categories.filter((category) => category.title !== "All");

    // On toggle category get category shop
    selectedCategory
      ? (filteredShop = shops.filter((shop) => shop.categories[0] === selectedCategory))
      : (filteredShop = shops.filter((shop) => shop.categories[0] === filteredCategories[0].id));

    // On toggle favourite get favourite shop
    favouriteControl
      ? (filteredShop = filteredShop.filter((shop) => shop.isFavourite === true))
      : filteredShop;

    selectedTag
      ? (filteredShop = filteredShop.filter((shop) => shop.tags.includes(selectedTag) === true))
      : filteredShop;

    if (selectedCategory) {
      selectedCategoryTag = filteredCategories.filter(
        (category) => category.id === selectedCategory
      );
      selectedCategoryTag = selectedCategoryTag[0].tags.filter((tags) => tags !== "All");

      tags.forEach((tag) =>
        selectedCategoryTag.forEach((categoryTag) => {
          if (tag.id === categoryTag) {
            filteredTags.push(tag);
          }
        })
      );
    }

    return (
      <ShopList
        handleRefresh={this.handleRefresh.bind(this)}
        handleLoadMore={this.handleLoadMore.bind(this)}
        filterData={this.filterData.bind(this)}
        //renderFooter={this.renderFooter.bind(this)}
        onFavouritePressed={this.onFavouritePressed.bind(this)}
        onMerchantPressed={this.onMerchantPressed.bind(this)}
        onCategoryChange={this.onCategorySelected.bind(this)}
        //onCategoryChange={this.onCategoryChange.bind(this)}
        onTagChange={this.onTagChange.bind(this)}
        selectedCategory={selectedCategory}
        toggleFavourite={this.onFavouriteFiltered.bind(this)}
        favourite={favouriteControl}
        shopData={filteredShop}
        state={this.state}
        props={this.props}
        categories={filteredCategories}
        tags={filteredTags}
        loading={loading}
        //displayCategory={this.props.selectedCategory ? "" : this.props.selectedCategory.id}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { categories, tags } = state.Settings;
  const { uid } = state.Auth.user;
  const { subscribedList, idToken } = state.Auth;
  const { shops } = state.Shops;
  const favouriteState = state.Favourite;
  const shopState = state.Shops;

  return {
    categories,
    tags,
    uid,
    idToken,
    subscribedList,
    shops,
    favouriteState,
    shopState,
  };
};

export default connect(mapStateToProps, {
  verifyPermission,
  loadShops,
  toggleCategory,
  toggleTag,
  toggleFavourite,
  onFavouriteClick,
  update,
  submitToBackend,
  readFromDatabase,
  updateIsFavourite,
})(index);

/* handleRefresh = async () => {
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
          selectedCategory: this.state.selectedCategory.id ? this.state.selectedCategory.id : null,
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
  }; */

/*   renderFooter({ empty }) {
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
  } */
