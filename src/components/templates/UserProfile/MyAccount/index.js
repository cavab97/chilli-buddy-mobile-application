import React, { Component } from "react";

import { Icon, ScrollView, Text, TouchableOpacity, View } from "../../../atoms";

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

  onHelpCenterPress() {
    Actions.HelpCenter();
  }

  onSettingsPress() {}

  onVersionPress() {}

  render() {
    const { onSignoutPress, logOutLoading } = this.props;

    return (
      <ScrollView style={styles.accountContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.accountMoreContainer}>
          <Text style={styles.moreTextStyle}>More</Text>
        </View>
        <View>{this.settingListing("Help Center", this.onHelpCenterPress.bind(this), true)}</View>
        {/* <View>
                    {this.settingListing(
                        "Settings",
                        this.onSettingsPress.bind(this),
                        true
                    )}
                </View> */}
        <View>{this.settingListing("Version", this.onVersionPress.bind(this), "2.4.7")}</View>
        <View style={styles.signoutButtonStyle}>
          <SignoutButton onPress={onSignoutPress} loading={logOutLoading}>
            Sign Out
          </SignoutButton>
        </View>
      </ScrollView>
    );
  }
}

export default MyAccount;
