import React from 'react';
import * as ReactNative from 'react-native';

const TouchableWithoutFeedBack = props => {
    const { ...prop } = props

    return (
        <ReactNative.TouchableWithoutFeedback
            {...prop}
        >
            {props.children}
        </ReactNative.TouchableWithoutFeedback>
    );
};

export { TouchableWithoutFeedBack };