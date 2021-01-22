import React, { Component } from "react";
import { connect } from "react-redux";
import { submitToBackend } from "@redux/checkIn/action";

import { CheckIn } from "@components/templates";

const RADIUS = 50;
const NUM = 7;
import { Actions } from "react-native-router-flux";

import styles from "./styles";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
    };
  }

  componentDidMount = async () => {
    this.table();
    await this.props.readFromDatabase();
  };

  table() {
    let temp = [];
    for (let i = 0; i < 28; i++) {
      temp.push({
        id: i,
        value: i,
      });
    }
    console.log(temp);
    this.setState({ tableData: temp });
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

  onPressCheckIn() {
    const uid = this.props.uid;

    const data = { uid };
    this.props.submitToBackend(data, "create");
    console.log("this.props.submitLoading");
    console.log(this.props.submitLoading);

    // if (bookmarkId === null) {
    //   const data = { shopId, promoId, isBookmark };
    //   await this.props.submitToBackend(data, "create");
    // } else {
    //   const data = { bookmarkId, isBookmark };
    //   await this.props.submitToBackend(data, "update");
    // }
  }

  render() {
    const submitLoading = this.props.submitLoading;
    const { id } = this.props.CheckInState;
    console.log("read data");
    console.log(id);
    const { tableData } = this.state;
    return (
      <CheckIn
        data={tableData}
        onPressCheckIn={this.onPressCheckIn.bind(this)}
        submitLoading={submitLoading}
      />
    );
  }
}
const mapStateToProps = (state) => {
  const routeTicketState = state.RouteTicket;
  const { uid } = state.Auth.user;
  const CheckInState = state.CheckIn;
  const { submitLoading } = state.CheckIn;

  return {
    routeTicketState,
    uid,
    CheckInState,
    submitLoading,
  };
};

export default connect(mapStateToProps, { submitToBackend })(index);
