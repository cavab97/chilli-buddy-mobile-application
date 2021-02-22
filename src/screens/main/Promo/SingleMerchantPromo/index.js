import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { Dimensions } from "react-native";
import * as Location from "expo-location";
import { getDistance } from "geolib";

import {
  listenToRecord as listenFromDatabase,
  removeListenerToRecord as removeListenerFromDatabase,
} from "@redux/promo/action";

import { SingleMerchantPromo } from "@components/templates";

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

  componentWillUnmount() {
    this.props.removeListenerFromDatabase();
  }

  onMerchantPressed() {
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

    Actions.SingleMerchant({
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

  render() {
    const { posterArea, poster } = styles;

    const { promotion, readLoading } = this.props.promotion;

    const noImage = require("@assets/images/404NotFound800x533.jpg");

    return (
      <SingleMerchantPromo
        dataSource={promotion}
        noImage={noImage}
        distance={this.props.distance}
        calculatedDistance={this.props.calculatedDistance} //distance calculated from single merchant view
        onMerchantPressed={this.onMerchantPressed.bind(this)}
        onPressedSwipe={this.onPressedSwipe.bind(this)}
        setSwiperRef={this.setSwiperRef.bind(this)}
        readDataStatus={readLoading}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const promotion = state.Promotion;

  return { promotion };
};

export default connect(mapStateToProps, {
  listenFromDatabase,
  removeListenerFromDatabase,
})(index);
