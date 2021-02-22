import React, { Component } from "react";

import { Icon, Text, TouchableOpacity, View } from "../../../components/atoms";

import styles from "./styles";
import { Linking } from "react-native";

export class HelpCenter extends Component {
  SingleListingSection(text, url) {
    return (
      <TouchableOpacity
        style={styles.listButtonStyle}
        onPress={() => {
          Linking.openURL(url);
        }}
      >
        <Text style={styles.listTitle}>{text}</Text>
        <Icon name="right" type="antdesign" size={24} color="#9D9D9D" />
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View>
        <View style={styles.topTextContainer}>
          <Text style={styles.topText}>Help Center</Text>
        </View>
        <View>
          <Text style={styles.title}>About</Text>
          {this.SingleListingSection("About Us", "https://chillibuddy.com/about-us/")}
          {this.SingleListingSection(
            "Term of Service",
            "https://chillibuddy.com/terms-and-conditions/"
          )}
          {this.SingleListingSection("Privacy Policy", "https://chillibuddy.com/privacy-policy/")}
        </View>
        <View>
          <Text style={styles.title}>Technical Support</Text>
          {this.SingleListingSection("Email", "mailto:admin@chillibuddy.com")}
          {this.SingleListingSection("WhatsApp", "https://wa.me/601110990198")}
          {this.SingleListingSection("Customer Hotline", "tel:+601110990198")}
        </View>
        {/* <View>
          <Text style={styles.title}>Frequently Asked Questions</Text>
          {this.SingleListingSection("View FAQ", "https://gogogain.com/?page_id=448")}
        </View> */}
      </View>
    );
  }
}

export default HelpCenter;
