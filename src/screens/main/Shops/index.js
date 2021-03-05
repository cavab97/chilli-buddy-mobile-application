import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

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

import { ShopList } from "@components/templates";

const ITEMS_PER_PAGE = 5;
const RADIUS = 50;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class index extends Component {
  constructor(props) {
    super(props);
    this.myRef = null;

    this.state = {
      radiusAddition: 1,
      data: [],
      dataSource: [],
      filteredData: [],
      page: 1,
      // isLoading:false,
      isRefreshing: false,
      tags: props.tags,
      categories: props.categories,
      selectedCategory: props.selectedCategory,
      selectedTag: "All", //default all tag selected
      // limit: 10,
    };
    //this.onSubscribePressed = this.onSubscribePressed.bind(this);
    // this.handleLoadMore = this.handleLoadMore.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    //this.renderFooter = this.renderFooter.bind(this);
    // this.filterData = this.filterData.bind(this);
  }

  // old ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  componentDidMount = async () => {
    console.log("componentDidMount");

    const { categories } = this.props;
    const selectedID = this.props.selectedCategoryId;

    this.props.verifyPermission().then((permissions) => {
      if (permissions.location !== "granted") {
        if (permissions.location.permissions.location.foregroundGranted === undefined) {
          alert("Permission to access location is necessary");
          // this.handleRefresh();
        } else if (permissions.location.permissions.location.foregroundGranted === true) {
          this.handleRefresh();
        }
      } else this.handleRefresh();
    });
    if (selectedID) {
      this.swap(categories, 0, selectedID);
    }
  };

  handleRefresh = async () => {
    const { selectedCategory } = this.props.shopState;
    // console.log("handleRefreshSelectedCategory");
    // console.log(selectedCategory);
    // console.log("this.props.selectedCategory");
    // console.log(this.props.selectedCategory);
    // console.log("this.state.selectedCategory");
    // console.log(this.state.selectedCategory);

    const { categories } = this.props;
    let filteredCategories = categories.filter((category) => category.title !== "All");
    await this.props.loadShops({
      radius: RADIUS * this.state.radiusAddition,
      selectedCategory: this.state.selectedCategory,
      selectedTag: this.state.selectedTag !== "All" ? this.state.selectedTag : null,
      // limit: this.state.limit,
    });

    if (this.props.selectedCategory) {
      await this.props.toggleCategory(this.state.selectedCategory);
    } else {
      await this.props.toggleCategory(filteredCategories[0].id);
    }
    //await this.props.readFromDatabase();
  };

  componentDidUpdate(prevProps, prevState) {
    const currentShop = this.props.shopState.shops;
    const readError = this.props.shopState.readError;
    // const { selectedCategory } = this.props.shopState;
    // const { categories } = this.props;
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

    // if (this.flatListRef !== null && this.flatListRef !== undefined) {
    //   let filteredCategories = categories.filter((category) => category.title !== "All");

    //   this.flatListRef.scrollToIndex({
    //     animated: false,
    //     index:
    //       this.returnSpecificCategory(filteredCategories, selectedCategory) === -1
    //         ? 0
    //         : this.returnSpecificCategory(filteredCategories, selectedCategory),
    //   });
    // }
  }

  // handleLoadMore() {
  //   console.log("triggerrrr");
  //   //this.setState({isLoading:true})
  //   const { page, data } = this.state;
  //   const start = page * ITEMS_PER_PAGE;
  //   const end = (page + 1) * ITEMS_PER_PAGE;

  //   const newData = this.state.filteredData.slice(start, end); // here, we will receive next batch of the items
  //   this.setState({ data: [...data, ...newData], page: page + 1 }); // here we are appending new batch to existing batch
  // }

  // filterData() {
  //   const filteredData =
  //     this.state.selectedTag !== "All"
  //       ? this.state.dataSource.filter((item) => {
  //           return item.tags
  //             .map((tag) => {
  //               return tag;
  //             })
  //             .includes(this.state.selectedTag);
  //         })
  //       : this.state.dataSource;
  //   const dataDisplay = [];
  //   filteredData.map((data) => {
  //     dataDisplay.push({
  //       ...data,
  //       //subscribed: this.props.subscribedList.includes(data.id)
  //     });
  //   });
  //   this.setState({ filteredData: dataDisplay, page: 1, data: [] });
  //   this.handleLoadMore();
  // }

  onCategorySelected = async (id = null) => {
    this.setState({ selectedCategory: id, selectedTag: "All" });

    await this.props.loadShops({
      radius: RADIUS * this.state.radiusAddition,
      selectedCategory: id,
      selectedTag: this.state.selectedTag !== "All" ? this.state.selectedTag : null,
    });
    this.props.toggleCategory(id);
  };

  onFavouriteFiltered() {
    this.props.toggleFavourite();
  }

  onMerchantPressed(item) {
    Actions.SingleMerchant({
      shopId: item.id,
      distance: item.distance,
      categoryName: item.category,
    });
  }

  onTagChange = (tag) => {
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
    const favouriteId = this.lookingForFavourite({ shopId });
    const isFavourite = !item.isFavourite;

    this.props.onFavouriteClick(shopId);
    this.props.updateIsFavourite(shopId);
    // console.log(item.isFavourite);
    if (favouriteId === null) {
      const data = { shopId, isFavourite };
      await this.props.submitToBackend(data, "create");
    } else {
      const data = { favouriteId, isFavourite };
      await this.props.submitToBackend(data, "update");
    }
  };
  returnSpecificCategory(categories, selectedCategory) {
    // console.log(category);
    // console.log(categories[0].id);
    let index;

    index = categories.findIndex((category) => {
      return category.id === selectedCategory;
    });
    return index;
  }
  scrollToItem() {
    this.myRef.current.scrollToIndex({ animated: true, index: 20 });
  }
  swap(input, index_A, index_B) {
    let temp = input[index_A];

    input[index_A] = input[index_B];
    input[index_B] = temp;
  }

  // setFlatListRef = (value) => {
  //   const { categories, selectedCategory } = this.props;

  //   let filteredCategories = categories.filter((category) => category.title !== "All");
  //   console.log(value);
  //   this.flatListRef = value;
  //   // console.log(this.flatListRef);

  //   /* if (this.flatListRef !== null) {
  //     let filteredCategories = categories.filter((category) => category.title !== "All");
  //     this.flatListRef.scrollToIndex({
  //       animated: false,
  //       index:
  //         this.returnSpecificCategory(filteredCategories, selectedCategory) === -1
  //           ? 0
  //           : this.returnSpecificCategory(filteredCategories, selectedCategory)
  //     });
  //   } */
  // };

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
    // console.log("shops");
    // console.log(shops.length);

    // Get Shop Category

    shops.map((shop) => {
      let shopCategory = categories.filter((category) => category.id === shop.categories[0]);

      shopCategory ? (shop.category = shopCategory[0].title) : "";
    });

    // Remove all category
    filteredCategories = categories.filter((category) => category.title !== "All");
    // console.log("filteredCategories");
    // console.log(filteredCategories);
    // On toggle category get category shop
    selectedCategory
      ? (filteredShop = shops.filter((shop) => shop.categories.includes(selectedCategory) === true))
      : (filteredShop = shops.filter(
          (shop) => shop.categories.includes(filteredCategories[0].id) === true
        ));
    // console.log(filteredShop.length);

    // selectedCategory ? console.log("true") : console.log("false");
    // console.log("filteredShop");
    // console.log(filteredShop);

    // console.log(selectedCategory);
    // On toggle favourite get favourite shop
    favouriteControl
      ? (filteredShop = filteredShop.filter((shop) => shop.isFavourite === true))
      : filteredShop;

    selectedTag
      ? selectedTag === "All"
        ? filteredShop
        : (filteredShop = filteredShop.filter((shop) => shop.tags.includes(selectedTag) === true))
      : filteredShop;
    if (selectedCategory) {
      selectedCategoryTag = filteredCategories.filter(
        (category) => category.id === selectedCategory
      );
      // console.log("selectedCategoryTag");
      // console.log(selectedCategoryTag);
      selectedCategoryTag = selectedCategoryTag[0].tags;
      tags.forEach((tag) =>
        selectedCategoryTag.forEach((categoryTag) => {
          if (tag.id === categoryTag) {
            filteredTags.push(tag);
          }
        })
      );
    }

    // filteredCategories.push(this.state.selectedCategory);
    // console.log(categories[0]);
    // console.log(filteredCategories.length);
    // console.log(
    // this.swap(filteredCategories, 2, 10);
    // );

    return (
      <ShopList
        handleRefresh={this.handleRefresh.bind(this)}
        // handleLoadMore={this.handleLoadMore.bind(this)}
        // filterData={this.filterData.bind(this)}
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
        returnSpecificCategory={this.returnSpecificCategory.bind(this)}
        scrollToItem={this.scrollToItem.bind(this)}
        myRef={this.myRef}
        // setFlatListRef={this.setFlatListRef.bind(this)}
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
  const selectedCategory = state.Shops.selectedCategory;

  return {
    categories,
    tags,
    uid,
    idToken,
    subscribedList,
    shops,
    favouriteState,
    shopState,
    selectedCategory,
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
