import React from 'react';
import * as ReactNative from 'react-native';

const SafeAreaView = props => {
    const { ...prop } = props

    return (
        <ReactNative.SafeAreaView
            {...prop}
        >
            {props.children}
        </ReactNative.SafeAreaView>
    );
};

export { SafeAreaView };