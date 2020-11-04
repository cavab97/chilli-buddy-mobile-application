import React from 'react';
import * as ReactNative from 'react-native';

const ImageBackground = props => {
    const { ...prop } = props

    return (
        <ReactNative.ImageBackground
            {...prop}
        >
            {props.children}
        </ReactNative.ImageBackground>
    );
};

export { ImageBackground };