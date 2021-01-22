import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import * as Location from "expo-location";

import { submitToBackend, readFromDatabase } from "@redux/voucher/action";

import styles from "./styles";

import { Image, Text, TouchableOpacity, View } from "@components/atoms";

import { Card, CardSection } from "@components/molecules";

import { VoucherList } from "@components/templates";

import Icon from "react-native-vector-icons/FontAwesome";
import moment from "moment";

const RADIUS = 50;

class index extends Component {
  constructor(props) {
    super(props);
    this.renderFooter = this.renderFooter.bind(this);
    this.state = {
      refreshing: false,
    };
    this.handleRefresh = this.handleRefresh.bind(this);
  }
  componentDidMount = async () => {
    this.props.readFromDatabase();
    this.handleRefresh();
  };

  handleRefresh = async () => {
    this.setState({ refreshing: true });
    await this.props.readFromDatabase();
    this.setState({ refreshing: false });
  };

  renderFooter({ empty }) {
    if (empty) {
      return Platform.OS === "ios" ? (
        <Card style={{ backgroundColor: "transparent" }}>
          <CardSection style={styles.emptySection}>
            <Icon name="inbox" size={64} style={styles.emptyIcon} />
            <Text style={styles.emptyText}>NO BOOKMARK FOUND</Text>
          </CardSection>
        </Card>
      ) : (
        <Card style={{ backgroundColor: "transparent", elevation: 0 }}>
          <CardSection style={[styles.emptySection, { elevation: 0 }]}>
            <Icon name="inbox" size={64} style={styles.emptyIcon} />
            <Text style={styles.emptyText}>NO BOOKMARK FOUND</Text>
          </CardSection>
        </Card>
      );
    } else {
      return <View style={{ marginBottom: 10 }} />;
    }
  }

  onVoucherPressed(item) {
    Actions.SingleVoucher({ distance: item.distance });
  }

  render() {
    // const readBookmark = this.props.bookmarkState.readBookmark;
    // const submitLoading = this.props.bookmarkState.submitLoading;
    const vouchers = this.props.voucherState.vouchers;

    console.log(this.state.refreshing);

    return (
      <VoucherList
        readLoading={this.props.readLoading}
        dataSource={vouchers}
        renderFooter={this.renderFooter.bind(this)}
        onVoucherPressed={this.onVoucherPressed.bind(this)}
        handleRefresh={this.handleRefresh.bind(this)}
        state={this.state}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { categories, tags } = state.Settings;
  const { vouchers } = state.Voucher;
  const voucherState = state.Voucher;

  return { categories, tags, vouchers, voucherState };
};

export default connect(mapStateToProps, {
  submitToBackend,
  readFromDatabase,
})(index);
