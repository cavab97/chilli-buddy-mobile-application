import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { UserCompleted } from "@components/templates";

import { readByObjectGroup as readRouteTicket } from "@redux/routeTicket/action";


class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { routeId } = this.props.navigation.state.params;
    this.props.readRouteTicket({ routeId });
  }

  componentWillUnmount() {}

  render() {
    const { routeTickets, readLoading } = this.props.routeTicketState;
    const { uid } = this.props;
    const noUserImage = require("../../../assets/gogogain/Mascot-C.png")

    let validUser = [];

    routeTickets.forEach((routeTicket) => {
        if(routeTicket.completedMissions.length === routeTicket.route.totalMissions){
            validUser.push(routeTicket);
        }
    });

    validUser = validUser.sort((a,b) => {
      return (a.id) - (b.id)
    })


    return (
      <UserCompleted
        data={validUser}
        uid={uid}
        noUserImage={noUserImage}
        message="Join our LUCKY DRAW by complete any station mission!"
        termsAndConditions="Term and Condition Apply."
        noUserMessage="No any user complete yet"
        readLoading={readLoading}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const routeTicketState = state.RouteTicket;
  const { uid } = state.Auth.user;

  return {
    routeTicketState,
    uid,
  };
};

export default connect(mapStateToProps, { readRouteTicket })(index);
