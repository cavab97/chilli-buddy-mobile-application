import { StyleSheet, Platform} from 'react-native';
import { Dimensions } from "react-native";
import Constants from 'expo-constants';
import { Colors } from "../../../settings/styles/theme";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    modalContainer: {
        margin: 0, 
        justifyContent: 'flex-end',
    },
    swipeableIndicator: {
        backgroundColor: '#d3d3d3', 
        width: 50, 
        height: 5, 
        alignSelf: 'center', 
        marginVertical: 15, 
        borderRadius: 15,
    },
    contentContainer: {
        paddingTop: 15,
        paddingHorizontal: 30,
        paddingBottom: 30
    },
    contentHalf: {
        height: windowHeight/2, 
        width: windowWidth,
        backgroundColor: '#fff', 
        borderTopLeftRadius: 30, 
        borderTopRightRadius: 30,
    },
    contentFull: {
        height: windowHeight - Constants.statusBarHeight, 
        width: windowWidth,
        backgroundColor: '#fff', 
        borderTopLeftRadius: 30, 
        borderTopRightRadius: 30,
    },
    title: {
        fontFamily: 'HorizontalRounded', 
        fontSize: 18, 
        paddingBottom: 10
    },
    buttonContainer: {
        flexDirection: 'row', 
        flexWrap: 'wrap'
    },
    button: {
        shadowColor: Colors.GREY, 
        shadowOffset: { 
            height: 0, 
            width: 0 
        }, 
        shadowOpacity: 0.4,
        shadowRadius: 1.5, 
        backgroundColor: Colors.WHITE,
        elevation: 2,  
        borderRadius: 30,
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginRight: 10,
        marginVertical: 8
    },
    selectedButton: {
        shadowColor: Colors.GREY, 
        shadowOffset: { 
            height: 0, 
            width: 0 
        }, 
        shadowOpacity: 0.4,
        shadowRadius: 1.5, 
        backgroundColor: Colors.PRIMARY,
        elevation: 2,  
        borderRadius: 30,
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginRight: 10,
        marginVertical: 8
    },
    selectedText: {
        color: Colors.WHITE
    },
    text: {
        color: 'black'
    }
});

export default styles;