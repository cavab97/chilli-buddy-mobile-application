import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import * as Location from "expo-location";
import { getDistance } from "geolib";

import {
  verifyPermission,
  loadBookmark,
  updateIsBookmark,
  update,
  submitToBackend,
} from "@redux/bookmark/action";
import { listenToRecord, onBookmarkClick, togglePromotionModal } from "@redux/promo/action";

import { onFavouriteClick, loadShops } from "@redux/shops/action";
import {
  loadSearchShops,
  loadShopsPromo,
  onPromoSpecificClick,
  onShopSpecificClick,
  toggleSearchMessage as listenShopMessage,
  toggleSearchMessageMain,
  // searchHistory,
} from "@redux/search/action";

import {
  update as updateToBackendShop,
  submitToBackend as submitToBackendShop,
  readFromDatabase,
  updateIsFavourite,
  toggleTab,
  loadFavourite,
} from "@redux/favourite/action";

import { SearchScreen } from "@components/templates";

const RADIUS = 50;

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: props.categories,
      radiusAddition: 1,
      selectedCategory: { id: "", tags: ["All"], title: "All" },
      selectedTag: "All", //default all tag selected
      readLoading: true,
      dataSearch: "null",
      category: "null",
      tags: "null",
    };
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  componentDidMount = async () => {
    let category = [];
    let tags = [];
    for (let i = 0; i < this.props.categories.length; i++) {
      if (
        this.props.categories[i].title.toLowerCase().includes(this.state.dataSearch.toLowerCase())
      ) {
        category.push(this.props.categories[i].id);
        this.setState({ category: category });
      }
    }
    for (let i = 0; i < this.props.tags.length; i++) {
      if (this.props.tags[i].title.toLowerCase().includes(this.state.dataSearch.toLowerCase())) {
        tags.push(this.props.tags[i].id);
        this.setState({ tags: tags });
      }
    }
    this.setState({
      dataSearch: this.props.messages.value === undefined ? "null" : this.props.messages.value,
    });

    this.props.verifyPermission().then((permissions) => {
      this.props.verifyPermission().then((permissions) => {
        if (permissions.location !== "granted") {
          if (permissions.location.permissions.location.foregroundGranted === undefined) {
            alert("Permission to access location is necessary");
          } else if (permissions.location.permissions.location.foregroundGranted === true) {
            this.handleRefresh();
          }
        } else this.handleRefresh();
      });
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const currentPromo = this.props.promotionState.promo;
    const readError = this.props.promotionState.readError;

    // if no promo in the radius, call handleRefresh read again by increase radiusAddition state
    if (currentPromo.length === 0 && RADIUS * this.state.radiusAddition < 1000) {
      if (prevState.radiusAddition === this.state.radiusAddition) {
        this.setState({ radiusAddition: this.state.radiusAddition * 3 });
      }
      this.handleRefresh();
    }
    if (prevProps.promotionState.promo !== currentPromo && currentPromo.length > 0) {
      this.setState({ radiusAddition: 1 });
    }

    if (prevProps.promotionState.readError !== readError && readError !== false) {
      alert(readError);
    }
  }

  handleRefresh = async () => {
    let location = await Location.getCurrentPositionAsync({});
    const loadShops = this.props.loadShops({
      radius: RADIUS * this.state.radiusAddition,
      selectedCategory: null,
      selectedTag: null,
      // limit: this.state.limit,
    });

    const loadSearchShop = this.props.loadSearchShops({
      radius: RADIUS * this.state.radiusAddition,
      selectedCategory: this.state.category,
      shopName: this.state.dataSearch,
      selectedTag: this.state.tags,
    });

    const loadShopsPromo = this.props.loadShopsPromo({
      radius: RADIUS * this.state.radiusAddition,
      selectedCategory: this.state.category,
      shopName: this.state.dataSearch,
      selectedTag: this.state.tags,
    });
    const loadBookmark = this.props.loadBookmark({
      radius: RADIUS * this.state.radiusAddition,
      latitude: location.coords.latitude,
      longtitude: location.coords.longitude,
      selectedCategory: this.state.selectedCategory.id ? this.state.selectedCategory.id : null,
      selectedTag: this.state.selectedTag !== "All" ? this.state.selectedTag : null,
    });
    // const searchHistory = this.props.searchHistory(null, "read");

    Promise.all([loadSearchShop, loadShopsPromo, loadBookmark, loadShops]).then((values) => {
      this.setState({ readLoading: false });
    });

    // await this.props.loadFavourite({
    //   radius: RADIUS * this.state.radiusAddition,
    //   latitude: location.coords.latitude,
    //   longtitude: location.coords.longitude,
    //   selectedCategory: this.state.selectedCategory.id ? this.state.selectedCategory.id : null,
    //   selectedTag: this.state.selectedTag !== "All" ? this.state.selectedTag : null,
    // });

    //await this.props.readFromDatabase();
  };

  onMerchantPressed = async (item) => {
    // console.log(item.categories[0]);
    // console.log(this.props.categories);
    Actions.SingleMerchant({
      shopId: item.id,
      distance: item.distance,
      categoryName: item.category,
    });
  };

  lookingForBookmark({ promoId } = null) {
    const bookmarks = this.props.bookmarks;
    let bookmarkId = null;

    bookmarks.forEach((bookmark) => {
      if (bookmark.promo[0] === promoId) {
        bookmarkId = bookmark.id;
      }
    });
    return bookmarkId;
  }

  onPromoFavouritePressed = async (item) => {
    const shopId = item.shop.id;
    const promoId = item.id;
    const bookmarkId = this.lookingForBookmark({ promoId });
    this.props.onPromoSpecificClick(promoId);

    const isBookmark = item.isBookmark;

    this.props.onBookmarkClick(promoId);
    this.props.updateIsBookmark(promoId);
    /* console.log("bookmark" + JSON.stringify(this.props.bookmarkState.bookmarks));
    console.log("promotion" + JSON.stringify(this.props.promotionState.promo)); */
    if (bookmarkId === null) {
      const data = { shopId, promoId, isBookmark };
      await this.props.submitToBackend(data, "create");
    } else {
      const data = { bookmarkId, isBookmark };
      await this.props.submitToBackend(data, "update");
    }
  };

  onToggleTab() {
    this.props.toggleTab();
  }

  onBackPressed() {
    this.props.toggleSearchMessageMain();
    Actions.pop("SearchScreen");
    this.props.listenShopMessage({ value: "null" });
  }

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
    this.props.onShopSpecificClick(shopId);
    this.props.onFavouriteClick(shopId);
    this.props.updateIsFavourite(shopId);
    // console.log(item);

    if (favouriteId === null) {
      const data = { shopId, isFavourite };
      await this.props.submitToBackendShop(data, "create");
    } else {
      const data = { favouriteId, isFavourite };
      await this.props.submitToBackendShop(data, "update");
    }
  };

  onCarouselPressed() {
    const location = this.props.promotionState.promotion.shop.l;
    this.calculateDistance(location);
    this.props.togglePromotionModal();
  }

  calculateDistance = async (destinationLocation) => {
    const promo = this.props.promotionState;
    var distance;
    let location = await Location.getCurrentPositionAsync({});
    distance =
      getDistance(
        { latitude: destinationLocation.U, longitude: destinationLocation.k },
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }
      ) / 1000;

    Actions.SingleMerchant({
      shopId: promo.promotion.shop.id,
      distance: distance,
      calculatedDistance: distance,
    });
  };

  onPromoPressedClose() {
    this.props.togglePromotionModal();
  }

  onPromoPressed(item) {
    this.props.listenToRecord({ promoId: item.id });
    this.props.togglePromotionModal();
  }
  searchFilterFunction = (value) => {
    this.setState({ dataSearch: value });
    this.props.listenShopMessage({ value });
  };
  searchButtonClick = async () => {
    console.log("clicked");
    let category = [];
    let tags = [];
    for (let i = 0; i < this.props.categories.length; i++) {
      if (
        this.props.categories[i].title.toLowerCase().includes(this.state.dataSearch.toLowerCase())
      ) {
        category.push(this.props.categories[i].id);
        this.setState({ category: category });
      }
    }

    for (let i = 0; i < this.props.tags.length; i++) {
      if (this.props.tags[i].title.toLowerCase().includes(this.state.dataSearch.toLowerCase())) {
        tags.push(this.props.tags[i].id);
        this.setState({ tags: tags });
      }
    }
    await this.props.loadSearchShops({
      radius: RADIUS * this.state.radiusAddition,
      selectedCategory: category.length > 0 ? category : null,
      shopName: this.state.dataSearch,
      selectedTag: tags.length > 0 ? tags : null,
    });
  };

  searchButtonClickPromo = async () => {
    let category = [];
    let tags = [];
    for (let i = 0; i < this.props.categories.length; i++) {
      if (
        this.props.categories[i].title.toLowerCase().includes(this.state.dataSearch.toLowerCase())
      ) {
        category.push(this.props.categories[i].id);
        this.setState({ category: category });
      }
    }

    for (let i = 0; i < this.props.tags.length; i++) {
      if (this.props.tags[i].title.toLowerCase().includes(this.state.dataSearch.toLowerCase())) {
        tags.push(this.props.tags[i].id);
        this.setState({ tags: tags });
      }
    }
    await this.props.loadShopsPromo({
      radius: RADIUS * this.state.radiusAddition,
      selectedCategory: category.length > 0 ? category : null,
      shopName: this.state.dataSearch,
      selectedTag: tags.length > 0 ? tags : null,
    });
  };

  render() {
    const { promotion, promotionModalVisible, bookmarkControl } = this.props.promotionState;
    const readBookmark = this.props.bookmarkState.readBookmark;
    const submitLoading = this.props.bookmarkState.submitLoading;
    const bookmarks = this.props.bookmarkState.bookmarks;
    const { categories, tags } = this.props;

    const { selectedTab, favourites } = this.props.favouriteState;

    //shop

    const { shops, promos } = this.props.searchState;

    let isBookmark = [];
    let searchShops = [];
    let isFavourite = [];
    let activeShops = [];
    let filteredPromotion;
    shops.map((shop) => {
      let shopCategory = categories.filter((category) => category.id === shop.categories[0]);

      shopCategory ? (shop.category = shopCategory[0].title) : "";
    });

    shops.forEach((bookmark) => {
      if (bookmark.isBookmark === true) {
        searchShops.push(bookmark);
      }
    });

    searchShops.forEach((bookmark) => {
      isBookmark.push(bookmark.isBookmark);
    });
    // bookmarkControl
    //   ? (filteredPromotion = promo.filter((promotion) => promotion.isBookmark === true))
    //   : filteredPromotion;
    // console.log(shops);

    // shops.forEach((favourite) => {
    //   if (favourite.isFavourite === true) {
    //     activeShops.push(favourite);
    //   }
    // });

    // activeShops.forEach((favourite) => {
    //   isFavourite.push(favourite.isFavourite);
    // });

    // activeShops.map((favourite) => {
    //   let favouriteCategory = categories.filter(
    //     (category) => category.id === favourite.shop.categories[0]
    //   );
    //   let favouriteDistance = favourite.distance;
    //   favouriteCategory ? (favourite.shop.category = favouriteCategory[0].title) : "";
    //   favourite.distance = favouriteDistance;
    // });

    return (
      <SearchScreen
        readBookmark={readBookmark}
        readLoading={this.state.readLoading}
        submitLoading={submitLoading}
        dataSource={promos}
        shopData={shops}
        selectedTab={selectedTab}
        promotion={promotion}
        promotionModal={promotionModalVisible}
        handleRefresh={this.handleRefresh.bind(this)}
        onMerchantPressed={this.onMerchantPressed.bind(this)}
        onPromoFavouritePressed={this.onPromoFavouritePressed.bind(this)}
        onBackPressed={this.onBackPressed.bind(this)}
        onPromoPressedClose={this.onPromoPressedClose.bind(this)}
        onPromoPressed={this.onPromoPressed.bind(this)}
        onCarouselPressed={this.onCarouselPressed.bind(this)}
        onToggleTab={this.onToggleTab.bind(this)}
        onFavouritePressed={this.onFavouritePressed.bind(this)}
        // toggleFavourite={this.onFavouriteFiltered.bind(this)}
        searchFilterFunction={this.searchFilterFunction.bind(this)}
        searchButtonClick={this.searchButtonClick.bind(this)}
        searchButtonClickPromo={this.searchButtonClickPromo.bind(this)}
        mainScreenMessage={this.props.mainScreenMessage}
        loading={this.props.loading}
        dataSearch={this.state.dataSearch}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { categories, tags } = state.Settings;
  const promotionState = state.Promotion;
  const { bookmarks } = state.Bookmark;
  const bookmarkState = state.Bookmark;
  const favouriteState = state.Favourite;
  const shopState = state.Shops;
  const searchState = state.Search;
  const { messages, mainScreenMessage, loading } = state.Search;

  // const shopState = state.Shops;

  return {
    categories,
    tags,
    promotionState,
    bookmarks,
    bookmarkState,
    favouriteState,
    shopState,
    searchState,
    messages,
    mainScreenMessage,
    loading,
  };
};

export default connect(mapStateToProps, {
  verifyPermission,
  loadBookmark,
  onBookmarkClick,
  update,
  submitToBackend,
  onFavouriteClick,
  loadSearchShops,
  updateToBackendShop,
  submitToBackendShop,
  readFromDatabase,
  updateIsFavourite,
  togglePromotionModal,
  listenToRecord,
  toggleTab,
  loadFavourite,
  updateIsBookmark,
  loadShopsPromo,
  loadShops,
  onPromoSpecificClick,
  onShopSpecificClick,
  listenShopMessage,
  toggleSearchMessageMain,
  // searchHistory,
})(index);
