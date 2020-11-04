import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Image,
  Text,
  View
} from "../../../components/atoms";

import { SignoutButton } from "../../../components/molecules";

import { listenToRecord as listenToReward, removeListenerToRecord as removeRewardlistener } from "@redux/reward/action";

import { Linking } from "expo";

import styles from "./styles";

class RedeemPage extends Component {
  constructor(props) {
    super(props);
    this.state = { claimed: true };
  }

  componentDidMount() {
    const { rewardId } = this.props.navigation.state.params;
    this.props.listenToReward({ rewardId });
  }

  componentWillUnmount(){
    this.props.removeRewardlistener();
  }

  onRedeemWay(){
    Linking.openURL(`https://gogogain.com/`);
  }


  render() {
    const { reward, readLoading, readError } = this.props;

    //status
    const claimed = reward.claimed.by ? true : false;

    //data
    const { title, routeIds, route, eventIds, event } = reward;
    let gameTitle = "game";

    if (routeIds.length !== 0) {
      gameTitle = route.title;
    } else if (eventIds.length !== 0) {
      gameTitle = event.title;
    }

    return (
      <View style={styles.constainer}>
        <View style={styles.headerContainerStyle}>
          <Text style={styles.titleStyle}>
            {claimed ? "REWARD HAS CLAIMED!" : "CLAIM YOUR REWARD!"}
          </Text>
          <Image
            source={require("../../../assets/gogogain/reward.png")}
            style={styles.redeemImageStyle}
          />
        </View>
        <View style={styles.bodyContainerStyle}>
          <Text style={styles.titleStyle}>Congratulation!</Text>
          <Text style={styles.descriptStyle}>
            We glad to inform you won {title} from “{gameTitle}”
          </Text>
          <SignoutButton
            containerStyle={styles.claimButtonContainer}
            textStyle={styles.claimButtonText}
            onPress = {this.onRedeemWay}
            disabled={claimed}
          >
            {claimed ? "CLAIMED!" : "HOW TO REDEEM?"}
          </SignoutButton>
        </View>
        <View></View>
      </View>
    );
  }
}

const mapStatetoprops = (state) => {
  return { ...state.Reward };
};

export default connect(mapStatetoprops, {
  listenToReward,
  removeRewardlistener
})(RedeemPage);
