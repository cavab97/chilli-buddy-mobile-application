import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        borderWidth: 2,
        borderColor: "black",
        backgroundColor: "#ffffff",
        borderStyle : 'dashed',
        paddingHorizontal: 20,
        paddingVertical:5
    },
    title:{
        fontSize: 16,
        color: "black",
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: "RobotoRegular",
    },
    subtitle:{
        fontSize: 14,
        color: "black",
        textAlign:"justify",
        fontFamily: "RobotoRegular",
    },
});

export default styles;
