import React from 'react';
import * as ReactNative from 'react-native';

const VirtualizedList = props => {
    const { ...prop } = props

    return (
        <ReactNative.VirtualizedList
            {...prop}
        />
    );
};


export { VirtualizedList };