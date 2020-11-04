import { StyleSheet, Platform} from 'react-native';
import { padding, 
        Colors, 
        fontSize, 
        fontFamily, 
        windowWidth, 
        normalize }  from "../../../settings/styles/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1'
    },
    image: {
        height: undefined,
        width: undefined,
        flex: 1
    },
    text: {
        fontSize: 18,
        paddingVertical: 10
    },
    cardStyle: {
        height: 200,
        justifyContent: 'center',
        paddingLeft: 10
    },
    testimonialViewMoreContainerStyle: {
        backgroundColor: "#c83528",
        position: "absolute",
        bottom: "5%",
        right: "5%",
        marginTop: 10,
        marginLeft: 30,
        width: 80,
        height: 80,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    frame: {
        flex: 1,
        backgroundColor: "#f1f1f1"
    },

    
})

export default styles;