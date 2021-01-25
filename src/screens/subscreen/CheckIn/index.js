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
    const { checkInRecord } = this.props.checkInState.checkIn;

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
          checked: checkInRecord[i - checkInCounter] ? true : false,
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

  lookingForCheckIn({ id } = null) {}

  onPressCheckIn = async (item) => {
    // if(item.id==this.state.tableData24.id){
    //   console.log()
    // }
    const tableDataTemp = this.state.tableData24;
    const { checkIn } = this.props.checkInState

    // console.log(this.state.tableData24);
    const uid = this.props.uid;

    const data = { 
      uid: uid, 
      id: checkIn.id 
    };
    
    tableDataTemp.forEach((table24) => {
      if (table24.id === item.id) {
        this.setState({ focusId: item.id });
        if (checkIn.id === null) {
          this.props.submitToBackend(data, "create");
        } else {
          this.props.submitToBackend(data, "update");
        }
        
        // console.log("this.props.submitLoading");
        // console.log(this.props.submitLoading);
      }
    });
  };

  render() {
    const { tableData24 } = this.state;
    const { submitLoading } = this.props;
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
  const checkInState = state.CheckIn;
  const { submitLoading } = state.CheckIn;

  return {
    routeTicketState,
    uid,
    checkInState,
    submitLoading,
  };
};

export default connect(mapStateToProps, {
  submitToBackend,
  readFromDatabase,
})(index);
