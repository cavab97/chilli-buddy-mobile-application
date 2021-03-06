import React, { Component } from "react";
import { connect } from "react-redux";
import { Dimensions, View, Text } from "react-native";
import ContentLoader, { Rect } from "react-content-loader/native";

import {
  submitToBackend,
  readFromDatabase,
  toggleModal,
  submitCancel,
  claim,
  readFromDatabaseInitial,
} from "@redux/checkIn/action";
import moment from "moment";
import styles from "./styles";

import { ActivityIndicator } from "../../../components/atoms";

import { CheckIn, CheckInModal } from "@components/templates";

const RADIUS = 50;
const { height } = Dimensions.get("window");

const NUM = 7;
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
      time: null,
      tableData4: [],
      focusId: "",
      y: 1,
      days: null,
      hours: null,
      minutes: null,
      seconds: null,
    };
  }

  async componentDidMount() {
    const { checkIn } = this.props.checkInState;
    let day = moment(checkIn.resetDate).diff(moment(), "days");
    let hour = moment(checkIn.resetDate).diff(moment(), "hours");

    await this.props.readFromDatabaseInitial();
    await this.table24();
    this.intervalID = setInterval(() => this.tick(), 1000);
    // this.tick();
  }

  async componentDidUpdate(prevProps, prevState) {
    const readError = this.props.checkInState.readError;
    const voucherID = this.props.checkIn.voucher.id;

    // if (prevProps.checkIn.voucher.id !== voucherID && voucherID) {
    //   // alert(voucherID);
    // }

    // if (prevProps.checkInState.readError !== readError && readError !== false) {
    //   // await this.props.readFromDatabaseInitial();
    //   // this.table24();
    // }

    if (
      this.props.checkInState.submitError.message !== prevProps.checkInState.submitError.message &&
      this.props.checkInState.submitError.message
    ) {
      await this.props.readFromDatabase();
      this.table24();
    }
    // console.log(this.props.checkInState.submitResult.message);
    // console.log("middle");
    // console.log(prevProps.checkInState.submitResult);

    if (
      this.props.checkInState.submitResult.message !==
        prevProps.checkInState.submitResult.message &&
      this.props.checkInState.submitResult.message
    ) {
      // console.log(this.props.checkInState.submitResult.message);

      console.log("trigger");
      // console.log(prevProps.checkInState.submitResult);
      await this.props.readFromDatabase();
      this.table24();
    }
  }

  table24 = async () => {
    const { checkInRecord } = this.props.checkInState.checkIn;
    //console.log("table24 table24");
    // console.log("table24" + checkInRecord.length);
    let j = 0;
    let k = 1;

    let temp = [];

    for (let i = 1; i < 33; i++) {
      if (i === 4 || i === 12 || i === 20 || i === 28) {
        j++;
        k++;
        temp.push({
          id: i,
          value: i - j,
          count: 80,
          ///cannot change
          checked: false,
          reward: false,
        });

        continue;
      } else {
        temp.push({
          id: i,
          value: i - j,
          count: i,
          checked: checkInRecord[i - k] ? true : false,
          // reward: checkInRecord[i - k].checked == true ? true : false,
          submitLoading: false,
          time: checkInRecord.date,
          // reward: checkInRecord[i - k].claim,
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
    // console.log(temp);
    this.setState({ tableData24: temp });
  };

  tick() {
    const { checkIn } = this.props.checkInState;

    // console.log("tickeing");

    if (
      (checkIn.resetDate !== undefined && checkIn.created.at !== undefined) ||
      (checkIn.resetDate === null && checkIn.created.at !== null)
    ) {
      // let hour = moment(checkIn.resetDate).diff(checkIn.created.at, "hours");
      // let second = moment(checkIn.resetDate).diff(checkIn.created.at, "minutes");

      // var myDate = new Date(checkIn.resetDate);
      // var result = myDate.getTime();

      // console.log(new Date(checkIn.created.at.seconds * 1000).toISOString());
      let day = moment(checkIn.resetDate).diff(moment(), "days");
      let hour = moment(checkIn.resetDate).diff(moment(), "hours");
      let minutes = moment(checkIn.resetDate).diff(moment(), "minutes");
      let seconds = moment(checkIn.resetDate).diff(moment(), "seconds");

      let createIsoDate = new Date(checkIn.created.at.seconds * 1000).toISOString();
      let resetIsoDate = checkIn.resetDate;
      let DD;
      let Hour;
      let Minutes;
      let Seconds;

      // let month = new Date(resetIsoDate).getUTCMonth() - new Date().getUTCMonth();
      // if (month > 0) {
      //   DD = new Date(resetIsoDate).getUTCDate() + 30 - new Date().getUTCDate();
      // } else {
      //   DD = new Date(resetIsoDate).getUTCDate() - new Date().getUTCDate();
      // }

      // Hour = new Date(resetIsoDate).getUTCHours() - new Date().getUTCHours();

      // Minutes = new Date(resetIsoDate).getUTCMinutes() - new Date().getUTCMinutes();
      // Seconds = new Date(resetIsoDate).getUTCSeconds() + 60 - new Date().getUTCSeconds();

      // console.log("houminutesr" + (seconds % 60));

      // let DD = new Date(resetIsoDate).getUTCDate() - new Date(createIsoDate).getUTCDate();

      // const countdown = moment(checkIn.resetDate - checkIn.created.at);
      // const days = countdown.format("D");
      // const hours = countdown.format("HH");
      // const minutes = countdown.format("mm");
      // const seconds = countdown.format("ss");

      // console.log(checkIn.created.at.seconds);
      // var d = new Date(checkIn.resetDate);
      // new Date(1434343434 * 1000).toISOString();
      // console.log(d.getUTCDate());
      // console.log((checkIn.created.at.seconds * 1000).toISOString);
      // console.log(d.getUTCHours()); // Hours
      // console.log(d.getUTCMinutes());
      // console.log(d.getUTCSeconds());
      // console.log(checkIn.resetDate);

      // console.log(new Date(checkIn.created.at.seconds * 1000) / 60000);

      // console.log(hour);
      // console.log(seconds);

      if (day !== 0) {
        this.setState({
          time: day + " days",
        });
      } else if (hour !== 0) {
        this.setState({
          time: hour + " Hours " + (minutes % 60) + " Minutes",
        });
      } else {
        this.setState({
          time: (minutes % 60) + " Minutes " + (seconds % 60) + " seconds",
        });
      }

      // console.log(this.state.day);
    }
  }

  componentWillMount() {
    this.table24();
    // this.props.toggleModal();

    // this.setState({ myState: [] }); //this line must be removed
    //i deliberately leave mystate empty so that i can push new array later
  }
  catchCondition() {
    const { checkIn } = this.props.checkInState;

    const { checkInRecord } = this.props.checkInState.checkIn;

    let countDownOneHour;
    if (checkIn.voucher.assignedDate.at != null) {
      countDownOneHour =
        (new Date() - new Date(checkIn.voucher.assignedDate.at.seconds * 1000)) / 60000;
    } else {
      countDownOneHour = 0;
    }

    const voucherID = this.props.checkIn.voucher.id;
    let cloundFunction = false;
    if (checkInRecord !== undefined) {
      cloundFunction = this.props.checkInState.submitResult.objectName;
    } else {
      cloundFunction = false;
    }

    if ((cloundFunction == "Voucher" || voucherID !== null) && countDownOneHour < 60) {
      return false;
    } else {
      return true;
    }
  }
  catchConditionModal() {
    const { checkIn } = this.props.checkInState;

    let countDownOneHour;
    if (checkIn.voucher.assignedDate.at != null) {
      countDownOneHour =
        (new Date() - new Date(checkIn.voucher.assignedDate.at.seconds * 1000)) / 60000;
    } else {
      countDownOneHour = 0;
    }
    if (countDownOneHour < 60) {
      return false;
    } else {
      return true;
    }
  }

  onClose = () => {
    this.props.toggleModal();
  };

  onPressRedeemNow = async () => {
    let data;
    const id = this.props.checkIn.id;
    const voucherIds = this.props.checkIn.voucherIds;
    data = {
      id,
      voucherIds,
    };
    this.props.toggleModal();
    await this.props.claim(data);
    await this.props.readFromDatabase();
    await this.table24();
    this.props.toggleModal();
  };

  onPressCancel = async () => {
    let data;
    const id = this.props.checkIn.id;
    const voucherIds = this.props.checkIn.voucherIds;

    data = {
      id,
      voucherIds,
    };

    await this.props.submitCancel(data);
    await this.props.toggleModal();
  };

  onPressCheckIn = async (item) => {
    const { checkIn } = this.props.checkInState;
    const { checkInRecord } = this.props.checkInState.checkIn;
    const voucherID = this.props.checkIn.voucher.id;

    let cloundFunction = false;
    const uid = this.props.uid;
    const data = {
      uid: uid,
      id: checkIn.id,
    };
    this.setState({ focusId: item.id });
    if (checkInRecord !== undefined) {
      cloundFunction = this.props.checkInState.submitResult.objectName;
    } else {
      cloundFunction = false;
    }

    if (checkIn.id === null) {
      this.props.submitToBackend(data, "create");
    } else {
      // this.props.toggleModal();
      if (
        (cloundFunction == "Voucher" || voucherID !== null) &&
        (item.value == 21 || item.value == 28)
      ) {
        this.props.toggleModal();

        // // if (item.value == 21 || item.value == 28) {
        // if (cloundFunction == "Voucher") {
        //   // setTimeout(() => {
        //   //   this.props.toggleModal();
        //   // }, 2000);
        //   this.props.toggleModal();
        // } else if (item.value == 21 || item.value == 28) {
        //   this.props.toggleModal();
        // }
      } else if (item.value == 21 || item.value == 28) {
        if ((cloundFunction != "Voucher" || voucherID == null) && item.value == 28) {
          this.props.submitToBackend(data, "update");
          this.props.toggleModal();
        } else if ((cloundFunction != "Voucher" || voucherID == null) && item.value == 21) {
          this.props.submitToBackend(data, "update");
          this.props.toggleModal();
        }
      } else {
        this.props.submitToBackend(data, "update");
      }
      // }
    }
  };

  render() {
    let y = 1;
    const { tableData24, focusId } = this.state;
    const { submitLoading } = this.props;
    const { checkIn, readLoading, modalVisible, readInitialLoading } = this.props.checkInState;

    const { checkInRecord } = this.props.checkInState.checkIn;

    tableData24.map((table24) => {
      if (table24.id === focusId) {
        table24.submitLoading = submitLoading;
        // console.log(submitLoading);
      }
    });

    switch (checkInRecord !== undefined) {
      case checkInRecord.length < 3:
        y = 1;
        break;

      case checkInRecord.length >= 3 && checkInRecord.length <= 9:
        y = 2;
        break;

      case checkInRecord.length >= 10 && checkInRecord.length <= 16:
        y = 3;
        break;

      case checkInRecord.length >= 17 && checkInRecord.length <= 23:
        y = 4;
        break;

      case checkInRecord.length >= 24 && checkInRecord.length <= 28:
        y = 5;
        break;
    }

    // console.log(this.props.checkInState.checkIn.id);

    return (
      <CheckIn
        data={tableData24}
        checkInData={checkIn}
        onPressCheckIn={this.onPressCheckIn.bind(this)}
        submitLoading={submitLoading}
        // checkInRecord.length === 21 ? true : false
        rewardOnceThanOneOption={checkInRecord.length <= 21 ? true : false}
        happy={
          checkIn.voucher.id !== null ||
          this.props.checkInState.submitResult.objectName == "Voucher"
            ? true
            : false
        }
        message={this.props.checkInState.submitError.message}
        messageSuccess={checkIn.voucher.id !== null ? checkIn.voucher : null}
        isVisible={modalVisible}
        time={this.state.time}
        readLoading={readLoading}
        onCLose={this.onClose.bind(this)}
        checkInRecordLength={checkInRecord === undefined ? 0 : checkInRecord.length + y}
        checkInRecordLengths={checkInRecord === undefined ? console.log(" ") : checkInRecord.length}
        readInitialLoading={readInitialLoading}
        catchCondition={this.catchCondition()}
        onPressCancel={this.onPressCancel.bind(this)}
        catchConditionModal={this.catchConditionModal()}
        onPressRedeemNow={this.onPressRedeemNow.bind(this)}
        redeemed={
          checkInRecord.length == 21
            ? checkInRecord[20].claim
            : checkInRecord.length == 28
            ? checkInRecord[27].claim
            : false
        }
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
  const { checkIn } = state.CheckIn;

  return {
    routeTicketState,
    uid,
    checkInState,
    submitLoading,
    checkIn,
  };
};

export default connect(mapStateToProps, {
  submitToBackend,
  readFromDatabase,
  toggleModal,
  submitCancel,
  claim,
  readFromDatabaseInitial,
})(index);
