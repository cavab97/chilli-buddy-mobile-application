import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { AreaRouteGroupList } from "@components/templates";

import {
  listenFromDatabase,
  removeListenerFromDatabase,
} from "@redux/route/action";

import {
  readFromDatabase as readRouteTicket
} from "@redux/routeTicket/action"

import styles from "./styles";

import clone from "clone";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { routeGroupId } = this.props.navigation.state.params;
    this.props.listenFromDatabase({ routeGroupId });
    this.props.readRouteTicket();
  }

  componentWillUnmount() {
    this.props.removeListenerFromDatabase();
  }

  onSingleRouteMapPress(route) {
    const { id, assignCompleted } = route;

    if(assignCompleted){
      Actions.RouteRanking({ routeId: id });
    }else{
      Actions.Route({ routeId: id });
    }
  }

  render() {
    const { readLoading } = this.props.routeState;
    const { userRouteTickets } = this.props.routeTicketState;
    let { routes } = clone(this.props.routeState);

    // filter route end in two weeks
    let validRoutes = [];
    const twoWeekBefore = new Date();
    twoWeekBefore.setDate(new Date().getDate() - 14);

    routes.forEach(route => {
      const { ended } = route;

      if(ended.at === null || ended.at.seconds > twoWeekBefore.getTime() / 1000){
        validRoutes.push(route);
      }
    });

    const joinedRoutes = [];
    const nojoinedRoutes = [];
    const endRoutes = [];

    //Merge route with corresponding route ticket
    validRoutes.forEach((route) => {
      const routeTicket = userRouteTickets.filter(
        (routeTicket) => routeTicket.routeIds[0] === route.id
      );


      if (routeTicket.length > 0) {
        if(route.ended.at){
          endRoutes.push({
            ...route,
            routeTicketId: routeTicket[0].id,
            numberCompletedMissions: routeTicket[0].numberCompletedMissions,
            joinedAt: routeTicket[0].created.at,
          });
        } else {
          joinedRoutes.push({
            ...route,
            routeTicketId: routeTicket[0].id,
            numberCompletedMissions: routeTicket[0].numberCompletedMissions,
            joinedAt: routeTicket[0].created.at,
          });
        }
        return;
      } else {
        if(route.ended.at){
          endRoutes.push({
            ...route,
            routeTicketId: null,
            numberCompletedMissions: 0,
            joinedAt: null,
          });
        } else {
          nojoinedRoutes.push({
            ...route,
            routeTicketId: null,
            numberCompletedMissions: 0,
            joinedAt: null,
          });
        }
        return;
      }
    });

    joinedRoutes.sort((a,b)=> b.joinedAt - a.joinedAt)
    nojoinedRoutes.sort((a,b)=> b.created.at - a.created.at)

    validRoutes = [...joinedRoutes, ...nojoinedRoutes, ...endRoutes]

    const backgroundPicture = require("../../../../assets/gogogain/RouteMap_FA_yellow.png")
    
    return (
      <AreaRouteGroupList
        data={validRoutes}
        totalMissionTitle="Total Missions : "
        periodTitle="Mission Period : "
        statusTitle="Status "
        onSingleRouteMapPress={this.onSingleRouteMapPress.bind(this)}
        readLoading={readLoading}
        backgroundPicture = {backgroundPicture}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const routeState = state.Route;
  const routeTicketState = state.RouteTicket;

  return {
    routeState,
    routeTicketState,
  };
};

export default connect(mapStateToProps, {
  readRouteTicket,
  listenFromDatabase,
  removeListenerFromDatabase,
})(index);
