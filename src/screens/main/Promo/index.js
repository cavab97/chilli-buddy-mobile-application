import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import * as Location from "expo-location";

import { verifyPermission, loadShopsPromo } from "@redux/promo/action";
import { update, submitToBackend, readFromDatabase } from "@redux/bookmark/action";
import styles from "./styles";

import { Image, Text, TouchableOpacity, View } from "@components/atoms";

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

    if (
      prevProps.bookmarkState.submitLoading &&
      !submitLoading
      //&&
      //prevProps.bookmarkState.readLoading != readLoading
    ) {
      this.handleRefresh();
    }
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
    await this.props.readFromDatabase();
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

  onMerchantPressed(item) {
    Actions.SingleMerchantPromo({ promoId: item.id, distance: item.distance });
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

  lookingForIsBookmark({ promoId } = null) {
    const bookmarks = this.props.bookmarks;
    let isBookmark = null;

    bookmarks.forEach((bookmark) => {
      if (bookmark.promo[0] === promoId) {
        isBookmark = bookmark.isBookmark;
      }
    });
    return isBookmark;
  }

  onBookmarkPressed = async (item) => {
    const shopId = item.shop.id;
    const promoId = item.id;
    const bookmarkId = this.lookingForBookmark({ promoId });
    const isBookmark = this.lookingForIsBookmark({ promoId });
    if (bookmarkId === null) {
      const data = { shopId, promoId, isBookmark };
      await this.props.submitToBackend(data, "create");
      //this.props.readFromDatabase();
    } else {
      const data = { bookmarkId, isBookmark };
      await this.props.submitToBackend(data, "update");
      //this.props.readFromDatabase();
    }
  };

  render() {
    const { readLoading, promo, bookmark } = this.props.promotionState;
    const readBookmark = this.props.bookmarkState.readLoading;
    const submitLoading = this.props.bookmarkState.submitLoading;
    const bookmarks = this.props.bookmarks;
    let promotionInBookmark = [];
    let promotionIds = [];

    //push all promotion id in bookmark
    // bookmarks.forEach((bookmark) => {
    //   promotionInBookmark.push(bookmark.promotion.id, bookmark.isBookmark);
    // });
    promotionInBookmark = bookmarks.map((bookmark) => {
      return {
        promotionId: bookmark.promotion.id,
        isBookmark: bookmark.isBookmark,
      };
    });

    //push all promotion id
    promo.forEach((promotion) => {
      promotionIds.push(promotion.id);
    });

    //map both array and return if the promotion got bookmark
    // const gotBookmark = promotionIds.map((el) => {
    //   return promotionInBookmark.includes(el);
    // });

    const gotBookmark = promotionIds.map((promotionId) => {
      const m = promotionInBookmark.filter((bookmark) => {
        return bookmark.promotionId === promotionId;
        // if (bookmark.promotionId === promotionId) {
        //   console.log("a: " + bookmark.isBookmark);
        //   return bookmark.isBookmark;
        // }
      });

      if (m.length > 0) {
        return m[0].isBookmark;
      } else {
        return false;
      }
    });

    return (
      <PromoList
        loading={readLoading}
        readBookmark={readBookmark}
        submitLoading={submitLoading}
        dataSource={promo}
        gotBookmark={gotBookmark}
        categories={this.state.categories}
        tags={this.state.tags}
        selectedCategory={this.state.selectedCategory}
        handleRefresh={this.handleRefresh.bind(this)}
        renderFooter={this.renderFooter.bind(this)}
        onMerchantPressed={this.onMerchantPressed.bind(this)}
        onBookmarkPressed={this.onBookmarkPressed.bind(this)}
        onCategoryChange={this.onCategoryChange.bind(this)}
        onTagChange={this.onTagChange.bind(this)}
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
  update,
  submitToBackend,
  readFromDatabase,
})(index);
