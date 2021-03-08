import React from "react";

import { Modal, Image, TouchableOpacity, View, Text } from "../../atoms";

import Icon from "react-native-vector-icons/AntDesign";

import styles from "./styles";

const CustomNavBar = ({
  onPressBack,
  onPressButton1,
  onPressButton2,
  textOne,
  textTwo,
  selectedButton1,
  selectedButton2,
}) => {
  const { container, buttonContainer, button, text, selectedButton, selectedText } = styles;

  return (
    <View style={container}>
      <TouchableOpacity onPress={onPressBack} activeOpacity={1}>
        <Icon size={26} color="#d70000" name="left" />
      </TouchableOpacity>
      <View style={buttonContainer}>
        <TouchableOpacity
          style={selectedButton1 ? selectedButton : button}
          onPress={onPressButton1}
          activeOpacity={1}
        >
          <Text style={selectedButton1 ? selectedText : text}>{textOne}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={selectedButton2 ? selectedButton : button}
          onPress={onPressButton2}
          activeOpacity={1}
        >
          <Text style={selectedButton2 ? selectedText : text}>{textTwo}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export { CustomNavBar };
