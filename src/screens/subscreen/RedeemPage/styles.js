import { StyleSheet } from "react-native";
import { Colors } from "../../../settings/styles/theme";

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
    },
    headerContainerStyle: {
        flex: 1,
        alignItems: "center",
    },
    titleStyle: {
        fontSize: 24,
        fontWeight: "bold",
        fontFamily: "RobotoRegular",
        color: Colors.PRIMARY,
        paddingVertical: 35,
    },
    redeemImageStyle: {
        width: 292,
        height: 206,
    },
    bodyContainerStyle: {
        flex: 1,
        alignItems: "center",
    },
    descriptStyle: {
        fontSize: 14,
        fontWeight: "bold",
        fontFamily: "RobotoRegular",
        color: Colors.PRIMARY,
        textAlign: "center",
        paddingHorizontal: 20,
    },
    claimButtonContainer: {
        width: 285,
        height: 40,
        marginVertical: 30,
        backgroundColor: Colors.PRIMARY
    },
    claimButtonText: {
        color: '#fff'
    }
});

export default styles;
