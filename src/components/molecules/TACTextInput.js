import React, { Component } from "react";
import { StyleSheet } from "react-native";

import {
    SmoothPinCodeInput,
    View
} from "../atoms";

const TACTextInput = ({
    codeLength = 6,
    password = false,
    value = '',
    onChange,
    textStyle
}) => {
    const { cell, placeholder, mask } = styles;
    return (
        <SmoothPinCodeInput
            placeholder={<View style={placeholder}></View>}
            mask={<View style={mask}></View>}
            maskDelay={1000}
            codeLength={codeLength}
            password={password}
            autoFocus={true}
            cellStyle={null}
            cellStyleFocused={null}
            value={value}
            onTextChange={onChange}
            cellStyle={cell}
            textStyle={textStyle}
        />
    );
};

const styles = StyleSheet.create({
    cell: {
        width: 20
    },
    placeholder: {
        width: 7,
        height: 7,
        borderRadius: 25,
        opacity: 1,
        backgroundColor: "#fff"
    },
    mask: {
        width: 7,
        height: 7,
        borderRadius: 25,
        backgroundColor: "#fff"
    }
});

export { TACTextInput };
