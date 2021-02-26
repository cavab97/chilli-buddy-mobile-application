import React from "react";

import { Text, TouchableOpacity, View } from "../atoms";

import Icon from "react-native-vector-icons/Ionicons";
import { Platform } from "react-native";

const Header = ({
  title,
  subtitle,
  subtitleDescription,
  iconName,
  iconColor,
  iconSize,
  subContainer,
  titleStyle,
  subtitleStyle,
  onPress,
}) => {
  if (iconName) {
    return (
      <View style={styles.container}>
        <Text style={styles.textTitle}>{title}</Text>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.subContainer}>
            <View style={styles.iconContainer}>
              <Icon name={iconName} color={iconColor} size={iconSize} />
            </View>
            <Text style={styles.textSubtitle}>{subtitle}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={subContainer}>
        <Text style={titleStyle}>{title}</Text>
        <Text style={subtitleStyle}>
          {subtitle}
          {subtitleDescription}
        </Text>
      </View>
    );
  }
};

const styles = {
  container: {
    //flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginHorizontal: 30,
    paddingVertical: 5,
  },
  textTitle: {
    fontSize: 20,
    fontFamily: "HorizontalRounded",
  },
  textSubtitle: {
    color: "#f18a22",
    fontFamily: "HorizontalRounded",
    textTransform: "uppercase",
    fontSize: 16,
    paddingTop: 2,
    paddingLeft: 5,
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
  },
  iconContainer: {
    paddingTop: Platform.OS === "ios" ? 2 : 4,
  },
};

export { Header };
