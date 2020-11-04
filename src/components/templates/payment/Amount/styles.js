import { Colors } from "../../../../settings/styles/theme";

const styles = {
    container: {
        flex: 1
    },
    overlayContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.PRIMARY,
        paddingHorizontal: 30,
        flex: 1
    },
    payContainer: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 25,
        borderRadius: 40,
    },
    payTitle: {
        color: Colors.PRIMARY,
        fontFamily: "RobotoRegular",
        fontSize: 24,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    descriptionTitle: {
        fontFamily: "RobotoRegular",
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        paddingTop: 30,
        paddingBottom: 10
    },
    minimumSpend: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 30,
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    amountInput: {
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    inputContainer: {
        width: '100%'
    },
    button: {
        backgroundColor: 'white',
        paddingVertical: 15
    },
    buttonText: {
        color: Colors.PRIMARY,
        fontWeight: 'bold',
        fontSize: 14,
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 30
    },
    amount: {
        fontWeight: 'bold',
        fontFamily: "RobotoRegular",
    }
};

export default styles;