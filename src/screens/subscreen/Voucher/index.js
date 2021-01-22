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
    this.handleRefresh = this.handleRefresh.bind(this);
  }
  componentDidMount = async () => {
    this.props.readFromDatabase();
    this.handleRefresh();
  };

  handleRefresh = async () => {
    await this.props.readFromDatabase();
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
    Actions.SingleVoucher({
      voucherTitle: item.title,
      voucherSalesPoint: item.salesPoint,
      vocuherExpiredDate: item.expiredDate,
      voucherMerchantName: item.MerchantName,
      voucherDescription: item.description,
      voucherStatus: item.status,
    });
  }

  render() {
    // const readBookmark = this.props.bookmarkState.readBookmark;
    // const submitLoading = this.props.bookmarkState.submitLoading;
    const vouchers = this.props.vouchers;

    return (
      <VoucherList
        readLoading={this.props.readLoading}
        dataSource={vouchers}
        renderFooter={this.renderFooter.bind(this)}
        onVoucherPressed={this.onVoucherPressed.bind(this)}
        handleRefresh={this.handleRefresh.bind(this)}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { categories, tags } = state.Settings;
  const { vouchers } = state.Voucher;
  const { readLoading } = state.Voucher;

  return { categories, tags, vouchers, readLoading };
};

export default connect(mapStateToProps, {
  submitToBackend,
  readFromDatabase,
})(index);
