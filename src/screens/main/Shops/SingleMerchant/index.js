import React, { Component, useRef } from "react";
import { connect } from "react-redux";
import * as Location from "expo-location";
import { View, Text } from "../../../../components/atoms";

import {
  listenToRecord as listenFromDatabase,
  readFromDatabase as readPromotion,
  removeListenerToRecord as removeListenerFromDatabase,
  verifyPermission,
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
import { Platform } from "react-native";
import {
  update,
  submitToBackend,
  readFromDatabase,
  updateIsFavourite,
} from "@redux/favourite/action";
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenPost: false,
      viewHeight: 0,
      calculatedDistance: 0,
      location: null,
      getLocationLoading: true,
      isFavourite: false,
    };
  }

  componentDidMount() {
    const shopId = this.props.shopId;
    // this.props.readSingleFavourite(shopId);
    let favourite = this.lookingForFavourite({ shopId });

    this.setState({ isFavourite: favourite ? favourite.isFavourite : false });

    this.props.readPromotion(shopId);
    this.props.listenFromDatabase({ shopId });
    this.props.readShopPost(shopId);
    this.props.readFromDatabase();

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
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console("prevProps.shopState.shop.l.U == undefined");

    // console(prevProps.shopState.shop.l.U == undefined);
    if (prevProps.shopState.shop.l.U !== undefined) {
      if (
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
        //console.log("enter if");
        this.calculateDistance(this.props.shopState.shop.l);
      }
    } else console.log("ret");
  }

  componentWillUnmount() {
    this.props.removeListenerFromDatabase();
  }

  //Calculate distance from logitude and latitude
  calculateDistance = async (destinationLocation) => {
    //console.log("calculatedistance");
    try {
      var distance;
      var location = this.state.location;

      // if (location == null) {
      //   return;
      // }

      distance =
        getDistance(
          { latitude: destinationLocation.U, longitude: destinationLocation.k },
          {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }
        ) / 1000;
      this.setState({ calculatedDistance: distance });
      //console.log("calculatedistance");
      //console.log("distance1: " + this.state.calculatedDistance);
    } catch (e) {
      this.setState({ locationLoading: false });
    }
  };

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
            <Text style={{ marginLeft: 10, fontFamily: "HorizontalRounded", color: "grey" }}>
              {moment(item.open.toString(), "Hmm").format("LT") +
                " to " +
                moment(item.close.toString(), "Hmm").format("LT")}
            </Text>
          ) : (
            <Text style={{ marginLeft: 10, fontFamily: "HorizontalRounded", color: "grey" }}>
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
    //console.log("singlemerchant: " + calculatedDistance);
    Actions.SingleMerchantPromo({
      promoId: item.id,
      distance: distance,
      calculatedDistance: calculatedDistance,
    });
  };

  onPostPress = async (item) => {
    //const promoId = this.props.promotions[0].id;
    //console.log("singlemerchant: " + calculatedDistance);
    // console.log("item.id");
    // console.log(item.id);
    this.setState({ isOpenPost: !this.state.isOpenPost });

    Actions.ShopsSinglePost({
      postId: item.id,
      distance: item.distance,
      categoryName: item.category,
    });
  };

  lookingForFavourite({ shopId } = null) {
    const favourites = this.props.favouriteState.favourites;

    let favourite = null;

    favourite = favourites.filter(favourite => favourite.shopIds[0] === shopId)

    return favourite.length > 0 ? favourite[0] : null;
  }

  onFavouriteClick = async (item) => {
    const shopId = item;

    const favourite = this.lookingForFavourite({ shopId });
    const favouriteId = favourite.id;

    const isFavourite = !favourite.isFavourite;

    this.props.updateIsFavourite(shopId);
    this.setState({ isFavourite: isFavourite });

    if (favouriteId === null) {
      const data = { favouriteId, isFavourite };
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

  render() {
    const { shop, readLoading } = this.props.shopState;
    const { promotion, promotionModalVisible } = this.props.promotionState;

    const { posts, readPostLoading, promotions, readPromotionLoading } = this.props;

    const noImage = require("@assets/images/404NotFound800x533.jpg");
    const noPromoteImage = require("@assets/gogogain/pinpng.com-camera-drawing-png-1886718.png");

    let icon = [];
    let postImage = [];
    // console.log("shop.logo == undefined");

    // console.log(shop.logo == undefined);
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
          categoryName={this.props.categoryName}
          calculatedDistance={this.state.calculatedDistance}
          onPostPress={this.onPostPress.bind(this)}
          onFavouriteClick={this.onFavouriteClick.bind(this)}
          // alterData={this.alterData.bind(this)}
          promotion={promotion}
          promotionModal={promotionModalVisible}
          onPromoPressed={this.onPromoPressed.bind(this)}
          onPromoPressedClose={this.onPromoPressedClose.bind(this)}
          isFavourite={this.state.isFavourite}
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

  return {
    shopState,
    posts,
    readPostLoading,
    promotions,
    promotionState,
    readPromotionLoading,
    favouriteState,
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
})(index);
