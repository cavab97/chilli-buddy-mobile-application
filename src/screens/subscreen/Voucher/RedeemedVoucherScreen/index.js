import React, { Component } from "react";
import { connect } from "react-redux";
import { submitToBackend, readFromDatabase } from "@redux/voucher/action";
import { Image, Text, View, ActivityIndicator } from "../../../../components/atoms";
import { Actions } from "react-native-router-flux";
import { SignoutButton } from "../../../../components/molecules";

import { Linking } from "expo";

import styles from "./styles";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      claimed: true,
    };
  }

  componentDidMount() {
    // console.log(this.props);

    let data;
    const voucherIds = this.props.voucherIds;
    let qrData = this.props.data;
    let appName = null;

    if (qrData.length > 0) {
      appName = qrData.substring(0, 12);
      if (appName === "chillibuddy:") {
        qrData = qrData.replace("chillibuddy:", "");
      }
    }
    // console.log(qrData);
    console.log(voucherIds);

    data = {
      merchantIds: qrData,
      voucherIds,
    };

    this.props.submitToBackend(data);
  }

  componentWillUnmount() {}

  onRedeemWay() {
    const voucherID = this.props.voucherIds;

    Actions.pop("RedeemedVoucherScreen", { voucherIds: voucherID });
  }

  render() {
    //data
    let object = this.props.submitError;
    console.log(object.message);
    let gameTitle = "game";
    const { claimed } = this.state;
    const { submitLoading } = this.props;

    if (object.message == null || object.message == undefined) {
      return (
        <View style={styles.constainer}>
          <View style={styles.headerContainerStyle}>
            <Text style={styles.titleStyle}>
              {claimed ? "REWARD HAS CLAIMED!" : "CLAIM YOUR REWARD!"}
            </Text>

            {submitLoading == true ? (
              <ActivityIndicator
                size="large"
                color="black"
                style={styles.smallRedeemImageStarStyle}
              />
            ) : (
              <Image
                source={require("../../../../assets/chilliBuddyCheckin/chilliHappyFace.png")}
                style={styles.redeemImageStyle}
              />
            )}
          </View>
          <View style={styles.bodyContainerStyle}>
            <Text style={styles.titleStyle}>Congratulation!</Text>
            <Text style={styles.descriptStyle}>Successful Redeemed</Text>
            <SignoutButton
              containerStyle={styles.claimButtonContainer}
              textStyle={styles.claimButtonText}
              onPress={this.onRedeemWay.bind(this)}
              disabled={false}
            >
              {claimed ? "CLAIM COMPLETED!" : "HOW TO REDEEM?"}
            </SignoutButton>
          </View>
          <View></View>
        </View>
      );
    } else {
      return (
        <View style={styles.constainer}>
          <View style={styles.headerContainerStyle}>
            <Text style={styles.titleStyle}>THE VOUCER iS INVALID </Text>
            {submitLoading == true ? (
              <ActivityIndicator
                size="large"
                color="black"
                style={styles.smallRedeemImageStarStyle}
              />
            ) : (
              <Image
                source={require("../../../../assets/chilliBuddyCheckin/chilliSadFace.png")}
                style={styles.redeemImageStyle}
              />
            )}
          </View>
          <View style={styles.bodyContainerStyle}>
            <Text style={styles.titleStyle}>Unable to Claimed</Text>
            <Text style={styles.descriptStyle}>{object.message}</Text>
            <SignoutButton
              containerStyle={styles.claimButtonContainer}
              textStyle={styles.claimButtonText}
              onPress={this.onRedeemWay.bind(this)}
              disabled={false}
            >
              Back
            </SignoutButton>
          </View>
          <View></View>
        </View>
      );
    }
  }
}

const mapStateToProps = (state) => {
  const { categories, tags } = state.Settings;
  const { vouchers } = state.Voucher;
  const { submitLoading, submitResult, submitError } = state.Voucher;

  return { categories, tags, vouchers, submitLoading, submitResult, submitError };
};

export default connect(mapStateToProps, {
  submitToBackend,
})(index);
