import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions, View, Text } from "react-native";
import moment from "moment";

import { listenToRecord as listenFromDatabase } from "@redux/promo/action";

import { SingleVoucher, SingleVoucherErrorModal } from "@components/templates";
import { readFromDatabase as readShopPost } from "@redux/shopPost/action";

import ContentLoader, { Rect } from "react-content-loader/native";

import styles from "./styles";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorHeader: "This Voucher is Redeemed",
      errorMessage: ":(",
      errorStatus: false,
    };
  }

  componentDidMount() {
    // const promoId = this.props.promoId;
    // this.voucherTitle = this.props.voucherTitle;
    // this.props.listenFromDatabase({ promoId });
  }

  componentDidUpdate() {
    // this.calculateDistance(this.props.shopState.shop.l);
    //console.log("componentDidUpdate");
    //console.log(this.state.location);
  }

  componentWillUnmount() {}

  onRedeemPress() {
    Actions.RedeemedVoucherScreen({ RedeemStatus: true });
  }

  OpenCamPress() {
    Actions.SingleVoucherRedeem();
  }
  OnInvalidPress() {
    this.setState({ errorStatus: true });
  }
  errorSubmit() {
    this.setState({ errorStatus: false });
  }

  renderTermAndCondition() {
    const { subIconDetail, operatingContainer } = styles;

    const { shop } = this.props.shopState;

    return shop.operatingHour.map((item, key) => {
      return (
        <View style={operatingContainer} key={key}>
          <Ionicons
            style={(subIconDetail, { paddingRight: "5%", paddingLeft: "6%" })}
            name="md-attach"
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
    const {
      posts,
      voucherTitle,
      voucherSalesPoint,
      vocuherExpiredDate,
      voucherMerchantName,
      voucherDescription,
      voucherStatus,
    } = this.props;

    const noImage = require("@assets/chillibuddy/category1.png");
    const { errorStatus, errorHeader, errorMessage } = this.state;
    console.log(errorHeader);
    console.log(errorStatus);

    if (!errorStatus) {
      return (
        <SingleVoucher
          renderTermAndCondition={this.renderTermAndCondition.bind(this)}
          shopPosts={posts}
          onRedeemPress={this.onRedeemPress.bind(this)}
          title={voucherTitle}
          SalesPoint={voucherSalesPoint}
          noImage={noImage}
          expiredDate={vocuherExpiredDate}
          merchantName={voucherMerchantName}
          description={voucherDescription}
          status={voucherStatus}
          OpenCamPress={this.OpenCamPress.bind(this)}
          OnInvalidPress={this.OnInvalidPress.bind(this)}
        />
      );
    } else {
      return (
        <SingleVoucherErrorModal
          errorHeader={errorHeader}
          errorMessage={errorMessage}
          errorStatus={errorStatus}
          errorSubmit={this.errorSubmit.bind(this)}
        />
      );
    }
  }
}

const mapStateToProps = (state) => {
  const shopState = state.Shops;
  return {
    shopState,
  };
};

export default connect(mapStateToProps, {
  listenFromDatabase,
  readShopPost,
})(index);
