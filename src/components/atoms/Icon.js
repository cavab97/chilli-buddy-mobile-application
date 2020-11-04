import React from 'react';
import * as ReactNativeElements from 'react-native-elements';

const Icon = props => {
    const { ...prop } = props

    return (
        <ReactNativeElements.Icon
            {...prop}
        />
    );
};

export { Icon };