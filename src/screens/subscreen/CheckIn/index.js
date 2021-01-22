import React, { Component } from "react";
import { connect } from "react-redux";
<<<<<<< HEAD

import { CheckIn } from "@components/templates";

const RADIUS = 50;
const NUM = 7;
=======
import { Actions } from "react-native-router-flux";

import styles from "./styles";

import { CheckIn } from "@components/templates";

const data = [
  { id: "a", value: "A" },
  { id: "b", value: "B" },
  { id: "c", value: "C" },
  { id: "d", value: "D" },
  { id: "e", value: "E" },
  { id: "f", value: "F" },
];
>>>>>>> ffb513a687754a08769b93aa240820e8ba9031b4

class index extends Component {
  constructor(props) {
    super(props);
<<<<<<< HEAD
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
=======
  }
  render() {
    return <CheckIn data={data} />;
  }
}

const mapStateToProps = (state) => {
  const { categories, tags } = state.Settings;
  const { vouchers } = state.Voucher;
  const voucherState = state.Voucher;

  return { categories, tags, vouchers, voucherState };
};

export default connect(mapStateToProps, {})(index);
>>>>>>> ffb513a687754a08769b93aa240820e8ba9031b4
