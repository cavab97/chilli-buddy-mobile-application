import React, { Component } from "react";
import { connect } from "react-redux";

import { Image, Text, View } from "../../../../components/atoms";
import { Actions } from "react-native-router-flux";
import { SignoutButton } from "../../../../components/molecules";

import { Linking } from "expo";

import styles from "./styles";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = { claimed: true };
  }

  componentDidMount() {
    // const { rewardId } = this.props.navigation.state.params;
    // this.props.listenToReward({ rewardId });
  }

  componentWillUnmount() {}

  onRedeemWay() {
    Actions.SingleVoucher();
  }

  render() {
    //data

    let gameTitle = "game";
    const { claimed, RedeemStatus } = this.state;

    if (RedeemStatus) {
      return (
        <View style={styles.constainer}>
          <View style={styles.headerContainerStyle}>
            <Text style={styles.titleStyle}>
              {claimed ? "REWARD HAS CLAIMED!" : "CLAIM YOUR REWARD!"}
            </Text>
            <Image
              source={require("../../../../assets/gogogain/reward.png")}
              style={styles.redeemImageStyle}
            />
          </View>
          <View style={styles.bodyContainerStyle}>
            <Text style={styles.titleStyle}>Congratulation!</Text>
            <Text style={styles.descriptStyle}>
              We glad to inform you won {"title"} from “{gameTitle}”
            </Text>
            <SignoutButton
              containerStyle={styles.claimButtonContainer}
              textStyle={styles.claimButtonText}
              onPress={this.onRedeemWay}
              disabled={claimed}
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
            <Text style={styles.titleStyle}>{"THE VOUCER iS INVALID "}</Text>
            <Image
              source={require("../../../../assets/gogogain/reward.png")}
              style={styles.redeemImageStyle}
            />
          </View>
          <View style={styles.bodyContainerStyle}>
            <Text style={styles.titleStyle}>Unable to Claimed</Text>
            <Text style={styles.descriptStyle}>
              We glad to inform you unable to use this {"title"} from “{gameTitle}”
            </Text>
            <SignoutButton
              containerStyle={styles.claimButtonContainer}
              textStyle={styles.claimButtonText}
              onPress={this.onRedeemWay}
              disabled={claimed}
            >
              {"Back"}
            </SignoutButton>
          </View>
          <View></View>
        </View>
      );
    }
  }
}

export default index;
