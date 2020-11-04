import React from 'react';
import * as ReactNative from 'react-native';

const RefreshControl = props => {
    const { ...prop } = props

    return (
        <ReactNative.RefreshControl
            {...prop}
        />
    );
};

export { RefreshControl };