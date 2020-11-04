import React from 'react';
import * as ReactNative from 'react-native';

const Image = props => {
    const { ...prop } = props

    return (
        <ReactNative.Image
            {...prop}
        />
    );
};

export { Image };