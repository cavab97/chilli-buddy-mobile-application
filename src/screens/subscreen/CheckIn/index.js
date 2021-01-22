import React, { Component } from "react";
import { connect } from "react-redux";

import { CheckIn } from "@components/templates";

const RADIUS = 50;
const NUM = 7;

class index extends Component {
  constructor(props) {
    super(props);
    this.state = { date: [] };
  }

  componentWillMount() {
    const tempdate = [];
    let id;
    let value;
    for (let i = 1; i <= 28; i++) {
      tempdate.push({ id: i, value: i });
    }
    this.setState({ date: tempdate });
    // this.setState({ myState: [] }); //this line must be removed
    //i deliberately leave mystate empty so that i can push new array later
  }

  onClickCheckIn() {
    console.log("trigger");
  }

  render() {
    const state = this.state;
    return (
      <CheckIn
        submitLoading={true}
        dataSource={state.date}
        numColumns={NUM}
        onClickCheckIn={this.onClickCheckIn.bind(this)}
      />
    );
  }
}

export default index;
