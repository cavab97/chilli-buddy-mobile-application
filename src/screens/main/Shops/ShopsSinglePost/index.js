import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { Dimensions, Share } from "react-native";
import * as Location from "expo-location";
import moment from "moment";

import {
  listenToRecord as listenFromDatabase,
  readFromDatabase as readPromotion,
  removeListenerToRecord as removeListenerFromDatabase,
  verifyPermission,
} from "@redux/shops/action";
import { readObjects as readShopPost, readObject as readSinglePost } from "@redux/shopPost/action";

import { ShopsSinglePost } from "@components/templates";

class index extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const postId = this.props.postId;
    // console.log("shopId");

    // console.log(postId);
    // this.props.readPromotion(shopId);
    // this.props.listenFromDatabase({ shopId });
    // this.props.readShopPost(shopId);
    await this.props.readSinglePost(postId);

    // if (shopId) {
    //   await this.props.listenFromDatabase({ shopId });
    // }

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
    // const promoId = this.props.promoId;
    // this.props.listenFromDatabase({ promoId });
  }

  componentWillUnmount() {
    // this.props.removeListenerFromDatabase();
  }
  catchCondition() {
    const { post } = this.props;
    // console.log(post.created.at.seconds);
    let countDownOneHour;
    let returnTime;
    if (post.created.at != null) {
      countDownOneHour = post.created.at.seconds;
    } else {
      countDownOneHour = 0;
    }
    let createIsoDate = new Date(countDownOneHour * 1000).toISOString();

    let day = moment(createIsoDate).diff(moment(), "days");
    let hour = moment(createIsoDate).diff(moment(), "hours");
    let minutes = moment(createIsoDate).diff(moment(), "minutes");
    let seconds = moment(createIsoDate).diff(moment(), "seconds");
    if (-seconds < 60) {
      returnTime = -seconds + " second ago";
    } else if (-minutes < 60) {
      returnTime = -minutes + " minute ago";
    } else if (-hour < 24) {
      returnTime = -hour + " hour ago";
    } else {
      returnTime = -day + " day ago";
    }

    return returnTime;
  }

  onPostPressed() {
    // const location = this.props.promotion.promotion.shop.l;
    // this.calculateDistance(location);
  }
  find_dimensions = (layout) => {
    const { x, y, width, height } = layout;
    // this.setState({ viewHeight: height });
  };

  onShare(item) {
    // const { settingInfo } = this.props;
    // const { fbPost, title, message } = settingInfo.share;

    const regex = /(<([^>]+)>)/gi;
    // console.log(item.shop.websiteUrl);
    const shareOptions = {
      // url: promotion.facebookUrl,
      url: "https://chillibuddy.com/",

      title: item.title,
      // message: item.description.replace(regex, ""), dataSource.websiteUrl
      message:
        item.shop.facebookUrl != null
          ? "Now " +
            item.title +
            " Promotion at" +
            item.shop.displayTitle +
            " , Visit Us Facebook Link :" +
            "https://" +
            item.shop.facebookUrl
          : item.shop.websiteUrl != null
          ? "Now " +
            item.title +
            " Promotion at " +
            item.shop.displayTitle +
            ",Visit Us Facebook Link :" +
            "https://" +
            item.shop.websiteUrl
          : "Now " +
            item.title +
            " Promotion at " +
            item.shop.displayTitle +
            ", Contact Us Phone :" +
            `+6${item.shop.phoneNumber}`,
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

  // ImageSize(uri) {
  //   Image.getSize(uri, (width, height) => {
  //     this.setState({ imgWidth: width, imgHeight: height });
  //   });
  // }
  render() {
    const { post, readPostLoading } = this.props;
    const { shop, readLoading } = this.props.shopState;

    let icon;
    let postImage = [];
    if (post.shop.logo.length === 0 || post.shop.logo == undefined) {
      if (shop.logo == undefined || shop.logo.length === 0) {
        icon = require("@assets/logo.png");
      } else icon = { uri: shop.logo[0] };
    } else icon = { uri: post.shop.logo[0] };

    // const { posterArea, poster } = styles;

    // const { promotion, readLoading } = this.props.promotion;

    // const noImage = require("@assets/images/404NotFound800x533.jpg");

    // if (readLoading) {
    //   return (icon
    //     <ContentLoader speed={1} width={"100%"} height={"100%"} backgroundColor="#d9d9d9">
    //       <Rect
    //         x="10"
    //         y="20"
    //         rx="10"
    //         ry="10"
    //         width={windowWidth - 20}
    //         height={windowHeight - 110}
    //       />
    //     </ContentLoader>
    //   );
    // } else {
    return (
      <ShopsSinglePost
        readPostLoading={readPostLoading}
        catchCondition={this.catchCondition()}
        shopPosts={post}
        icon={icon}
        find_dimensions={this.find_dimensions}
        SharePress={this.onShare.bind(this)}
        // ImageSize={this.ImageSize.bind(this)}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const shopState = state.Shops;
  const posts = state.ShopPost.posts;
  const post = state.ShopPost.post;
  const readPostLoading = state.ShopPost.readLoading;
  const promotions = state.Shops.promo;
  //const promotions = state.Promotion.promo;
  //   const promotionState = state.Promotion;
  const readPromotionLoading = state.Promotion.readLoading;
  return {
    shopState,
    posts,
    readPostLoading,
    promotions,
    // promotionState,
    readPromotionLoading,
    post,
  };
};

export default connect(mapStateToProps, {
  listenFromDatabase,
  removeListenerFromDatabase,
  readShopPost,
  readPromotion,
  verifyPermission,
  readSinglePost,
})(index);
