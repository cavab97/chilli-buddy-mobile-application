import { Colors } from "../../../settings/styles";

const styles = {
    container: {
        flex: 1
    },
    cameraContainer: {
        flex: 1, 
        flexDirection: "column", 
        justifyContent: "flex-end",
        margin: 30
    },
    iconContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    image: {
        flex: 1,
        borderRadius: 5,
        width: null
        //resizeMode: "cover", 
        //width: "100%", 
        //height: null
    },
    imageContainer: {
        flex: 1,
        height: 200,
        paddingTop: 5,
    },
    overlayImage: {
        width: '100%', 
        height: 450,
    },
    imageOverlay: {
        width: null,
        flex: 1,
        borderRadius: 5,
    },
    containerOverlay: {
        //flex: 1,
        padding: 40,
        flexDirection: 'column',
        justifyContent: 'center',
        //alignItems: 'center'
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
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    percentText: { 
        fontSize: 18,
        color: 'white'
    },
    messageText: { 
        fontSize: 16,
        color: 'white',
        paddingTop: 20,
        marginHorizontal: 20,
        textAlign: 'center'
    },
    subjectText: { 
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        paddingTop: 20,
        marginHorizontal: 20,
        textAlign: 'center'
    },
    imagePickerIcon: {
        position: 'absolute', 
        right: 0, 
        bottom: 3
    }
};

export default styles;