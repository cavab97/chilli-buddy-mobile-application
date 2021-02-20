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
          {this.SingleListingSection("About Us", "https://gogogain.com/?page_id=277")}
          {this.SingleListingSection("Term of Service", "https://gogogain.com/?page_id=826")}
          {this.SingleListingSection("Privacy Policy", "https://gogogain.com/?page_id=824")}
        </View>
        <View>
          <Text style={styles.title}>Technical Support</Text>
          {this.SingleListingSection("Email", "mailto:usersupport@infobay.com.my")}
          {this.SingleListingSection("WhatsApp", "https://wa.me/601110990198")}
          {this.SingleListingSection("Customer Hotline", "tel:+601110990198")}
        </View>
        <View>
          <Text style={styles.title}>Frequently Asked Questions</Text>
          {this.SingleListingSection("View FAQ", "https://gogogain.com/?page_id=448")}
        </View>
      </View>
    );
  }
}

export default HelpCenter;
