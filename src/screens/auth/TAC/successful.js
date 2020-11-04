import React, { Component, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import {
    Image,
    Modal,
    Text,
    View, 
} from "../../../components/atoms";
import { Colors } from "../../../settings/styles/theme";

export const SuccessfulModal = () => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={false}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.subContainer}>
                            <Image
                                source={require("../../../assets/gogogain/successful_icon.png")}
                                style={styles.icon}
                            />
                        </View>

                        <View style={styles.subContainer1}>
                            <Text style={styles.title}>Verified!</Text>
                        </View>

                        <View style={styles.subContainer2}>
                            <Text style={styles.descript}>
                                You have successfully verified the account.
                            </Text>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    modalView: {
        margin: 20,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 5,
        padding: 35,
        width: 298,
        height: 318,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    subContainer:{
        marginTop: 20
    },
    subContainer1:{
        marginTop: 26
    },
    subContainer2:{
        marginTop: 20
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    icon: {
        width: 81,
        height: 81
    },
    title: {
        color: "white",
        fontSize: 26,
        fontWeight: 'bold',
        fontFamily: "RobotoRegular",
    },
    descript: {
        color: "white",
        fontSize: 18,
        textAlign: 'center',
        fontFamily: "RobotoRegular",
    }
});
