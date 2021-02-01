import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { submitToBackend, readFromDatabase } from "@redux/voucher/action";
import styles from "./styles";
import { Text, View } from "@components/atoms";
import { Card, CardSection } from "@components/molecules";
import { VoucherList } from "@components/templates";
import Icon from "react-native-vector-icons/FontAwesome";
const RADIUS = 50;
class index extends Component {
  constructor(props) {
    super(props);
    this.renderFooter = this.renderFooter.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }
  componentDidMount() {
    this.props.readFromDatabase();
    this.handleRefresh();
  }

  handleRefresh = async () => {
    await this.props.readFromDatabase();
  };

  renderFooter({ empty }) {
    if (empty) {
      return Platform.OS === "ios" ? (
        <Card style={{ backgroundColor: "transparent" }}>
          <CardSection style={styles.emptySection}>
            <Icon name="inbox" size={64} style={styles.emptyIcon} />
            <Text style={styles.emptyText}>NO VOUCHER FOUND</Text>
          </CardSection>
        </Card>
      ) : (
        <Card style={{ backgroundColor: "transparent", elevation: 0 }}>
          <CardSection style={[styles.emptySection, { elevation: 0 }]}>
            <Icon name="inbox" size={64} style={styles.emptyIcon} />
            <Text style={styles.emptyText}>NO VOUCHER FOUND</Text>
          </CardSection>
        </Card>
      );
    } else {
      return <View style={{ marginBottom: 10 }} />;
    }
  }

  onVoucherPressed(item) {
    Actions.SingleVoucher({
      voucherID: item.id,
      merchantName: item.merchant[0].businessName,
    });
  }

  render() {
    const vouchers = this.props.vouchers;

    let voucherList = [];

    const filteredVoucherUsed = vouchers.filter((voucher) => voucher.claimed === true);

    const voucherAvailable = vouchers.filter((voucher) => voucher.claimed === false);

    voucherList = voucherAvailable.concat(filteredVoucherUsed);

    return (
      <VoucherList
        readLoading={this.props.readLoading}
        dataSource={voucherList}
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
