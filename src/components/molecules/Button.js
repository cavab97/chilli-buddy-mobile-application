import React from "react";
import { StyleSheet } from "react-native";
import {
    Text,
    TouchableOpacity,
} from "../atoms";
import { Colors } from "@settings/styles/theme";

const Button = (props) => {
    return (
        <TouchableOpacity onPress = {() => props.onPress()} style={[styles.containerStyle, props.containerStyle]}>
            <Text style={[styles.textStyle, props.textStyle]}>
                {props.children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: Colors.PRIMARY,
        width: 62,
        height: 22,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    textStyle: {
        color: Colors.WHITE,
        fontWeight: "500",
    },
});

export { Button };
