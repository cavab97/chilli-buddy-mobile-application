import React from "react";

import {
  Modal,
  Image,
  TouchableOpacity,
  View,
  Text
} from "../../atoms";

import Icon from 'react-native-vector-icons/AntDesign';

import styles from "./styles";

const CustomNavBar = ({ 
    onPressBack,
    onPressButton1,
    onPressButton2,
    textOne,
    textTwo,
}) => {
    const { 
        container,
        buttonContainer,
        button,
        text
    } = styles;

    return (
        <View style={container}>
            <TouchableOpacity 
                onPress={onPressBack}
            >
                <Icon
                    size={26}
                    color='#d70000'
                    name='left'
                />
            </TouchableOpacity>
            <View style={buttonContainer}>
                <TouchableOpacity 
                    style={button}
                    onPress={onPressButton1}
                >
                    <Text style={text}>
                        {textOne}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={button}
                    onPress={onPressButton2}
                >
                    <Text style={text}>
                        {textTwo}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export { CustomNavBar };
