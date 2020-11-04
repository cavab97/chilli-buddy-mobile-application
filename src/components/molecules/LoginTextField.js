import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
    View, 
    Text, 
    ModalSelector,
    TextInput 
} from "@components/atoms";
import { Colors } from "../../settings/styles/theme";
import { State } from "react-native-gesture-handler";

const LoginTextField = props => {

    const { inputTitle, input } = styles;

    return (
        <View style={props.style}>
            <ModalSelector 
                onChange={props.onChangeAreaCode}
                data={props.countryCode}
                //initValue="+60"
                style={styles.categoriesButton}
                selectStyle={styles.categoriesSelect}
                selectTextStyle={styles.modalSelectTextStyle}
                optionTextStyle={styles.modalOptionTextStyle}
                selectedKey={"+60"}
                keyExtractor={item => item.dial_code}
                labelExtractor={item => item.dial_code}
                componentExtractor={item => <Text style={styles.modalOptionTextStyle}>{item.dial_code+"   "+item.name}</Text>}
            />
            <TextInput
                placeholder={props.placeholderText}
                secureTextEntry={props.isSecure}
                style={[input, props.inputStyle]}
                autoCorrect={false}
                onChangeText={props.onChangeText}
                value={props.value}
                placeholderTextColor = {props.placeholderTextColor}
            />
            {props.underline ? (
                <View
                    style={{
                        borderBottomColor: "#D8D8D8",
                        borderBottomWidth: 1
                    }}
                />
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    inputTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: 'bold',
        position: 'absolute',
        top: 11,
        left: 10,
    },
    input: {
        paddingVertical: 12,
        color: "#fff",
        fontSize: 16,
        //fontFamily: "Avenir Next",
        justifyContent: "center",
        paddingLeft: 20,
    },
    categoriesSelect:{
        //backgroundColor:Colors.WHITE,
        borderWidth:0,
        marginTop: 5,
        borderColor: "#373737"
    },
    categoriesButton:{
        width: 70,
        borderRadius: 3,
        paddingLeft: 0,
        borderWidth:1.5,
        borderColor: "white",
        backgroundColor:"transparent"
    },
    modalSelectTextStyle:{
        color: Colors.WHITE,
    },
    modalOptionTextStyle:{
        color: Colors.PRIMARY,
        backgroundColor:"transparent",
        textAlign: 'center'
    }
});

export { LoginTextField };
