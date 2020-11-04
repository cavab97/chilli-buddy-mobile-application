import { Colors } from "../../../../settings/styles/theme";

//console.log(screenWidth)
const styles = {
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
    },
    cameraPreviewContainer: {
        flex: 1,
    },
    cameraContainer: {
        flex: 1, 
        flexDirection: "row", 
        justifyContent: "center",
        margin: 30,
    },
    // reverseCameraContainer: {
    //     flex: 1, 
    //     flexDirection: "row", 
    //     justifyContent: "flex-end",
    //     margin: 30
    // },
    iconContainer: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    rotateIconContainer: {
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        marginLeft:30,
        backgroundColor: 'transparent',
    },
    textFontFamily: {
        fontFamily: "RobotoRegular"
    }
};

export default styles;