import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import * as Location from "expo-location";
import { getDistance } from "geolib";

import {
  verifyPermission,
  loadShopsPromo,
  onBookmarkClick,
  toggleSwipeable,
  toggleCategoryModal,
  toggleTagModal,
  togglePromotionModal,
  listenToRecord,
  toggleCategory,
  toggleBookmark,
  toggleTag,
  toggleRemoveCategory,
  toggleRemoveTag,
} from "@redux/promo/action";
import { loadShopsPromo as loadShopsPromoSearch, onPromoSpecificClick } from "@redux/search/action";

import {
  update,
  submitToBackend,
  readFromDatabase,
  updateIsBookmark,
  loadBookmark,
} from "@redux/bookmark/action";
import { loadShops } from "@redux/shops/action";

import { PromoList } from "@components/templates";

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
      distance: 0,
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
    const readLoading = this.props.bookmarkState.readLoading;

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
    //   //prevProps.bookmarkState.readLoading != readLoading
    // ) {
    //   this.handleRefresh();
    // }
  }

  handleRefresh = async () => {
    let location = await Location.getCurrentPositionAsync({});
    const loadBookmark = this.props.loadBookmark({
      radius: RADIUS * this.state.radiusAddition,
      latitude: location.coords.latitude,
      longtitude: location.coords.longitude,
      selectedCategory: this.state.selectedCategory.id ? this.state.selectedCategory.id : null,
      selectedTag: this.state.selectedTag !== "All" ? this.state.selectedTag : null,
    });
    const loadShopsPromo = this.props.loadShopsPromo({
      radius: RADIUS * this.state.radiusAddition,
      latitude: location.coords.latitude,
      longtitude: location.coords.longitude,
      selectedCategory: this.state.selectedCategory.id ? this.state.selectedCategory.id : null,
      selectedTag: this.state.selectedTag !== "All" ? this.state.selectedTag : null,
    });

    const loadShopsPromoSearch = this.props.loadShopsPromoSearch({
      radius: RADIUS * this.state.radiusAddition,
      selectedCategory: "null",
      shopName: "null",
      selectedTag: "null",
    });
    //await this.props.readFromDatabase();
    Promise.all([loadShopsPromo, loadBookmark, loadShopsPromoSearch]).then((values) => {
      this.setState({ readLoading: false });
    });
  };

  onBackPressed() {
    Actions.pop("Promo");

    // Actions.MainScreen();
  }

  onPromoPressedClose() {
    this.props.togglePromotionModal();
  }

  onPromoPressed = async (item) => {
    //Actions.SingleMerchantPromo({ promoId: item.id, distance: item.distance });
    // await this.props.loadShops({
    //   radius: RADIUS * this.state.radiusAddition,
    //   selectedCategory: null,
    //   selectedTag: null,
    //   // limit: this.state.limit,
    // });
    this.setState({ distance: item.distance });

    this.props.togglePromotionModal();
    this.props.listenToRecord({ promoId: item.id });
  };

  onCategoryChange = (value) => {
    this.setState({ selectedCategory: value, selectedTag: "All" });
    this.handleRefresh();
  };

  onTagChange = (value) => {
    this.setState({ selectedTag: value });
    this.handleRefresh();
  };

  onCategoryPressed = () => {
    this.props.toggleCategoryModal();
  };

  onTagPressed = () => {
    this.props.toggleTagModal();
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

  onBookmarkPressed = async (item) => {
    // console.log(item);
    const shopId = item.shop.id;
    const promoId = item.id;
    const bookmarkId = this.lookingForBookmark({ promoId });
    const isBookmark = !item.isBookmark;
    this.props.onBookmarkClick(promoId);
    this.props.updateIsBookmark(promoId);
    this.props.onPromoSpecificClick(promoId);
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

  onCategorySelected(id = null) {
    this.props.toggleCategory(id);
  }

  onTagSelected(id = null) {
    this.props.toggleTag(id);
  }

  onCategoryRemove(type) {
    switch (type) {
      case "category":
        this.props.toggleRemoveCategory();
        break;
      case "tag":
        this.props.toggleRemoveTag();
        break;
      default:
        break;
    }
  }

  onBookmarkFiltered() {
    this.props.toggleBookmark();
  }

  onCarouselPressed() {
    console.log("onCarouselPressed");
    const promo = this.props.promotionState;

    // const location = this.props.promotionState.promotion.shop.l;
    // this.calculateDistance(location);
    Actions.SingleMerchant({
      shopId: promo.promotion.shop.id,
      distance: this.state.distance,
      calculatedDistance: this.state.distance,
    });
    this.props.togglePromotionModal();
  }

  // calculateDistance = async (destinationLocation) => {
  //   console.log("destinationLocation");
  //   console.log(destinationLocation);

  //   var distance;
  //   let location = await Location.getCurrentPositionAsync({});
  //   distance =
  //     getDistance(
  //       { latitude: destinationLocation.U, longitude: destinationLocation.k },
  //       {
  //         latitude: location.coords.latitude,
  //         longitude: location.coords.longitude,
  //       }
  //     ) / 1000;

  // };

  render() {
    const {
      readLoading,
      promo,
      bookmark,
      promotion,
      swipeable,
      bookmarkControl,
      categoryModalVisible,
      tagModalVisible,
      promotionModalVisible,
      selectedCategory,
      selectedTag,
    } = this.props.promotionState;

    const { categories, tags } = this.props;

    const readBookmark = this.props.bookmarkState.readLoading;
    const submitLoading = this.props.bookmarkState.submitLoading;

    let filteredPromotion;
    let filteredCategories;
    let filteredTags = [];
    let selectedCategoryTag;
    let filterCurrentCategories = [];
    let promotionCategory;

    filteredCategories = categories.filter((category) => category.title !== "All");

    // console.log("filteredCategories");
    // console.log(filteredCategories);

    // Get Shop Category
    // for (let i = 0; i < filteredCategories.length; i++) {
    //   for (let k = 0; k < promo.length; k++) {
    //     if (filteredCategories[i].id === promo[k].shop.categories[0]) {
    //       filterCurrentCategories = filteredCategories;
    //       console.log(filteredCategories[i].title);
    //     }
    //   }
    // }
    // console.log("filterCurrentCategories");

    // console.log(filterCurrentCategories);
    let tempCategory = [];
    let delDuplicateCategory;
    if (promo.length > 0) {
      promo.map((promotion) => {
        tempCategory.push(promotion.shop.categories[0]);
        // tempCategory = promotion.shop.categories[0];
        delDuplicateCategory = [...new Set(tempCategory)];

        promotionCategory = categories.filter(
          (category) => category.id === promotion.shop.categories[0]
        );

        promotionCategory ? (promotion.category = promotionCategory[0].title) : "";
      });
    }
    if (delDuplicateCategory.length > 0) {
      delDuplicateCategory.map((c) => {
        for (let i = 0; i < filteredCategories.length; i++) {
          if (c === filteredCategories[i].id) {
            filterCurrentCategories.push(filteredCategories[i]);
          }
        }
      });
    }

    // On toggle category get category from promotion shop
    selectedCategory
      ? (filteredPromotion = promo.filter((promotion) =>
          promotion.shop.categories.includes(selectedCategory)
        ))
      : (filteredPromotion = promo);

    // On toggle tag get tag from promotion shop
    selectedTag
      ? selectedTag === "All"
        ? filteredPromotion
        : (filteredPromotion = filteredPromotion.filter(
            (promotion) => promotion.shop.tags.includes(selectedTag) === true
          ))
      : filteredPromotion;

    // On toggle bookmark get bookmark promotion
    bookmarkControl
      ? (filteredPromotion = filteredPromotion.filter((promotion) => promotion.isBookmark === true))
      : filteredPromotion;

    if (selectedCategory) {
      selectedCategoryTag = filteredCategories.filter(
        (category) => category.id === selectedCategory
      );

      selectedCategoryTag = selectedCategoryTag[0].tags;

      tags.forEach((tag) =>
        selectedCategoryTag.forEach((categoryTag) => {
          if (tag.id === categoryTag) {
            filteredTags.push(tag);
          }
        })
      );
    }

    return (
      <PromoList
        loading={readLoading}
        readLoading={this.state.readLoading}
        readBookmark={readBookmark}
        submitLoading={submitLoading}
        dataSource={filteredPromotion}
        tagModal={tagModalVisible}
        categoryModal={categoryModalVisible}
        allCategory={categories}
        allTag={tags}
        categories={filterCurrentCategories}
        selectedCategoryTitle={selectedCategoryTag && selectedCategoryTag.title}
        promotion={promotion}
        promotionModal={promotionModalVisible}
        tags={filteredTags}
        bookmark={bookmarkControl}
        toggleBookmark={this.onBookmarkFiltered.bind(this)}
        selectedCategory={selectedCategory}
        selectedTag={selectedTag}
        swipeable={swipeable}
        handleRefresh={this.handleRefresh.bind(this)}
        onCarouselPressed={this.onCarouselPressed.bind(this)}
        onPromoPressed={this.onPromoPressed.bind(this)}
        onBookmarkPressed={this.onBookmarkPressed.bind(this)}
        onCategoryChange={this.onCategorySelected.bind(this)}
        onTagChange={this.onTagSelected.bind(this)}
        onBackPressed={this.onBackPressed.bind(this)}
        onCategoryPressed={this.onCategoryPressed.bind(this)}
        onTagPressed={this.onTagPressed.bind(this)}
        onPromoPressedClose={this.onPromoPressedClose.bind(this)}
        onCategoryRemove={this.onCategoryRemove.bind(this)}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { categories, tags } = state.Settings;
  const promotionState = state.Promotion;
  const { bookmarks } = state.Bookmark;
  const bookmarkState = state.Bookmark;

  return { categories, tags, promotionState, bookmarks, bookmarkState };
};

export default connect(mapStateToProps, {
  verifyPermission,
  loadShopsPromo,
  onBookmarkClick,
  updateIsBookmark,
  toggleCategoryModal,
  loadBookmark,
  toggleTagModal,
  togglePromotionModal,
  listenToRecord,
  toggleCategory,
  toggleTag,
  update,
  submitToBackend,
  readFromDatabase,
  toggleSwipeable,
  toggleBookmark,
  toggleRemoveCategory,
  toggleRemoveTag,
  loadShops,
  loadShopsPromoSearch,
  onPromoSpecificClick,
})(index);
