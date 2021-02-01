import React from "react";
import { StyleSheet, Platform } from "react-native";

import { ActivityIndicator, Text, TouchableOpacity, View } from "../atoms";

import { Colors } from "@settings/styles/theme";

const RedeeemButton = (props) => {
  return (
    <TouchableOpacity
      onPress={() => props.onPress()}
      style={[styles.containerStyle, props.containerStyle]}
      disabled={props.disabled}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {props.loading && <ActivityIndicator size="large" color={Colors.WHITE} />}
        <Text style={[styles.textStyle, props.textStyle]}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    width: Platform.OS === "ios" ? 352 : 300,
    height: 46,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    color: Colors.WHITE,
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "RobotoRegular",
  },
});

export { RedeeemButton };
