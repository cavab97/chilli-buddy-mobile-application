import React, { Component, useRef } from "react";

import { connect } from "react-redux";
import * as Location from "expo-location";
import { View, Text } from "../../../../components/atoms";

import {
  listenToRecord as listenFromDatabase,
  readFromDatabase as readPromotion,
  removeListenerToRecord as removeListenerFromDatabase,
  verifyPermission,
  onFavouriteClick,
  loadShops,
} from "@redux/shops/action";

import { readObjects as readShopPost } from "@redux/shopPost/action";

import {
  //readFromDatabase as readPromotion,
  listenToRecord as listenPromotion,
  togglePromotionModal,
} from "@redux/promo/action";

import ContentLoader, { Rect } from "react-content-loader/native";

import { SingleMerchant } from "@components/templates";

import moment from "moment";
import styles from "./styles";
import { Actions } from "react-native-router-flux";
import { getDistance } from "geolib";
import { Platform, Share } from "react-native";
import {
  update,
  submitToBackend,
  readFromDatabase,
  updateIsFavourite,
} from "@redux/favourite/action";

import { loadSearchShops, onShopSpecificClick } from "@redux/search/action";
const RADIUS = 50;

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radiusAddition: 1,

      isOpenPost: false,
      viewHeight: 0,
      calculatedDistance: 0,
      location: null,
      getLocationLoading: true,
      isFavourite: false,
    };
  }

  componentDidMount = async () => {
    // await this.props.loadShops({
    //   radius: RADIUS * this.state.radiusAddition,
    //   selectedCategory: null,
    //   selectedTag: null,
    //   // limit: this.state.limit,
    // });
    const shopId = this.props.shopId;
    // this.props.readSingleFavourite(shopId);
    //let favourite = this.lookingForFavourite({ shopId });

    //this.setState({ isFavourite: favourite ? true : false });
    this.props.readPromotion(shopId);
    this.props.listenFromDatabase({ shopId });
    this.props.readShopPost(shopId);
    let singleShopInfo = this.lookingForSingleShop({ shopId });

    this.setState({
      isFavourite: singleShopInfo ? singleShopInfo.isFavourite : false,
    });

    this.props.verifyPermission().then(async (permissions) => {
      if (permissions.location !== "granted") {
        if (permissions.location.permissions.location.foregroundGranted === undefined) {
          alert("Permission to access location is necessary");
        } else if (permissions.location.permissions.location.foregroundGranted === true) {
          this.setState({ location: await Location.getCurrentPositionAsync({}) });
        }
      } else {
        this.setState({ location: await Location.getCurrentPositionAsync({}) });
      }
      this.setState({ getLocationLoading: false });
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    /* if (
        //Shop location changed
        prevProps.shopState.shop.l.U !== this.props.shopState.shop.l.U ||
        prevProps.shopState.shop.l.k !== this.props.shopState.shop.l.k ||
        //Current location gain
        (!prevState.location &&
          this.state.location &&
          //Shop location exist
          this.props.shopState.shop.l.U &&
          this.props.shopState.shop.l.k)
      ) {
        this.calculateDistance(this.props.shopState.shop.l);
      } */
  }

  componentWillUnmount() {
    this.props.removeListenerFromDatabase();
  }

  // //Calculate distance from logitude and latitude
  // calculateDistance = async (destinationLocation) => {
  //   try {
  //     var distance;
  //     var location = this.state.location;

  //     // if (location == null) {
  //     //   return;
  //     // }

  //     distance =
  //       getDistance(
  //         { latitude: destinationLocation.U, longitude: destinationLocation.k },
  //         {
  //           latitude: location.coords.latitude,
  //           longitude: location.coords.longitude,
  //         }
  //       ) / 1000;
  //     this.setState({ calculatedDistance: distance });
  //   } catch (e) {
  //     this.setState({ locationLoading: false });
  //   }
  // };

  renderOperatingHour() {
    const { subIconDetail, operatingContainer } = styles;

    const { shop } = this.props.shopState;

    return shop.operatingHour.map((item, key) => {
      return (
        <View style={operatingContainer} key={key}>
          {/* <Ionicons
            style={(subIconDetail, { paddingRight: "5%", paddingLeft: "6%" })}
            name="md-time"
            size={20}
            color="grey"
          /> */}
          <Text style={{ width: "40%", fontFamily: "HorizontalRounded", color: "grey" }}>
            {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
          </Text>
          {item.operate ? (
            <Text
              style={{
                marginLeft: 0,
                fontFamily: "HorizontalRounded",
                color: "grey",
                paddingRight: 5,
              }}
            >
              {moment(item.open.toString(), "Hmm").format("LT") +
                " to " +
                moment(item.close.toString(), "Hmm").format("LT")}
            </Text>
          ) : (
            <Text style={{ marginLeft: 0, fontFamily: "HorizontalRounded", color: "grey" }}>
              Closed
            </Text>
          )}
        </View>
      );
    });
  }

  onPostTitleClick = () => {
    this.setState({ isOpenPost: !this.state.isOpenPost });
  };

  onPromoteClick = (item, distance, calculatedDistance) => {
    //const promoId = this.props.promotions[0].id;
    Actions.SingleMerchantPromo({
      promoId: item.id,
      distance: distance,
      calculatedDistance: calculatedDistance,
    });
  };

  onPostPress = async (item) => {
    //const promoId = this.props.promotions[0].id;
    this.setState({ isOpenPost: !this.state.isOpenPost });
    Actions.ShopsSinglePost({
      postId: item.id,
      distance: item.distance,
      categoryName: item.category,
    });
  };
  lookingForSingleShop({ shopId } = null) {
    const { shops } = this.props.shopState;
    let shopInfo = null;

    shops.forEach((shop) => {
      if (shop.id === shopId) {
        shopInfo = shop;
      }
    });

    return shopInfo;
  }

  lookingForFavourite({ shopId } = null) {
    const favourites = this.props.favouriteState.favourites;

    let favouriteId = null;

    favourites.forEach((favourite) => {
      if (favourite.shopIds[0] === shopId) {
        //favouriteId = favourite.id;
        favouriteId = favourite.id;
      }
    });
    return favouriteId;
  }

  onFavouritePressed = async (item) => {
    this.setState({ isFavourite: !this.state.isFavourite });
    const shopId = this.props.shopId;
    const favouriteId = this.lookingForFavourite({ shopId });
    const isFavourite = !item;
    this.props.onFavouriteClick(shopId);
    this.props.updateIsFavourite(shopId);
    this.props.onShopSpecificClick(shopId);

    // console.log(isFavourite);
    if (favouriteId === null) {
      const data = { shopId, isFavourite };
      await this.props.submitToBackend(data, "create");
    } else {
      const data = { favouriteId, isFavourite };
      await this.props.submitToBackend(data, "update");
    }
  };

  onClickToSwip = (value) => {
    if (value === "next") this.swiperRef.snapToNext();

    if (value === "back") this.swiperRef.snapToPrev();
  };

  setSwiperRef = (value) => {
    this.swiperRef = value;
  };

  find_dimensions = (layout) => {
    const { x, y, width, height } = layout;
    // this.setState({ viewHeight: height });
  };

  onPromoPressedClose() {
    this.props.togglePromotionModal();
  }

  onPromoPressed(item) {
    //Actions.SingleMerchantPromo({ promoId: item.id, distance: item.distance });
    this.props.listenPromotion({ promoId: item.id });
    this.props.togglePromotionModal();
  }

  onShare(item) {
    const { promotion } = this.props.promotionState;

    const regex = /(<([^>]+)>)/gi;

    const shareOptions = {
      // url: promotion.facebookUrl,
      // url: "https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en",

      title: item.title,
      // message: item.description.replace(regex, ""), dataSource.websiteUrl
      message:
        item.shop.facebookUrl != null
          ? "Now " +
            item.title +
            " Promotion at" +
            item.shop.displayTitle +
            ", Facebook Link :" +
            "https://" +
            item.shop.facebookUrl
          : item.shop.websiteUrl != null
          ? "Now " +
            item.title +
            " Promotion at " +
            item.shop.displayTitle +
            ", Facebook Link :" +
            "https://" +
            item.shop.websiteUrl
          : "Now " +
            item.title +
            " Promotion at" +
            item.shop.displayTitle +
            ", Phone :" +
            `tel:${item.shop.phoneNumber}`,
      subject: item.title,
    };

    Share.share(shareOptions)
      .then(({ action, activityType }) => {
        if (action === Share.dismissedAction) {
        } else {
          setTimeout(() => {
            this.setState({ invited: true });
          }, 3000);
        }
      })
      .catch((error) => this.setState({ result: "error: " + error.message }));
  }

  render() {
    const { shop, readLoading } = this.props.shopState;
    const { promotion, promotionModalVisible } = this.props.promotionState;

    const {
      posts,
      readPostLoading,
      promotions,
      readPromotionLoading,
      categories,
      isFavourited,
    } = this.props;

    const noImage = require("@assets/images/404NotFound800x533.jpeg");
    const noPromoteImage = require("@assets/gogogain/pinpng.com-camera-drawing-png-1886718.png");

    let icon = [];
    let postImage = [];

    let category;

    if (shop.categories) {
      category = categories.filter((category) => category.id === shop.categories[0]);
    }

    if (shop.logo != undefined) {
      if (shop.logo.length === 0) icon = require("@assets/logo.png");
      else icon = { uri: shop.logo[0] };
    }

    if (shop.images != undefined) {
      if (shop.images.length === 0) postImage = require("@assets/logo.png");
      else {
        postImage = { uri: shop.images[1] };
      }
    }

    if (readLoading || readPostLoading || readPromotionLoading || this.state.getLocationLoading) {
      return (
        <ContentLoader speed={1} width={"100%"} height={"100%"} backgroundColor="#d9d9d9">
          <Rect x="0" y="0" rx="0" ry="0" width="100%" height="250" />
          <Rect x="20" y="280" rx="10" ry="10" width="250" height="35" />
          <Rect x="20" y="330" rx="10" ry="10" width="250" height="175" />
          <Rect x="20" y="520" rx="10" ry="10" width="250" height="30" />
          <Rect x="20" y="570" rx="10" ry="10" width="250" height="30" />
        </ContentLoader>
      );
    } else {
      return (
        <SingleMerchant
          dataSource={shop}
          icon={icon}
          postImage={postImage}
          noImage={noImage}
          noPromoteImage={noPromoteImage}
          isOpenPost={this.state.isOpenPost}
          shopPosts={posts}
          promotions={promotions}
          renderOperatingHour={this.renderOperatingHour.bind(this)}
          onPostTitleClick={this.onPostTitleClick.bind(this)}
          onPromoteClick={this.onPromoteClick.bind(this)}
          setSwiperRef={this.setSwiperRef.bind(this)}
          onClickToSwip={this.onClickToSwip.bind(this)}
          find_dimensions={this.find_dimensions}
          viewHeight={this.state.viewHeight}
          distance={this.props.distance}
          categoryName={category ? category[0].title : ""}
          calculatedDistance={this.state.calculatedDistance}
          onPostPress={this.onPostPress.bind(this)}
          onFavouriteClick={this.onFavouritePressed.bind(this)}
          // alterData={this.alterData.bind(this)}
          promotion={promotion}
          promotionModal={promotionModalVisible}
          onPromoPressed={this.onPromoPressed.bind(this)}
          onPromoPressedClose={this.onPromoPressedClose.bind(this)}
          isFavourite={this.state.isFavourite}
          SharePress={this.onShare.bind(this)}
        />
      );
    }
  }
}

const mapStateToProps = (state) => {
  const shopState = state.Shops;
  const posts = state.ShopPost.posts;
  const readPostLoading = state.ShopPost.readLoading;
  const promotions = state.Shops.promo;
  //const promotions = state.Promotion.promo;
  const promotionState = state.Promotion;
  const readPromotionLoading = state.Promotion.readLoading;
  const favouriteState = state.Favourite;
  const settingInfo = state.Settings.info;
  const { categories } = state.Settings;

  return {
    shopState,
    posts,
    readPostLoading,
    promotions,
    promotionState,
    readPromotionLoading,
    favouriteState,
    settingInfo,
    categories,
  };
};

export default connect(mapStateToProps, {
  listenFromDatabase,
  removeListenerFromDatabase,
  readShopPost,
  readPromotion,
  listenPromotion,
  togglePromotionModal,
  verifyPermission,
  readFromDatabase,
  submitToBackend,
  updateIsFavourite,
  onFavouriteClick,
  loadShops,
  loadSearchShops,
  onShopSpecificClick,
})(index);
