import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import * as Location from "expo-location";

import { verifyPermission, loadBookmark } from "@redux/bookmark/action";
import { update, submitToBackend } from "@redux/bookmark/action";
import { onBookmarkClick } from "@redux/promo/action";

import styles from "./styles";

import { Image, Text, TouchableOpacity, View } from "@components/atoms";

import { Card, CardSection } from "@components/molecules";

import { FavouriteList } from "@components/templates";

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
      readLoading: true,
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
    this.setState({ readLoading: false });
  };

  renderFooter({ empty }) {
    if (empty) {
      return Platform.OS === "ios" ? (
        <Card style={{ backgroundColor: "transparent" }}>
          <CardSection style={styles.emptySection}>
            <Icon name="inbox" size={64} style={styles.emptyIcon} />
            <Text style={styles.emptyText}>NO BOOKMARK FOUND</Text>
          </CardSection>
        </Card>
      ) : (
        <Card style={{ backgroundColor: "transparent", elevation: 0 }}>
          <CardSection style={[styles.emptySection, { elevation: 0 }]}>
            <Icon name="inbox" size={64} style={styles.emptyIcon} />
            <Text style={styles.emptyText}>NO BOOKMARK FOUND</Text>
          </CardSection>
        </Card>
      );
    } else {
      return <View style={{ marginBottom: 10 }} />;
    }
  }

  onMerchantPressed(item) {
    Actions.SingleMerchantPromo({ promoId: item.promotion.id, distance: item.distance });
  }

  onCategoryChange = (value) => {
    this.setState({ selectedCategory: value, selectedTag: "All" });
    this.handleRefresh();
  };

  onTagChange = (value) => {
    this.setState({ selectedTag: value });
    this.handleRefresh();
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
  onBackPressed() {
    Actions.pop("Favourite");
  }
  onShopsPressed() {}
  onPromotionsPressed() {}

  render() {
    const { readLoading, promo, bookmark } = this.props.promotionState;
    const readBookmark = this.props.bookmarkState.readBookmark;
    const submitLoading = this.props.bookmarkState.submitLoading;
    const bookmarks = this.props.bookmarkState.bookmarks;
    let isBookmark = [];
    let activeBookmarks = [];

    bookmarks.forEach((bookmark) => {
      if (bookmark.isBookmark === true) {
        activeBookmarks.push(bookmark);
      }
    });

    activeBookmarks.forEach((bookmark) => {
      isBookmark.push(bookmark.isBookmark);
    });

    return (
      <FavouriteList
        readBookmark={readBookmark}
        readLoading={this.state.readLoading}
        submitLoading={submitLoading}
        dataSource={activeBookmarks}
        categories={this.state.categories}
        tags={this.state.tags}
        selectedCategory={this.state.selectedCategory}
        handleRefresh={this.handleRefresh.bind(this)}
        renderFooter={this.renderFooter.bind(this)}
        onMerchantPressed={this.onMerchantPressed.bind(this)}
        onBookmarkPressed={this.onBookmarkPressed.bind(this)}
        onCategoryChange={this.onCategoryChange.bind(this)}
        onTagChange={this.onTagChange.bind(this)}
        onBackPressed={this.onBackPressed.bind(this)}
        onShopsPressed={this.onShopsPressed.bind(this)}
        onPromotionsPressed={this.onPromotionsPressed.bind(this)}
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
  loadBookmark,
  onBookmarkClick,
  update,
  submitToBackend,
})(index);
