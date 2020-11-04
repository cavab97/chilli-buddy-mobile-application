import React from 'react';
import * as ReactNative from 'react-native';

const Modal = props => {
    const { ...prop } = props

    return (
        <ReactNative.Modal
            {...prop}
        >
            {props.children}
        </ReactNative.Modal>
    );
};

export { Modal };