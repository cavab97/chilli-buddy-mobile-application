
import { StyleSheet } from "react-native";
import { Colors } from "../settings/styles/theme";
import { Platform } from "react-native";


const styles = StyleSheet.create({
    container: {
        backgroundColor: "black"
    },
    title: {
        textAlign: "left",
        color: Colors.Black,
        flex: 1,
        fontSize: 24,
        fontWeight: 'normal'
    },
    promoButton: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        borderColor: "#FFFFFF"
    },
    // promoButtonView: {
    //     alignItems: "center",
    //     justifyContent: "center",
    //     width: 72,
    //     height: 72,
    //     //borderColor: "#FFFFFF",
    //     backgroundColor: Colors.PRIMARY,
    //     borderRadius: 36,
    //     borderWidth: 3,
    //     top: -30,
    //     position: "absolute",
    // }
});


export default styles;
