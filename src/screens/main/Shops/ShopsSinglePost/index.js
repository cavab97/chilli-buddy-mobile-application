import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { Dimensions } from "react-native";

import {
  listenToRecord as listenFromDatabase,
  readFromDatabase as readPromotion,
  removeListenerToRecord as removeListenerFromDatabase,
  verifyPermission,
} from "@redux/shops/action";
import { readObjects as readShopPost, readObject as readSinglePost } from "@redux/shopPost/action";

import { ShopsSinglePost } from "@components/templates";

import ContentLoader, { Rect } from "react-content-loader/native";

import styles from "./styles";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

class index extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const postId = this.props.postId;
    console.log("shopId");

    console.log(postId);
    // this.props.readPromotion(shopId);
    // this.props.listenFromDatabase({ shopId });
    // this.props.readShopPost(shopId);
    this.props.readSinglePost(postId);
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

  onPostPressed() {
    // const location = this.props.promotion.promotion.shop.l;
    // this.calculateDistance(location);
    //console.log(promo.promotion.shop.id)
  }
  find_dimensions = (layout) => {
    const { x, y, width, height } = layout;
    // this.setState({ viewHeight: height });
  };

  render() {
    const { shop, readLoading } = this.props.shopState;
    const { post, readPostLoading, promotions, readPromotionLoading } = this.props;
    // console.log("posts.id");

    // console.log(post);

    let icon = [];
    let postImage = [];
    if (shop.logo.length === 0) icon = require("@assets/logo.png");
    else icon = { uri: shop.logo[0] };
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
        shopPosts={post}
        icon={icon}
        dataSource={shop}
        find_dimensions={this.find_dimensions}
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
