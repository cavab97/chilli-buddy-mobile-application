import React from "react";
import { StyleSheet, Platform } from "react-native";

import { ActivityIndicator, Text, TouchableOpacity, View } from "../atoms";

import { Colors } from "@settings/styles/theme";

const renderFooterButton = () => {
  return (
    //Footer View with Load More button
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={getData}
      //On Click of button calling getData function to load more data
      style={styles.footer}
    >
      <Text style={styles.textStyle}>Load More</Text>
      <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#D60000",
    width: Platform.OS === "ios" ? 352 : 300,
    height: 46,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    color: Colors.WHITE,
    fontSize: 16,
    fontFamily: "HorizontalRounded",
  },
});

export { renderFooterButton };
