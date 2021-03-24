import React, { Component } from "react";

import { Icon, ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from "../../../atoms";

import { Colors } from "../../../../settings/styles/theme";
import styles from "./styles";
import { SignoutButton } from "../../../molecules";
import { Actions } from "react-native-router-flux";

export class MyAccount extends Component {
  settingListing = (title, onPress, more) => {
    return (
      <TouchableOpacity onPress={() => onPress()} style={styles.listButtonStyle}>
        <Text style={styles.listTitle}>{title}</Text>
        {!more ? (
          <View></View>
        ) : typeof more == "boolean" ? (
          <Icon name="right" type="antdesign" color={Colors.GRAY_DARK} size={20} />
        ) : (
          <View>
            <Text style={styles.versionTextStyle}>{more}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  onBookmarkPress() {
    Actions.Favourite();
  }

  onHelpCenterPress() {
    Actions.HelpCenter();
  }

  onVoucherPress() {
    Actions.Voucher();
  }

  onSettingsPress() {}

  onVersionPress() {}

  render() {
    const { onSignoutPress, logOutLoading } = this.props;

    return (
      <ScrollView style={styles.accountContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.accountMoreContainer}>
          {/* <Text style={styles.moreTextStyle}>More</Text> */}
        </View>
        <View>{this.settingListing("Favourite", this.onBookmarkPress.bind(this), true)}</View>
        {/* <View>{this.settingListing("Voucher", this.onVoucherPress.bind(this), true)}</View> */}
        <View>{this.settingListing("Help Center", this.onHelpCenterPress.bind(this), true)}</View>
        {/* <View>
                    {this.settingListing(
                        "Settings",
                        this.onSettingsPress.bind(this),
                        true
                    )}
                </View> */}
        <View>{this.settingListing("Version", this.onVersionPress.bind(this), "3.2.2")}</View>
        {/* <View style={styles.signoutButtonStyle}>xsxs
          <SignoutButton onPress={onSignoutPress} loading={logOutLoading}>
            Sign Out
          </SignoutButton>
        </View> */}
        <TouchableOpacity
          onPress={onSignoutPress}
          style={styles.signoutButtonStyle}
          // disabled={props.disabled}
        >
          <View style={{ flexDirection: "row" /*  justifyContent: "start" */ }}>
            {logOutLoading && <ActivityIndicator size="large" color={Colors.GRAY_DARK} />}
            <Text style={styles.versionTextStyle}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default MyAccount;
