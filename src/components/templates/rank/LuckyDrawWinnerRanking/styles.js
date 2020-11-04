import { Colors } from "../../../../settings/styles/theme";

const styles = {
    container: {
        flex: 1,
        display: 'flex',
        paddingHorizontal: 20
    },
    row: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 15,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 3,
        fontFamily: "RobotoRegular",
    },
    prize: {
        color: Colors.PRIMARY,
        fontFamily: "RobotoRegular",
    },
    indexSelected: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right'
    },
    index: {
        color: Colors.PRIMARY,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
        fontFamily: "RobotoRegular",
    },
    subtitle: {
        fontSize: 14,
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
        width: 60, 
        height: 60,
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
        flex: 1
    },
    index: {
        color: Colors.PRIMARY,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right'
    },
    messageContainer: {
        paddingVertical: 15,
        paddingHorizontal: 5,
        backgroundColor: Colors.GRAY_LIGHTEST
    },
    textColor: {
        color: Colors.PRIMARY,
        fontWeight: 'bold'
    }
}

export default styles;