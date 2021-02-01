import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { ActivityIndicator, ScrollView } from "../../../../components/atoms";
import { Dimensions, View, Text } from "react-native";
import moment from "moment";

import { listenToRecord as listenFromDatabase } from "@redux/voucher/action";

import { SingleVoucher, SingleVoucherErrorModal } from "@components/templates";

import ContentLoader, { Rect } from "react-content-loader/native";

import styles from "./styles";

const { height } = Dimensions.get("window");

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
    const voucherID = this.props.voucherID;
    this.props.listenFromDatabase({ voucherID });
  }

  componentDidUpdate() {}

  componentWillUnmount() {}

  onRedeemPress() {
    Actions.RedeemedVoucherScreen({ RedeemStatus: true });
  }

  OpenCamPress() {
    Actions.SingleVoucherRedeem({ voucherIds: this.props.voucherID });
  }

  OnInvalidPress() {
    this.setState({ errorStatus: true });
  }

  errorSubmit() {
    this.setState({ errorStatus: false });
  }

  // renderTermAndCondition() {
  //   const { subIconDetail, operatingContainer } = styles;

  //   const { shop } = this.props.shopState;

  //   return shop.operatingHour.map((item, key) => {
  //     return (
  //       <View style={operatingContainer} key={key}>
  //         <Ionicons
  //           style={(subIconDetail, { paddingRight: "5%", paddingLeft: "6%" })}
  //           name="md-attach"
  //           size={20}
  //           color="grey"
  //         />
  //         <Text style={{ width: 40, fontFamily: "RobotoRegular" }}>{item.day.toUpperCase()}</Text>
  //         {item.operate ? (
  //           <Text style={{ marginLeft: 10, fontFamily: "RobotoRegular" }}>
  //             {moment(item.open.toString(), "Hmm").format("LT") +
  //               " to " +
  //               moment(item.close.toString(), "Hmm").format("LT")}
  //           </Text>
  //         ) : (
  //           <Text style={{ marginLeft: 10, fontFamily: "RobotoRegular" }}>Closed</Text>
  //         )}
  //       </View>
  //     );
  //   });
  // }

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

    const { readLoading, voucher } = this.props.voucherState;

    let cover;

    const noImage = require("@assets/chilliBuddyCheckin/backgroundIma.png");
    const { errorStatus, errorHeader, errorMessage } = this.state;

    // console.log(voucher.merchant[0].businessName);
    // console.log(voucher.merchant[0].businessName == undefined);
    // console.log(voucher);
    try {
      // console.log("vouchers");
      // console.log(voucher.merchant[0].businessName);
    } catch (error) {
      // console.log("voucher.startDate");
      // console.log(voucher);
      // console.log(error);
    }

    if (!errorStatus) {
      // console.log(voucher);
      if (readLoading) {
        return (
          <ScrollView>
            <View style={styles.container}>
              <ContentLoader speed={1} width={"100%"} height={height} backgroundColor="#d9d9d9">
                <Rect x="60%" y="0" rx="5" ry="5" width="40%" height="20" />
                <Rect x="0" y="40" rx="5" ry="5" width="100%" height="200" />
                <Rect x="0" y="250" rx="5" ry="5" width="50%" height="20" />
                <Rect x="0" y="275" rx="5" ry="5" width="50%" height="20" />
                <Rect x="0" y="320" rx="5" ry="5" width="100%" height={height} />
              </ContentLoader>
            </View>
          </ScrollView>
        );
      }

      return this.props.voucherState.readLoading == true ? (
        <ActivityIndicator size="large" color="black" style={styles.smallRedeemImageStarStyle} />
      ) : (
        // console.log(voucher),
        // console.log("voucher.merchant[0]"),
        // console.log(voucher.merchant.businessName == null),
        <SingleVoucher
          shopPosts={posts}
          onRedeemPress={this.onRedeemPress.bind(this)}
          title={voucher.title}
          SalesPoint={voucher.amount}
          noImage={noImage}
          image={noImage}
          expiredDate={voucher.endDate}
          tnc={voucher.tnc === null ? "No terms and condition found." : voucher.tnc}
          merchantName={
            voucher.merchant.businessName == null
              ? this.props.merchantName
              : voucher.merchant[0].businessName
          }
          // description={readLoading ? voucher.description : null}
          // voucher.merchant[0].businessName == undefined ? null : voucher.merchant[0].businessName

          // merchantName={voucher.vouchers[0].merchant[0].businessName}
          description={voucher.description === null ? "No description found." : voucher.description}
          status={voucherStatus}
          OpenCamPress={this.OpenCamPress.bind(this)}
          OnInvalidPress={this.OnInvalidPress.bind(this)}
          startDate={voucher.startDate != null ? voucher.startDate : "AnyTime"}
          endDate={voucher.endDate != null ? voucher.endDate : "AnyTime"}
          readLoading={this.props.voucherState.readLoading}
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
  const voucherState = state.Voucher;
  return {
    voucherState,
  };
};

export default connect(mapStateToProps, {
  listenFromDatabase,
})(index);
