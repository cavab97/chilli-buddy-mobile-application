import React from "react";

import {
    Image,
    ImageBackground,
    TouchableOpacity,
    View,
    Text
} from "../../../atoms";

import { StyleSheet } from "react-native";

function mapPoint(complete, btnStyles, missionPress, data) {
    return (
        <View>
            {complete ? (
                <TouchableOpacity
                    disabled={true}
                    style={[styles.buttonContainer, btnStyles]}
                >
                    <Image
                        source={require("../../../../assets/gogogain/RouteMap_Complete_Button.png")}
                        style={[styles.buttonStyle]}
                    />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    onPressIn={() => missionPress(data)}
                    //onPressIn={helloWorld.bind(this)}
                    style={[styles.buttonContainer, btnStyles]}
                >
                    <Image
                        source={require("../../../../assets/gogogain/RouteMap_Button.png")}
                        style={[styles.buttonStyle]}
                    />
                </TouchableOpacity>
                // <TouchableNativeFeedback
                //     onPressIn={() => missionPress(data)}
                //     //onPressIn={helloWorld.bind(this)}
                //     style={[styles.buttonContainer, btnStyles]}
                // >
                //     <Image
                //         source={require("../../../../assets/gogogain/RouteMap_Button.png")}
                //         style={[styles.buttonStyle]}
                //     />
                // </TouchableNativeFeedback>
            )}
        </View>
    );
}

const RouteMap9 = (props) => {
    const { data, missionPress, finalizing } = props;

    return (
        <ImageBackground
            source={require("../../../../assets/gogogain/RouteMap_FA_Ver2_Yellow.png")}
            style={styles.container}
        >
            { finalizing &&
                <View style={styles.coverContainer}>
                    <Text style={styles.coverText}>Ranking in processing</Text>
                </View>
            }
            {mapPoint(data[0] && data[0] ? data[0].completed : false, styles.button1, missionPress, data[0])}
            {mapPoint(data[1] && data[1] ? data[1].completed : false, styles.button2, missionPress, data[1])}
            {mapPoint(data[2] && data[2] ? data[2].completed : false, styles.button3, missionPress, data[2])}
            {mapPoint(data[3] && data[3] ? data[3].completed : false, styles.button4, missionPress, data[3])}
            {mapPoint(data[4] && data[4] ? data[4].completed : false, styles.button5, missionPress, data[4])}
            {mapPoint(data[5] && data[5] ? data[5].completed : false, styles.button6, missionPress, data[5])}
            {mapPoint(data[6] && data[6] ? data[6].completed : false, styles.button7, missionPress, data[6])}
            {mapPoint(data[7] && data[7] ? data[7].completed : false, styles.button8, missionPress, data[7])}
            {mapPoint(data[8] && data[8] ? data[8].completed : false, styles.button9, missionPress, data[8])}
            
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 352,
        height: 588,
        alignItems: "center",
        alignSelf: "center",
        marginTop: 5,
    },
    coverContainer: {
        backgroundColor: "rgba(0, 0, 0, 0.5);",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        width: 342,
        height: 570,
        top: 5,
        left: 5,
        zIndex: 10,
        borderRadius: 10
    },
    coverText: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold"
    },
    buttonStyle: {
        width: 25,
        height: 25,
    },
    buttonContainer: {
        position: "absolute",
    },
    button1: {
        top: 135,
        left: 70,
    },
    button2: {
        top: 135,
        left: 0,
    },
    button3: {
        top: 135,
        right: 60,
    },
    button4: {
        top: 250,
        right: 65,
    },
    button5: {
        top: 250,
        left: 20,
    },
    button6: {
        top: 390,
        left: 25,
    },
    button7: {
        top: 390,
        right: 60,
    },
    button8: {
        top: 490,
        right: 30,
    },
    button9: {
        top: 490,
        left: 60,
    },
});

export default RouteMap9;
