import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { EventRanking } from "@components/templates";

import { readClosedRoutes } from "@redux/route/action";

import styles from "./styles";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.readClosedRoutes();
  }

  componentWillUnmount() {}

  onEventPress() {
    //Actions.popTo('LuckyDrawRanking')
    Actions.pop();
    Actions.LuckyDrawRanking();
  }

  onRoutePress(route) {
    const { id } = route;
    Actions.RouteRanking({ routeId: id });
  }

  render() {
    const { closedRoutes, readClosedRoutesLoading } = this.props;

    const closedRoutesSort = closedRoutes.sort((a,b) => {
      return b.ended.at - a.ended.at
    });

    return (
      <EventRanking
        routeTitle="Route"
        routeEndedTitle="Route Ended"
        data={closedRoutesSort}
        eventTitle="Route"
        luckyTitle="Suprise"
        drawTitle="Event"
        onEventPress={this.onEventPress.bind(this)}
        onRoutePress={this.onRoutePress.bind(this)}
        readLoading={readClosedRoutesLoading}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const {
    closedRoutes,
    readClosedRoutesLoading,
    readClosedRoutesError,
  } = state.Route;

  return { closedRoutes, readClosedRoutesLoading, readClosedRoutesError };
};

export default connect(mapStateToProps, { readClosedRoutes })(index);
