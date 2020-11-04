import React from 'react';
import * as ReactNative from 'react-native';

const ActivityIndicator = props => {
    const { ...prop } = props

    return (
        <ReactNative.ActivityIndicator {...prop} />
    );
};

export { ActivityIndicator };

