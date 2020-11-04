import React from 'react';
import * as ReactNative from 'react-native';

const FlatList = props => {
    const { ...prop } = props

    return (
        <ReactNative.FlatList
            {...prop}
        />
    );
};


export { FlatList };