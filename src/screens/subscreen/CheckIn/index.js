import React, { Component } from "react";
import { connect } from "react-redux";
import { submitToBackend } from "@redux/checkIn/action";

import { CheckIn, CheckInModal } from "@components/templates";

const RADIUS = 50;
const NUM = 7;

import styles from "./styles";

import { Actions } from "react-native-router-flux";

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData24: {
        id: "",
        value: "",
        count: "",
        checked: false,
        reward: false,
        submitLoading: false,
      },
      tableData4: [],
      focusId: "",
    };
  }

  componentDidMount = async () => {
    await this.table24();
    this.tableData4();
    await this.props.readFromDatabase();
  };

  table24 = async () => {
    let j = 0;
    let temp = [];
    for (let i = 1; i < 33; i++) {
      if (i === 4 || i === 12 || i === 20 || i === 28) {
        j++;
        temp.push({
          id: i,
          value: i - j,
          count: 80,
          ///cannot change
          checked: false,
          reward: false,
        });
      } else {
        temp.push({
          id: i,
          value: i - j,
          count: i,
          checked: true,
          reward: true,
          submitLoading: this.props.submitLoading,
        });
      }
    }

    // for (let i = 4; i < 12; i++) {
    //   temp[i].value = i;
    // }
    // for (let i = 12; i < 20; i++) {
    //   temp[i].value = i - 1;
    // }

    // for (let i = 20; i < 28; i++) {
    //   temp[i].value = i - 2;
    // }
    // for (let i = 28; i < 32; i++) {
    //   temp[i].value = i - 3;
    // }
    // for (let i = 28; i < 33; i++) {
    //   temp[i].value = i - 3;
    //   console.log(temp[i]);
    // }
    this.setState({ tableData24: temp });
  };

  componentWillMount() {
    this.table24();

    let id;
    let value;

    // this.setState({ myState: [] }); //this line must be removed
    //i deliberately leave mystate empty so that i can push new array later
  }

  // lookingForBookmark({ promoId } = null) {
  //   const bookmarks = this.props.bookmarks;
  //   let bookmarkId = null;

  //   bookmarks.forEach((bookmark) => {
  //     if (bookmark.promo[0] === promoId) {
  //       bookmarkId = bookmark.id;
  //     }
  //   });
  //   return bookmarkId;
  // }

  onPressCheckIn = async (item) => {
    // if(item.id==this.state.tableData24.id){
    //   console.log()
    // }
    const tableDataTemp = this.state.tableData24;

    // console.log(this.state.tableData24);
    const uid = this.props.uid;
    const data = { uid };

    // console.log("this.props.submitLoading");
    // console.log(this.props.submitLoading);
    // if (bookmarkId === null) {
    //   const data = { shopId, promoId, isBookmark };
    //   await this.props.submitToBackend(data, "create");
    // } else {
    //   const data = { bookmarkId, isBookmark };
    //   await this.props.submitToBackend(data, "update");
    // }
    tableDataTemp.forEach((table24) => {
      if (table24.id === item.id) {
        this.setState({ focusId: item.id });
        this.props.submitToBackend(data, "create");
        // console.log("this.props.submitLoading");
        // console.log(this.props.submitLoading);
      }
    });
  };

  render() {
    const { tableData24 } = this.state;
    const { uid, submitLoading } = this.props;
    tableData24.forEach((table24) => {
      if (table24.id === this.state.focusId) {
        table24.submitLoading = submitLoading;
        // console.log("this.props.submitLoading");
        // console.log(this.props.submitLoading);
      }
    });

    return (
      <CheckIn
        data={tableData24}
        onPressCheckIn={this.onPressCheckIn.bind(this)}
        submitLoading={submitLoading}
        rewardOnceThanOneOption={false}
        happy={true}
        isVisible={false}
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
