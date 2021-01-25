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
      tableData24: { id: "", value: "", count: "", checked: false, reward: false },
      tableData4: [],
    };
  }

  componentDidMount = async () => {
    await this.table24();
    this.tableData4();
    this.props.readFromDatabase();
  };

  componentDidUpdate(prevProps, prevState) {
    const readError = this.props.checkInState.readError;

    if (prevProps.checkInState.readError !== readError && readError !== false) {
      alert(readError);
    }

    if (
      this.props.checkInState.submitError.message !==
        prevProps.checkInState.submitError.message &&
      this.props.checkInState.submitError.message
    ) {
      alert(this.props.checkInState.submitError.message);
    }

    if (
      this.props.checkInState.submitResult.message !==
        prevProps.checkInState.submitResult.message &&
      this.props.checkInState.submitResult.message
    ) {
      alert(this.props.checkInState.submitResult.message);
      this.props.readFromDatabase();
    }
  }

  table24 = async () => {
    const { checkInRecord } = this.props.checkInState.checkIn

    let j = 0;
    let temp = [];
    let checkInCounter = checkInRecord ? checkInRecord.length : 0;

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
          checked: checkInRecord[i-checkInCounter] ? true : false,
          reward: true,
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

  lookingForCheckIn({ id } = null) {}

  onPressCheckIn = async () => {
    const template = this.state.tableData24;
    const { checkIn } = this.props.checkInState

    console.log('enter the data')
    const data = { 
      uid: this.props.uid, 
      id: checkIn.id 
    };
    
    console.log(checkIn.id)

    /* if (checkIn.id === null) { */
      this.props.submitToBackend(data, "create");
  /*   } else {
      this.props.submitToBackend(data, "update");
    } */
    
  };

  render() {
    const { id, submitLoading, checkInState } = this.props;

    const { tableData24, tableData4 } = this.state;
    if (true) {
      // return <CheckInModal />;
      return (
        <CheckIn
          data={tableData24}
          data4={tableData4}
          onPressCheckIn={this.onPressCheckIn.bind(this)}
          submitLoading={submitLoading}
        />
      );
    } else {
      return <CheckInModal />;
    }
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
