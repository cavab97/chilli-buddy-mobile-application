import { Colors } from "../../../../settings/styles/theme";

const styles = {
    container: {
        flex: 1,
        padding: 20
    },
    overlayImage: {
        width: '100%', 
        height: 500,
    },
    image: {
        width: null,
        flex: 1,
        borderRadius: 5,
    },
    button: {
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        backgroundColor: 'white',
        marginVertical: 10,
    },
    buttonText: {
        color: Colors.PRIMARY,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    completeButton: {
        backgroundColor: Colors.PRIMARY,
    },
    completeButtonText: {
        color: 'white',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    overlayContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.PRIMARY,
        flex: 1,
        borderRadius: 5
    },
    percentText: { 
        fontSize: 18,
        color: 'white',
        fontFamily: "RobotoRegular",
    },
    messageText: { 
        fontSize: 16,
        color: 'white',
        paddingTop: 20,
        marginHorizontal: 20,
        textAlign: 'center',
        fontFamily: "RobotoRegular",
    },
    subjectText: { 
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        paddingTop: 20,
        marginHorizontal: 20,
        textAlign: 'center',
        fontFamily: "RobotoRegular",
    },
    modalContainer: {
        padding: 25,
        flex: 1,
        position: 'absolute',
        width: "100%",
        borderTopLeftRadius: 35, 
        borderTopRightRadius: 35, 
        bottom: 0
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    }
}

export default styles;