import React from "react";

import {
    Text,
    TouchableOpacity,
    View,
    ScrollView
} from "../../atoms";  

import Modal from "react-native-modal";
import styles from "./styles";

function renderData(type, dataSource, selectedItem, onPress) {

    const {  
        buttonContainer,
        button,
        selectedButton,
        selectedText,
        text
    } = styles;

    switch(type) {
        case 'category':
            return (
                <View style={buttonContainer}>
                    {dataSource.map(data => 
                        <TouchableOpacity key={data.id} onPress={() => onPress(data.id)}>
                            <View style={selectedItem === data.id ? selectedButton : button}>
                                <Text style={selectedItem === data.id ? selectedText : text}>
                                    {data.title}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
            ) 
        case 'tag':
            if (dataSource.length === 0) {
                return (
                    <View style={buttonContainer}>
                        <Text style={text}>
                            Currently no category is selected.
                        </Text> 
                    </View>
                )
            } else {
                return (
                    <View style={buttonContainer}>
                        {dataSource.map(data => 
                            <TouchableOpacity key={data.id} onPress={() => onPress(data.id)}>
                                <View style={selectedItem === data.id ? selectedButton : button}>
                                    <Text style={selectedItem === data.id ? selectedText : text}>
                                        {data.title}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                )
            }
        default: 
            return (
                <View/>
            )
    }
}

const SwipeableModal = ({
    modalVisible,
    dataSource,
    modalTitle,
    full,
    type,
    onBackDropPressed,
    onSwipeComplete,
    selectedCategory,
    onPress
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
            swipeDirection={['down']}
            backdropOpacity={0.45}
            onBackdropPress={onBackDropPressed}
            onSwipeComplete={onSwipeComplete}
            propagateSwipe={true}
        >
            <View style={full ? contentFull : contentHalf}>
                <View style={swipeableIndicator} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={contentContainer}>
                        <Text style={title}>
                            {modalTitle}
                        </Text>
                        {renderData(type, dataSource, selectedCategory, onPress)}
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
}

export { SwipeableModal }