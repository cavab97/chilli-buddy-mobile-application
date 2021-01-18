import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { Dimensions } from "react-native";
import * as Location from "expo-location";
import { getDistance } from "geolib";

import {
  listenToRecord as listenFromDatabase,
  eadFromDatabase as readPromotion,
  removeListenerToRecord as removeListenerFromDatabase,
  verifyPermission,
} from "@redux/promo/action";
import {
  //readFromDatabase as readPromotion,
  listenToRecord as listenPromotion,
} from "@redux/promo/action";

import { SingleVoucher } from "@components/templates";
import { readFromDatabase as readShopPost } from "@redux/shopPost/action";

import ContentLoader, { Rect } from "react-content-loader/native";

import styles from "./styles";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

class index extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const promoId = this.props.promoId;
    this.props.listenFromDatabase({ promoId });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // this.calculateDistance(this.props.shopState.shop.l);
    //console.log("componentDidUpdate");
    //console.log(this.state.location);
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
  }

  componentWillUnmount() {
    this.props.removeListenerFromDatabase();
  }

  onVoucherPressed() {
    const location = this.props.promotion.promotion.shop.l;
    this.calculateDistance(location);
    //console.log(promo.promotion.shop.id)
  }

  calculateDistance = async (destinationLocation) => {
    const promo = this.props.promotion;
    //console.log("get: " + destinationLocation.U + " and " + destinationLocation.k);
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
    //console.log("singleDis: " + distance);

    Actions.SingleVoucher({
      shopId: promo.promotion.shop.id,
      distance: distance,
      calculatedDistance: distance,
    });
  };

  onPressedSwipe = (value) => {
    if (value === "next") this.swiperRef.snapToNext();
    if (value === "back") this.swiperRef.snapToPrev();
  };

  setSwiperRef = (value) => {
    this.swiperRef = value;
  };
  onClickToSwip = (value) => {
    if (value === "next") this.swiperRef.snapToNext();

    if (value === "back") this.swiperRef.snapToPrev();
  };

  renderOperatingHour() {
    const { subIconDetail, operatingContainer } = styles;

    const { shop } = this.props.shopState;

    return shop.operatingHour.map((item, key) => {
      return (
        <View style={operatingContainer} key={key}>
          <Ionicons
            style={(subIconDetail, { paddingRight: "5%", paddingLeft: "6%" })}
            name="md-time"
            size={20}
            color="grey"
          />
          <Text style={{ width: 40, fontFamily: "RobotoRegular" }}>{item.day.toUpperCase()}</Text>
          {item.operate ? (
            <Text style={{ marginLeft: 10, fontFamily: "RobotoRegular" }}>
              {moment(item.open.toString(), "Hmm").format("LT") +
                " to " +
                moment(item.close.toString(), "Hmm").format("LT")}
            </Text>
          ) : (
            <Text style={{ marginLeft: 10, fontFamily: "RobotoRegular" }}>Closed</Text>
          )}
        </View>
      );
    });
  }

  render() {
    const { posterArea, poster } = styles;

    const { promotion, readLoading } = this.props.promotion;

    const noImage = require("@assets/images/404NotFound800x533.jpg");

    if (readLoading) {
      return (
        <ContentLoader speed={1} width={"100%"} height={"100%"} backgroundColor="#d9d9d9">
          <Rect
            x="10"
            y="20"
            rx="10"
            ry="10"
            width={windowWidth - 20}
            height={windowHeight - 110}
          />
        </ContentLoader>
      );
    } else {
      return (
        <SingleVoucher
          onClickToSwip={this.onClickToSwip.bind(this)}
          renderOperatingHour={this.renderOperatingHour.bind(this)}
          dataSource={promotion}
          noImage={noImage}
          distance={this.props.distance}
          calculatedDistance={this.props.calculatedDistance} //distance calculated from single merchant view
          onVoucherPressed={this.onVoucherPressed.bind(this)}
          onPressedSwipe={this.onPressedSwipe.bind(this)}
          setSwiperRef={this.setSwiperRef.bind(this)}
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
  const promotion = state.Promotion;
  return {
    shopState,
    posts,
    readPostLoading,
    promotions,
    promotionState,
    readPromotionLoading,
    promotion,
  };
};

export default connect(mapStateToProps, {
  listenFromDatabase,
  removeListenerFromDatabase,
  readShopPost,
  readPromotion,
  listenPromotion,
  verifyPermission,
})(index);
