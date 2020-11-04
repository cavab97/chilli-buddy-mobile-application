import React from 'react';
import * as ReactNative from 'react-native';

const ScrollView = props => {
    const { ...prop } = props

    return (
        <ReactNative.ScrollView
            {...prop}
        >
            {props.children}
        </ReactNative.ScrollView>
    );
};

export { ScrollView };