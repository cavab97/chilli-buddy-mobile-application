import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { Dimensions } from "react-native";

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
    const promo = this.props.promotion;
    Actions.SingleMerchant({ shopId: promo.promotion.shop.id });
    //console.log(promo.promotion.shop.id)
  }

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
        <SingleMerchantPromo
          dataSource={promotion}
          noImage={noImage}
          distance={this.props.distance}
          onMerchantPressed={this.onMerchantPressed.bind(this)}
          onPressedSwipe={this.onPressedSwipe.bind(this)}
          setSwiperRef={this.setSwiperRef.bind(this)}
        />
      );
    }
  }
}

const mapStateToProps = (state) => {
  const promotion = state.Promotion;

  return { promotion };
};

export default connect(mapStateToProps, { listenFromDatabase, removeListenerFromDatabase })(index);
