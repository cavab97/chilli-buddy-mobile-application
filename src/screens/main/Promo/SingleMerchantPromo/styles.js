import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    wrapper: {},
    posterArea: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: "#eaeaea",
        width: windowWidth - 20,
        height: windowHeight - 100,
        resizeMode: "stretch",
        alignSelf: "center"
    },
    poster: {
        width: "100%",
        height: "100%",
        alignSelf: "center"
    },
    floatingShopButton: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:70,
        position: 'absolute',                                          
        bottom: 10,                                                    
        right: 10,
        height:70,
        backgroundColor: '#f18a22',
        borderRadius:100,
    },
    floatingShopButtonTitle: {
            fontSize: 9,
            fontWeight: 'bold',
            color: 'white',
            paddingTop: 4,
            textAlign: 'center',
    },
    subContainer1: {
        flex: 1,
        height: 250,
    },
    // actionDotStyle: {
    //     backgroundColor: '#ffffff',
    //     width: 6,
    //     height: 6,
    //     borderRadius: 7,
    //     marginLeft: 7,
    //     marginRight: 7
    // },
    // dotStyle: {
    //     backgroundColor: '#999999',
    //     width: 6,
    //     height: 6,
    //     borderRadius: 7,
    //     marginLeft: 7,
    //     marginRight: 7
    // },

    imageTopStyle: {
        width: '100%',
        height: "100%"
    },
});

export default styles;