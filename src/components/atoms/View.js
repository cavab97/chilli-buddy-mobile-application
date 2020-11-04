import React from 'react';
import * as ReactNative from 'react-native';

const View = props => {
    const { ...prop } = props

    return (
        <ReactNative.View
            {...prop}
        >
            {props.children}
        </ReactNative.View>
    );
};

export { View };