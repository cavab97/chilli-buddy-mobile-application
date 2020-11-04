import { Colors } from "../../../../settings/styles/theme";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");


const styles = {
    container: {
        flex: 1,
        //paddingHorizontal: 20
    },
    row: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 15,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingBottom: 3,
        fontFamily: "RobotoRegular",
    },
    index: {
        color: Colors.PRIMARY,
        fontSize: 16,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 14,
        fontFamily: "RobotoRegular",
        textTransform: 'capitalize',
        textAlign: 'right',
        paddingBottom: 3
    },
    image: {
        width: 60, 
        height: 60,
    },
    imageFrame: {
        flex: 1,
        borderRadius: 60,
    },
    currencyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageContainer: {
        paddingHorizontal: 10
    },
    line: {
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: Colors.GRAY_LIGHTER,
        width: '100%',
        justifyContent: 'center'
    },
    titleContainer: {
        flex: 1,
    },
    index: {
        color: Colors.PRIMARY,
        fontFamily: "RobotoRegular",
        fontSize: 16,
        fontWeight: 'bold',
    },
    iconActiveButtonContainer: {
        borderRadius: 50,
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderColor: Colors.GRAY,
        backgroundColor: Colors.WHITE,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    iconButtonContainer: {
        borderRadius: 50,
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 5,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        position: "absolute",
        bottom: 50,
        right: 50
    },
    iconActiveText: {
        color: Colors.GRAY,
        fontSize: 12,
    },
    iconText: {
        color: 'white',
        fontSize: 12,
    },
    eventButtonStyle: {
        width: 52,
        height: 52,
        position: 'absolute',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        shadowColor: Colors.BLACK,
        shadowOpacity: 0.16,
    },
    eventTextStyle: {
        fontSize: 9,
        fontWeight: 'bold',
        color: Colors.WHITE,
        paddingTop: 4,
        textAlign: 'center',
        fontFamily: "RobotoRegular",
    },
    eventButtonPosition: {
        bottom: 120,
        right: 30
    },
    luckyButtonPosition: {
        bottom: 50,
        right: 30
    },
    flatListStyle: {
        width:width,
        paddingLeft: 20,
        paddingRight: 20
    },
    loadingStyle: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    textFontFamily: {
        fontFamily: "RobotoRegular",
    }
}

export default styles;