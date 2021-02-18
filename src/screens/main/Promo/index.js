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
} from "@redux/promo/action";

import {
  update,
  submitToBackend,
  readFromDatabase,
  updateIsBookmark,
} from "@redux/bookmark/action";
import styles from "./styles";

import { Text, View } from "@components/atoms";

import { Card, CardSection } from "@components/molecules";

import { PromoList } from "@components/templates";

import Icon from "react-native-vector-icons/FontAwesome";

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
    };
    this.handleRefresh = this.handleRefresh.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
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
    await this.props.loadShopsPromo({
      radius: RADIUS * this.state.radiusAddition,
      latitude: location.coords.latitude,
      longtitude: location.coords.longitude,
      selectedCategory: this.state.selectedCategory.id ? this.state.selectedCategory.id : null,
      selectedTag: this.state.selectedTag !== "All" ? this.state.selectedTag : null,
    });
    //await this.props.readFromDatabase();
  };

  renderFooter({ empty }) {
    if (empty) {
      return Platform.OS === "ios" ? (
        <Card style={{ backgroundColor: "transparent" }}>
          <CardSection style={styles.emptySection}>
            <Icon name="inbox" size={64} style={styles.emptyIcon} />
            <Text style={styles.emptyText}>NO PROMOTION FOUND</Text>
          </CardSection>
        </Card>
      ) : (
        <Card style={{ backgroundColor: "transparent", elevation: 0 }}>
          <CardSection style={[styles.emptySection, { elevation: 0 }]}>
            <Icon name="inbox" size={64} style={styles.emptyIcon} />
            <Text style={styles.emptyText}>NO PROMOTION FOUND</Text>
          </CardSection>
        </Card>
      );
    } else {
      return <View style={{ marginBottom: 10 }} />;
    }
  }

  onBackPressed() {
    Actions.MainScreen();
  }

  onPromoPressedClose() {
    this.props.togglePromotionModal()
  }

  onPromoPressed(item) {
    //Actions.SingleMerchantPromo({ promoId: item.id, distance: item.distance });
    this.props.listenToRecord({ promoId: item.id })
    this.props.togglePromotionModal()
  }

  onCategoryChange = (value) => {
    this.setState({ selectedCategory: value, selectedTag: "All" });
    this.handleRefresh();
  };

  onTagChange = (value) => {
    this.setState({ selectedTag: value });
    this.handleRefresh();
  };
  
  onSwipeFullScreen = () => {
    this.props.toggleSwipeable()
  }

  onCategoryPressed = () => {
    this.props.toggleCategoryModal()
  }

  onTagPressed = () => {
    this.props.toggleTagModal()
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
    const shopId = item.shop.id;
    const promoId = item.id;
    const bookmarkId = this.lookingForBookmark({ promoId });
    const isBookmark = !item.isBookmark;
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

  render() {
    const { 
      readLoading, 
      promo, 
      bookmark, 
      promotion,
      swipeable,
      categoryModalVisible,
      tagModalVisible,
      promotionModalVisible
    } = this.props.promotionState;

    const { categories, tags } = this.props

    const readBookmark = this.props.bookmarkState.readLoading;
    const submitLoading = this.props.bookmarkState.submitLoading;

    return (
      <PromoList
        loading={readLoading}
        readBookmark={readBookmark}
        submitLoading={submitLoading}
        dataSource={promo}
        tagModal={tagModalVisible}
        categoryModal={categoryModalVisible}
        categories={categories}
        promotion={promotion}
        promotionModal={promotionModalVisible}
        tags={tags}
        selectedCategory={this.state.selectedCategory}
        swipeable={swipeable}
        handleRefresh={this.handleRefresh.bind(this)}
        renderFooter={this.renderFooter.bind(this)}
        onCarouselPressed={this.onCarouselPressed.bind(this)}
        onPromoPressed={this.onPromoPressed.bind(this)}
        onBookmarkPressed={this.onBookmarkPressed.bind(this)}
        onCategoryChange={this.onCategoryChange.bind(this)}
        onTagChange={this.onTagChange.bind(this)}
        onBackPressed={this.onBackPressed.bind(this)}
        onCategoryPressed={this.onCategoryPressed.bind(this)}
        onTagPressed={this.onTagPressed.bind(this)}
        onSwipeFullScreen={this.onSwipeFullScreen.bind(this)}
        onPromoPressedClose={this.onPromoPressedClose.bind(this)}
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
  toggleTagModal,
  togglePromotionModal,
  listenToRecord,
  update,
  submitToBackend,
  readFromDatabase,
  toggleSwipeable
})(index);
