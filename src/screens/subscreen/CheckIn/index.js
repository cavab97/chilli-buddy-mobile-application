import React, { Component } from "react";
import { connect } from "react-redux";
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

class index extends Component {
  constructor(props) {
    super(props);
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
