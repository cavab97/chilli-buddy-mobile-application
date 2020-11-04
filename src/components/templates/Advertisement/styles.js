import { StyleSheet } from 'react-native';
import { Colors } from '../../../settings/styles/theme';

const styles = StyleSheet.create({
    subContainer1: {
        flex: 1,
        height: 250,
    },
    actionDotStyle: {
        backgroundColor: '#ffffff',
        width: 6,
        height: 6,
        borderRadius: 7,
        marginLeft: 7,
        marginRight: 7
    },
    dotStyle: {
        backgroundColor: '#999999',
        width: 6,
        height: 6,
        borderRadius: 7,
        marginLeft: 7,
        marginRight: 7
    },
    paginationStyle: {
        bottom: 20
    },
    imageTopStyle: {
        width: '100%',
        height: "100%"
    },
    //-------------------------------
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 15,
        fontFamily: "RobotoRegular",
    },
    sectionTitle: {
        fontSize: 18,
        marginBottom: 13,
        fontFamily: "RobotoRegular",
    },
    subContainer2: {
        flex: 1,
        paddingLeft: 22,
        paddingRight: 22,
        marginTop: 10,
        marginBottom: 5,
    },
    content: {
        fontSize: 18,
        textAlign: 'justify'
    },
    subTitle: {
        fontSize: 18,
        marginTop: 15,
        fontWeight: 'bold',
        fontFamily: "RobotoRegular",
    },
    subContent: {
        fontSize: 18,
        marginTop: 10,
        marginBottom: 20,
        textAlign: 'justify',
        fontFamily: "RobotoRegular",
    },
    iconText: {
        paddingLeft: 10, 
        fontSize: 16, 
        alignSelf: 'center',
        fontFamily: "RobotoRegular",
    }
});

export default styles;