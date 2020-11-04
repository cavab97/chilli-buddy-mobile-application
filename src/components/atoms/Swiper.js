import React from 'react';
import ReactNativeSwiper from 'react-native-swiper';

const Swiper = props => {
    const { ...prop } = props

    return (
        <ReactNativeSwiper
            {...prop}
        >
            {props.children}
        </ReactNativeSwiper>
    );
};

export { Swiper }