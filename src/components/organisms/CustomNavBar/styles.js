import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Colors, Mixins } from "../../../settings/styles/theme";

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight, 
        height: Platform.OS === 'ios' ? 44 : 34,
        flex: 1,
        alignItems:'flex-start',
        flexDirection: 'row',
        paddingTop: 10,
        marginHorizontal: 15,
        justifyContent: 'space-between',
    },
    buttonContainer: { 
        flexDirection: 'row', 
        alignItems: 'flex-end'
    },
    button: {
        shadowColor: Colors.GREY, 
        shadowOffset: { 
            height: 1, 
            width: 0 
        }, 
        shadowOpacity: 0.4,
        shadowRadius: 1.5, 
        backgroundColor: Colors.WHITE,
        elevation: 3,  
        borderRadius: 30,
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginLeft: 10
    },
    text: { 
        fontSize: 12, 
        fontFamily: 'HorizontalRounded' 
    }
});

export default styles;