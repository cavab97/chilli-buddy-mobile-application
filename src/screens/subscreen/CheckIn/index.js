import React, { Component } from "react";
import { connect } from "react-redux";
import { submitToBackend, readFromDatabase } from "@redux/checkIn/action";

import { CheckIn, CheckInModal } from "@components/templates";

const RADIUS = 50;
const NUM = 7;

import styles from "./styles";

import { Actions } from "react-native-router-flux";

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData24: { id: "", value: "", count: "", checked: false },
      tableData4: [],
    };
  }

  componentDidMount = async () => {
    await this.table24();
    this.tableData4();
    await this.props.readFromDatabase();
  };

  componentDidUpdate(prevProps, prevState) {
    const readError = this.props.checkInState.readError;

    if (prevProps.checkInState.readError !== readError && readError !== false) {
      alert(readError);
    }
  }

  table24 = async () => {
    const { checkInRecord } = this.props.checkInState.checkIn

    let j = 0;
    let temp = [];
    let checkInCounter = checkInRecord[0] ? checkInRecord[0].length : 0;

    for (let i = 1; i < 33; i++) {
      if (i === 4 || i === 12 || i === 20 || i === 28) {
        j++;
        temp.push({
          id: i,
          value: i - j,
          count: 80,
          checked: true,
          //checked: checkInRecord[i-checkInCounter] ? true : false,
        });
      } else {
        temp.push({
          id: i,
          value: i - j,
          count: i,
          checked: checkInRecord[i-checkInCounter] ? true : false,
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

  tableData4() {
    let temp = [];
    for (let i = 1; i < 5; i++) {
      temp.push({
        id: i,
        value: "Day" + i * 7,
      });
    }
    this.setState({ tableData4: temp });
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

  lookingForCheckIn({ id } = null) {}

  onPressCheckIn = async (item) => {
    const template = this.state.tableData24;

    // if(item.id==this.state.tableData24.id){
    //   console.log()
    // }

    //console.log(this.state.tableData24);
    // const uid = this.props.uid;
    // const data = { uid };
    // this.props.submitToBackend(data, "create");
    // console.log("this.props.submitLoading");
    // console.log(this.props.submitLoading);
    // if (bookmarkId === null) {
    //   const data = { shopId, promoId, isBookmark };
    //   await this.props.submitToBackend(data, "create");
    // } else {
    //   const data = { bookmarkId, isBookmark };
    //   await this.props.submitToBackend(data, "update");
    // }
  };

  render() {
    const { id, submitLoading, checkInState } = this.props;

    const { tableData24, tableData4 } = this.state;

    return (
      <CheckIn
        data={tableData24}
        data4={tableData4}
        checkInRecord={checkInState.checkInRecord}
        onPressCheckIn={this.onPressCheckIn.bind(this)}
        submitLoading={submitLoading}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const routeTicketState = state.RouteTicket;
  const { uid } = state.Auth.user;
  const checkInState = state.CheckIn;
  const { submitLoading } = state.CheckIn;

  return {
    routeTicketState,
    uid,
    checkInState,
    submitLoading,
  };
};

export default connect(
  mapStateToProps, 
  { 
    submitToBackend,
    readFromDatabase
})(index);
