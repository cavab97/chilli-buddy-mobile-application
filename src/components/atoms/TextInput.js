import React from "react";
import * as ReactNative from "react-native";

const TextInput = props => {
    const { ...prop } = props;

    return <ReactNative.TextInput allowFontScaling={false} {...prop} />;
};

export { TextInput };
