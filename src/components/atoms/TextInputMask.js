import React from "react";
import * as ReactNativeMaskedText from "react-native-masked-text";

const TextInputMask = props => {
    const { ...prop } = props;

    return <ReactNativeMaskedText.TextInputMask {...prop} />;
};

export { TextInputMask };
