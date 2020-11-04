import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { RouteRanking } from "@components/templates";

import { readByObjectGroup as readRouteTicket } from "@redux/routeTicket/action";
import { readFromDatabase as readRewards } from "@redux/reward/action";

import styles from "./styles";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const { routeId } = this.props.navigation.state.params;
    this.props.readRewards({ routeId });
    this.props.readRouteTicket({ routeId });
  }

  componentWillUnmount() {
    
  }

  render() {
    const routeTickets = this.props.routeTickets;
    const { rewards, readLoading } = this.props.rewardState;
    const { uid } = this.props;

    const validRouteTicket = routeTickets.filter((routeTicket) => {
      return (
        routeTicket.numberCompletedMissions === routeTicket.route.totalMissions && 
        routeTicket.reward.id !== null
        );
    });

    const ranking = rewards.map((reward) => {
      const routeTicketMatch = validRouteTicket.filter((routeTicket) => {
        return routeTicket.user.id === reward.user.id;
      });
      
      const completeTime = (
        routeTicketMatch.length !== 0 ? 
        routeTicketMatch[0].completedMissions[routeTicketMatch[0].completedMissions.length - 1].at
        :
        reward.obtained.at
        );

      return {
        ...reward,
        completeIn: completeTime,
      };
    });

    return (
      <RouteRanking
        prizeTitle="Prize: "
        completeInTitle="Complete in"
        data={ranking}
        uid={uid}
        message="Join our LUCKY DRAW by complete any station mission!"
        termsAndConditions="Term and Condition Apply."
        readLoading={readLoading}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const rewardState = state.Reward;
  const routeTickets = state.RouteTicket.routeTickets;
  const { uid } = state.Auth.user;

  return {
    rewardState,
    routeTickets,
    uid,
  };
};

export default connect(mapStateToProps, { readRewards, readRouteTicket })(index);
