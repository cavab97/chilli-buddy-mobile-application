import { Colors } from "../../../settings/styles/theme";


const styles = {
    container: {
        flex: 1,
        display: 'flex',
        paddingHorizontal: 20
    },
    image: {
        width: 60, 
        height: 60,
    },
    imageFrame: {
        flex: 1,
        width: 60, 
        height: 60,
        borderRadius: 60,
    },
    line: {
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: Colors.GRAY_LIGHTER,
        width: '100%',
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: 'center'
    },
    rank: {
        color: Colors.PRIMARY,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right'
    },
    imageContainer: {
        paddingHorizontal: 10
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingBottom: 3,
        width: "100%",
        maxWidth : 120
    },
    totalNumber: {
        color: Colors.PRIMARY,
        fontFamily: "RobotoBold",
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'right',
        width: "100%",
        maxWidth : 80
    },
    container: {
        flex: 1,
        display: 'flex',
        paddingHorizontal: 20,
    },
    modalContainer: {
        padding: 25,
        flex: 1,
        position: 'absolute',
        width: "100%",
        borderTopLeftRadius: 35, 
        borderTopRightRadius: 35, 
        bottom: 0,
    },
    screenContainer: {
        flex: 1,
        display: 'flex',
        width: "100%",
        height: "100%"
    },
    imageBackgroundStyle: {
        resizeMode: "contain",
        height: "100%",
        width: "100%"
    },
}

export default styles;
