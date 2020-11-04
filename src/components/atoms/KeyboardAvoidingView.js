import React from 'react';
import * as ReactNative from 'react-native';

const KeyboardAvoidingView = props => {

    const { ...prop } = props

    return (
        <ReactNative.KeyboardAvoidingView {...prop}>
            {props.children}
        </ReactNative.KeyboardAvoidingView>
    );
};

export { KeyboardAvoidingView };