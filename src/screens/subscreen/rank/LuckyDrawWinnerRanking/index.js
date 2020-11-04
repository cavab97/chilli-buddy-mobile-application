import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { LuckyDrawWinnerRanking } from "@components/templates";

import { readEventRewards } from "@redux/reward/action";

import styles from "./styles";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { eventId } = this.props.navigation.state.params;
    this.props.readEventRewards({ eventId });
  }

  componentWillUnmount() {}

  render() {
    const { eventRewards, readEventRewardsLoading } = this.props.rewardState;
    const { uid } = this.props;
    
    return (
      <LuckyDrawWinnerRanking
        prizeTitle="Prize: "
        data={eventRewards}
        uid={uid}
        readLoading={readEventRewardsLoading}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const rewardState = state.Reward;
  const { uid } = state.Auth.user;

  return {
    rewardState,
    uid,
  };
};

export default connect(mapStateToProps, { readEventRewards })(index);
