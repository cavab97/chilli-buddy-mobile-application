import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { LuckyDrawRanking } from "@components/templates";

import { readFromDatabase } from "@redux/event/action";

import styles from "./styles";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.readFromDatabase();
  }

  componentWillUnmount() {}

  onRoutePress() {
    Actions.pop();
    Actions.EventRanking();
  }

  onEventPress(event) {
    const { id } = event;
    Actions.LuckyDrawWinnerRanking({eventId : id });
  }

  render() {
    const { events, readLoading } = this.props;

    return (
      <LuckyDrawRanking
        routeTitle="Event"
        routeDescription="Lucky Draw"
        routeEndedTitle="Event Date"
        data={events}
        eventTitle="Route"
        luckyTitle="Suprise"
        drawTitle="Event"
        onRoutePress={this.onRoutePress.bind(this)}
        onEventPress={this.onEventPress.bind(this)}
        readLoading={readLoading}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { events, readLoading, readError } = state.Event;

  return { events, readLoading, readError };
};

export default connect(mapStateToProps, { readFromDatabase })(index);
