import { Colors } from "../../../../settings/styles/theme";

const styles = {
    container: {
        //flex: 1,
        //display: 'flex',
        //flexDirection: 'column',
        marginHorizontal: 25,
        paddingVertical: 5,
    },
    card: {
        padding: 20,
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: '#000',
        borderBottomWidth: 2,
        elevation: 0,
        shadowColor: "transparent",
        borderRadius: 10
    },
    rowOne: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    areaName: {
        fontWeight: 'bold',
        fontFamily: "RobotoRegular",
        color: Colors.PRIMARY,
        fontSize: 24,
    },
    line: {
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
        width: '100%'
    },
    rowTwo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 5
    },
    subContainer: {
        flexDirection: 'row',
    },
    icon: {
        paddingTop: 5,
        paddingRight: 5
    }
};

export default styles;