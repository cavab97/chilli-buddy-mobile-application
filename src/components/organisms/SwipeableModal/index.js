import React from "react";

import {
    Text,
    TouchableOpacity,
    View,
} from "../../atoms";  

import Modal from "react-native-modal";
import styles from "./styles";

function renderData(type, dataSource) {

    const {  
        buttonContainer,
        button
    } = styles;

    switch(type) {
        case 'category':
            return (
                <View style={buttonContainer}>
                    {dataSource.map(data => 
                        <TouchableOpacity key={data.id}>
                            <View style={button}>
                                <Text>
                                    {data.title}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
            ) 
        case 'tag':
            return (
                <View style={buttonContainer}>
                    {dataSource.map(data => 
                        <TouchableOpacity key={data.id}>
                            <View style={button}>
                                <Text>
                                    {data.title}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
            )
        default: 
            return (
                <View/>
            )
    }
}

const SwipeableModal = ({
    modalVisible,
    swipeFullScreen,
    swipeable,
    dataSource,
    modalTitle,
    full,
    type,
    onBackDropPressed,
    onSwipeComplete,
    onSwipeMove
}) => {

    const { 
        modalContainer,
        swipeableIndicator,
        contentContainer,
        title,
        contentHalf,
        contentFull
    } = styles;

    return (
        <Modal 
            isVisible={modalVisible}
            style={modalContainer}
            onSwipeMove={swipeFullScreen}
            swipeDirection={['up', 'down']}
            backdropOpacity={0.45}
            onBackdropPress={onBackDropPressed}
            onSwipeComplete={onSwipeComplete}
            onSwipeMove={onSwipeMove}
        >
            <View style={full ? contentFull : contentHalf}>
                <View style={swipeableIndicator} />
                <View style={contentContainer}>
                    <Text style={title}>
                        {modalTitle}
                    </Text>
                    {renderData(type, dataSource)}
                </View>
            </View>
        </Modal>
    );
}

export { SwipeableModal }