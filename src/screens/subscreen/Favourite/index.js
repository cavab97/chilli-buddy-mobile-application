import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import * as Location from "expo-location";
import { getDistance } from "geolib";

import { verifyPermission, loadBookmark } from "@redux/bookmark/action";
import { update, submitToBackend } from "@redux/bookmark/action";
import { 
  listenToRecord,
  onBookmarkClick,
  togglePromotionModal
} from "@redux/promo/action";

import { loadShops, onFavouriteClick } from "@redux/shops/action";
import {
  update as updateToBackendShop,
  submitToBackend as submitToBackendShop,
  readFromDatabase,
  updateIsFavourite,
  toggleTab
} from "@redux/favourite/action";

import { FavouriteList } from "@components/templates";

const RADIUS = 50;

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: props.tags,
      categories: props.categories,
      radiusAddition: 1,
      selectedCategory: { id: "", tags: ["All"], title: "All" },
      selectedTag: "All", //default all tag selected
      readLoading: true,
    };
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  componentDidMount = async () => {
    this.props.verifyPermission().then((permissions) => {
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
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const currentPromo = this.props.promotionState.promo;
    const readError = this.props.promotionState.readError;
    const submitLoading = this.props.bookmarkState.submitLoading;
    const readBookmark = this.props.bookmarkState.readBookmark;

    // if no promo in the radius, call handleRefresh read again by increase radiusAddition state
    if (currentPromo.length === 0 && RADIUS * this.state.radiusAddition < 1000) {
      if (prevState.radiusAddition === this.state.radiusAddition) {
        this.setState({ radiusAddition: this.state.radiusAddition * 3 });
      }
      this.handleRefresh();
    }

    // if get promo in the radius, reset the radiusAddition to 1 for read next time
    if (prevProps.promotionState.promo !== currentPromo && currentPromo.length > 0) {
      this.setState({ radiusAddition: 1 });
    }

    if (prevProps.promotionState.readError !== readError && readError !== false) {
      alert(readError);
    }

    // if (
    //   prevProps.bookmarkState.submitLoading &&
    //   !submitLoading
    //   //&&
    //   //prevProps.bookmarkState.readBookmark != readBookmark
    // ) {
    //   this.handleRefresh();
    // }
  }

  handleRefresh = async () => {
    let location = await Location.getCurrentPositionAsync({});
    await this.props.loadBookmark({
      radius: RADIUS * this.state.radiusAddition,
      latitude: location.coords.latitude,
      longtitude: location.coords.longitude,
      selectedCategory: this.state.selectedCategory.id ? this.state.selectedCategory.id : null,
      selectedTag: this.state.selectedTag !== "All" ? this.state.selectedTag : null,
    });
    await this.props.loadShops({
      radius: RADIUS * this.state.radiusAddition,
      latitude: location.coords.latitude,
      longtitude: location.coords.longitude,
      selectedCategory: this.state.selectedCategory.id ? this.state.selectedCategory.id : null,
      selectedTag: this.state.selectedTag !== "All" ? this.state.selectedTag : null,
    });
    await this.props.readFromDatabase();

    this.setState({ readLoading: false });
  };

  onMerchantPressed(item) {
    Actions.SingleMerchant({
      shopId: item.id,
      distance: item.distance,
      categoryName: item.category,
    });
  }

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

  onBookmarkPressed = async (item) => {
    const click = item.isBookmark;
    item.isBookmark = !click;

    const shopId = item.promotion.shop.id;
    const promoId = item.promotion.id;
    const bookmarkId = this.lookingForBookmark({ promoId });
    const isBookmark = item.isBookmark;
    this.props.onBookmarkClick(promoId, isBookmark);

    if (bookmarkId === null) {
      const data = { shopId, promoId, isBookmark };
      await this.props.submitToBackend(data, "create");
    } else {
      const data = { bookmarkId, isBookmark };
      await this.props.submitToBackend(data, "update");
    }
  };

  onToggleTab(){
    this.props.toggleTab();
  }

  onBackPressed() {
    Actions.pop("Favourite");
  }

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

  calculateShopDistance = async (destinationLocation) => {
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
  }

  onPromoPressedClose() {
    this.props.togglePromotionModal()
  }

  onPromoPressed(item) {
    this.props.listenToRecord({ promoId: item.promotion.id })
    this.props.togglePromotionModal()
  }

  render() {
    const { 
      promotion,
      promotionModalVisible
    } = this.props.promotionState;

    const readBookmark = this.props.bookmarkState.readBookmark;
    const submitLoading = this.props.bookmarkState.submitLoading;
    const bookmarks = this.props.bookmarkState.bookmarks;
    const { categories, tags } = this.props;

    const {  
      selectedTab,
      favourites
    } = this.props.favouriteState;

    let isBookmark = [];
    let activeBookmarks = [];
    let isFavourite = [];
    let activeFavourites = [];

    bookmarks.forEach((bookmark) => {
      if (bookmark.isBookmark === true) {
        activeBookmarks.push(bookmark);
      }
    });

    activeBookmarks.forEach((bookmark) => {
      isBookmark.push(bookmark.isBookmark);
    });

    favourites.forEach((favourite) => {
      if (favourite.isFavourite === true) {
        activeFavourites.push(favourite);
      }
    })

    activeFavourites.forEach((favourite) => {
      isFavourite.push(favourite.isFavourite);
    });

    activeFavourites.map((favourite) => {
      let favouriteCategory = categories.filter((category) => category.id === favourite.shop.categories[0]);

      favouriteCategory ? (favourite.shop.category = favouriteCategory[0].title) : "";

      let distance = this.calculateShopDistance(favourite.shop.l);

      favourite.shop.distance = distance;
    });

    return (
      <FavouriteList
        readBookmark={readBookmark}
        readLoading={this.state.readLoading}
        submitLoading={submitLoading}
        dataSource={activeBookmarks}
        shopData={activeFavourites}
        selectedTab={selectedTab}
        promotion={promotion}
        promotionModal={promotionModalVisible}
        handleRefresh={this.handleRefresh.bind(this)}
        onMerchantPressed={this.onMerchantPressed.bind(this)}
        onBookmarkPressed={this.onBookmarkPressed.bind(this)}
        onBackPressed={this.onBackPressed.bind(this)}
        onPromoPressedClose={this.onPromoPressedClose.bind(this)}
        onPromoPressed={this.onPromoPressed.bind(this)}
        onCarouselPressed={this.onCarouselPressed.bind(this)}
        onToggleTab={this.onToggleTab.bind(this)}
        // toggleFavourite={this.onFavouriteFiltered.bind(this)}
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
  // const shopState = state.Shops;

  return { 
    categories, 
    tags, 
    promotionState, 
    bookmarks, 
    bookmarkState,
    favouriteState
  };
};

export default connect(mapStateToProps, {
  verifyPermission,
  loadBookmark,
  onBookmarkClick,
  update,
  submitToBackend,
  onFavouriteClick,
  loadShops,
  updateToBackendShop,
  submitToBackendShop,
  readFromDatabase,
  updateIsFavourite,
  togglePromotionModal,
  listenToRecord,
  toggleTab
})(index);
