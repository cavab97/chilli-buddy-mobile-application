import React from 'react';
import * as ReactNative from 'react-native';

const TouchableOpacity = props => { 
    const { ...prop } = props

    return (
        <ReactNative.TouchableOpacity 
            {...prop}
        >
            {props.children}
        </ReactNative.TouchableOpacity>
    );
};

export { TouchableOpacity };