import { Platform, StyleSheet } from "react-native";
import { Colors } from "@settings/styles/theme/index";

const styles = StyleSheet.create({
    noRecordContainer: {
        alignItems: "center",
        width: "100%",
        marginTop: 10,
    },

    noRecordText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    emptySection:{
        alignContent: 'center',
        alignItems:'center',
        justifyContent:'center',
        flexDirection: "column"
    },
    emptyIcon:{
        paddingTop: 35,
        alignSelf:'center', 
        justifyContent:'center',
        color: (Platform.OS === 'ios') ? "#FAFAFA" : "#F4F4F4"
    },
    emptyText: {
        fontWeight: "bold",
        fontSize: 20,
        color: (Platform.OS === 'ios') ? Colors.GRAY_LIGHTEST : "#E6E6E6"
    },
});

export default styles;