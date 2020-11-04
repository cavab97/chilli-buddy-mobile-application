import React from 'react';
import * as ReactNativeElements from 'react-native-elements';

const Button = props => {
    const { ...prop } = props

    return (
        <ReactNativeElements.Button
            {...prop}
        />
    );
};

export { Button };