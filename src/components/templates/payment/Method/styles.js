import { Colors } from "../../../../settings/styles/theme";

const styles = {
    container: {
        flex: 1,
        padding: 20
    },
    card: {
        padding: 20
    },
    mainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    value: {
        color: Colors.PRIMARY,
        fontSize: 24,
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 5,
        fontFamily: "RobotoRegular"
    },
    line: {
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: Colors.GRAY_LIGHTER,
        width: '100%'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 15
    },
    seperator: {
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: Colors.GRAY_LIGHTER,
        width: 1,
        height: '100%',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingTop: 30,
        paddingBottom: 15,
        fontFamily: "RobotoRegular"
    },
    button: {
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        backgroundColor: 'white'
    },
    buttonText: {
        color: Colors.PRIMARY,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    buttonDisabled: {
        backgroundColor: 'white',
        marginBottom: 10,
    },
    textFontFamaily: {
        fontFamily: "RobotoRegular"
    }
};

export default styles;