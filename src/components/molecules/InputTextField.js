import React, { Component } from "react";
import { StyleSheet } from "react-native";

import {
    Text, 
    TextInput,
    View
} from "../atoms";

const InputTextField = props => {
    const state = {
        underline: true
    };

    const { inputTitle, input } = styles;

    return (
        <View style={props.style}>
            <Text style={inputTitle}>{props.title}</Text>
            <TextInput
                placeholder={props.placeholderText}
                placeholderTextColor = {props.placeholderTextColor}
                secureTextEntry={props.isSecure}
                style={[input, props.inputStyle]}
                autoCorrect={false}
                onChangeText={props.onChangeText}
                value={props.value}
                keyboardType={props.keyboardType}
                disabled={props.disabled}
            />
            {props.underline ? (
                <View
                    style={{
                        borderBottomColor: "#D8D8D8",
                        borderBottomWidth: 1
                    }}
                />
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    inputTitle: {
        color: "#f3dddb",
        fontSize: 14,
        fontFamily: "RobotoRegular",
    },
    input: {
        paddingVertical: 12,
        color: "#fff",
        fontSize: 16,
        fontFamily: "RobotoRegular",
        justifyContent: "center",
        paddingLeft: 20,
        backgroundColor: "rgba(0, 0, 0, 0.2)"
    }
});

export { InputTextField };
