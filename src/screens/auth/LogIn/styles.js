import { StyleSheet, Dimensions } from "react-native";
import { padding, 
    Colors, 
    Mixins,
    fontSize, 
    fontFamily, 
    windowWidth, 
    normalize 
}  from "../../../settings/styles/theme";
const screenHeight = Math.round(Dimensions.get('window').height);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    innerContainer: {
        flex: 1,
        height: screenHeight,
    },
    containerpart1: {
        flex: 1,
        height: 250,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    containerpart2: {
        flex: 1,
        marginTop: 5,
        marginBottom: 14,
        width: '100%',
        justifyContent: "flex-start",
        alignItems: "center",
    },
    loginText:{
        color: Colors.PRIMARY,
        fontSize: 16,
        fontWeight: "bold",
    },
    text:{
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold"
    },
    logoImage: {
        width: 270,
        height: 230,
        resizeMode :"contain",
    },
    inputContainerStyle:{
        flexDirection: "row",
        width: 292,
        marginVertical:8,
    },
    inputStyle:{
        width: 222,
        borderRadius: 3,
        paddingLeft: 0,
        textAlign: 'center',
        borderWidth:1.5,
        borderColor: "white",
        color: 'rgba(255,255,255,1)',
        backgroundColor:"transparent"
    },
    loginContainer: {
        backgroundColor: "#fff",
        borderRadius: 3,
        width: 292,
        height: 49,
        marginVertical:8,
        justifyContent: "center",
        alignItems: "center",
        flexDirection:"row"
    },
    errorText: {
        color: "red",
        textAlign: 'center'
    }
});

export default styles;
