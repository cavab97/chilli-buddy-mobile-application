
import { StyleSheet } from "react-native";
import { Colors } from "../settings/styles/theme";
import { Platform } from "react-native";

console.log(Platform.OS)
console.log(Platform.isPad)

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white"
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
        top: -25,
        right: Platform.OS === 'ios' && Platform.isPad === true ? 10 : 0

    },
});


export default styles;
