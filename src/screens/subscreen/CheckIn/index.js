import React, { Component } from "react";
import { connect } from "react-redux";
import { submitToBackend, readFromDatabase, toggleModal } from "@redux/checkIn/action";
import moment from "moment";

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
      y: 1,
    };
  }

  async componentDidMount() {
    // this.props.toggleModal();

    // this.table24();
    // this.props.toggleModal();

    await this.props.readFromDatabase();
    await this.table24();
  }

  async componentDidUpdate(prevProps, prevState) {
    const readError = this.props.checkInState.readError;
    const voucherID = this.props.checkIn.voucher.id;

    if (prevProps.checkIn.voucher.id !== voucherID && voucherID) {
      // alert(voucherID);
    }

    if (prevProps.checkInState.readError !== readError && readError !== false) {
      // alert(readError);
    }

    if (
      this.props.checkInState.submitError.message !== prevProps.checkInState.submitError.message &&
      this.props.checkInState.submitError.message
    ) {
      // alert(this.props.checkInState.submitError.message);
    }

    if (
      this.props.checkInState.submitResult.message !==
        prevProps.checkInState.submitResult.message &&
      this.props.checkInState.submitResult.message
    ) {
      await this.props.readFromDatabase();
      this.table24();
    }
  }

  table24 = async () => {
    const { checkInRecord } = this.props.checkInState.checkIn;
    console.log("table24 table24");
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

  onClose = () => {
    // console.log("hello");
    // this.props.toggleModal();
    this.props.toggleModal();
  };

  onPressCheckIn = async (item) => {
    const { submitLoading } = this.props;
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
      } else {
        this.props.submitToBackend(data, "update");
        // if (item.value == 21 || item.value == 28) {
        if (cloundFunction == "Voucher") {
          setTimeout(() => {
            this.props.toggleModal();
          }, 2000);
        }
        // }
      }
    }
  };

  render() {
    let y = 1;
    const { tableData24, focusId } = this.state;
    const { submitLoading } = this.props;
    const { checkIn, readLoading, modalVisible } = this.props.checkInState;

    const { checkInRecord } = this.props.checkInState.checkIn;
    if (checkIn.voucher.assignedDate.at == null) {
      console.log("undefined");
    } else {
      console.log("checkIn/assign date");
      // console.log(checkIn.voucher.id);

      console.log(
        moment(checkIn.voucher.assignedDate.at.toString(), "HHmmss").format(
          "MMMM Do YYYY, h:mm:ss a"
        )
      );
      // 9 years ago

      console.log((new Date() - new Date(checkIn.voucher.assignedDate.at.seconds * 1000)) / 60000);

      // console.log("modalVisible");

      // console.log(modalVisible);
    }

    tableData24.forEach((table24) => {
      if (table24.id === focusId) {
        table24.submitLoading = submitLoading;
      }
    });

    // if (checkInRecord === undefined) {
    //   console.log("success");
    // } else {
    //   if (checkInRecord.length < 3 && checkInRecord) {
    //     y = 1;
    //   } else if (checkInRecord.length >= 3 && checkInRecord.length <= 9) {
    //     y = 2;
    //   } else if (checkInRecord.length >= 10 && checkInRecord.length <= 16) {
    //     y = 3;
    //   } else if (checkInRecord.length >= 17 && checkInRecord.length <= 23) {
    //     y = 4;
    //   } else if (checkInRecord.length >= 24 && checkInRecord.length <= 28) {
    //     y = 5;
    //   }
    // }

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

    if (this.props.checkInState.submitResult.objectName == "Voucher") {
      console.log("here");
      // console.log(this.props.checkInState.submitResult.message.merchant[0].businessName);
      // console.log(this.props.checkInState.submitResult.message.amount);
    } else {
      console.log("not here");
      // console.log(this.props.checkInState.submitResult);
      console.log(this.props.checkInState.submitResult.message);
    }
    return (
      <CheckIn
        data={tableData24}
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
        messageSuccess={
          this.props.checkInState.submitResult.message != null
            ? this.props.checkInState.submitResult.message
            : checkIn.voucher != null
            ? checkIn.voucher
            : null
        }
        isVisible={modalVisible}
        readLoading={readLoading}
        onCLose={this.onClose.bind(this)}
        checkInRecordLength={checkInRecord === undefined ? 0 : checkInRecord.length + y}
        checkInRecordLengths={checkInRecord === undefined ? console.log(" ") : checkInRecord.length}
        catchCondition={this.catchCondition()}
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
})(index);
