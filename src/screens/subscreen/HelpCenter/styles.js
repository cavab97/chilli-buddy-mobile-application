import { StyleSheet } from "react-native";
import { Colors } from "../../../settings/styles/theme";

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        paddingTop: 20,
    },
    title: {
        fontSize: 16,
        color: Colors.PRIMARY,
        fontFamily: "RobotoRegular",
        fontWeight: "bold",
        paddingLeft: 20,
        paddingVertical: 20,
    },
    listButtonStyle: {
        flexDirection: "row",
        marginHorizontal: 30,
        paddingTop: 15,
        paddingBottom: 10,
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#D1D1D1",
    },
    listTitle: {
        fontSize: 17,
        fontFamily: "RobotoRegular",
    },
    versionTextStyle: {
        fontSize: 18,
        color: Colors.PRIMARY,
        fontWeight: "bold",
    },
    signoutButtonStyle: {
        alignSelf: "center",
        padding: 20,
    },
});

export default styles;
