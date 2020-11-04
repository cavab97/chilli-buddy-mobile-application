import { Colors } from "../../../../settings/styles/theme";

const styles = {
    container: {
        //flex: 1,
        display: 'flex',
        marginHorizontal: 20,
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
    },
    rowZero: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowOne: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10
    },
    areaName: {
        fontWeight: 'bold',
        color: Colors.PRIMARY,
        fontFamily: "RobotoRegular",
        fontSize: 18,
    },
    routeNumber: {
        fontSize: 28,
        maxWidth: 250,
        fontFamily: "RobotoRegular",
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
    },
    textColor: {
        color: Colors.PRIMARY,
        fontWeight: 'bold',
        fontFamily: "RobotoRegular",
    },
    rowThree: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 5
    },
    subContainerIcon: {
        flexDirection: 'row',
        position: 'absolute',
        right: 0
    },
};

export default styles;