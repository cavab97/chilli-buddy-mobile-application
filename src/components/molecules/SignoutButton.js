import React from "react";
import { StyleSheet, Platform } from "react-native";

import { ActivityIndicator, Text, TouchableOpacity, View } from "../atoms";

import { Colors } from "@settings/styles/theme";

const SignoutButton = (props) => {
  return (
    <TouchableOpacity
      onPress={() => props.onPress()}
      style={[styles.containerStyle, props.containerStyle]}
      disabled={props.disabled}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {props.loading && <ActivityIndicator size="small" color={Colors.RED} />}
        <Text style={[styles.textStyle, props.textStyle]}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
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

export { SignoutButton };
