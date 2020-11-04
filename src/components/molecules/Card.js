import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../atoms';

const Card = (props) => {
    return (
        <View style={[styles.containerStyle, props.style]}>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        width: '100%',
        marginTop: 10,
        backgroundColor: '#fff',
        alignSelf: 'center'
    }
});

export { Card }; 