import { StyleSheet, Platform} from 'react-native';
import { padding, 
        color, 
        fontSize, 
        fontFamily, 
        windowWidth, 
        normalize }  from "../../../settings/styles/theme"



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1'
    },
    avatarSection: {
        top: 20,
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    detailsSection: {
        flex: 1,
        backgroundColor: "white"
    },
    button: {
        marginVertical: 5,
        width: "90%",
        alignSelf: "center"
    },
    mainContainer: {
        flex: 0, 
        backgroundColor: "#fff"
    }
});

export default styles;