import { Colors } from "../../../../settings/styles/theme";

const styles = {
    listSectionStyle: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginHorizontal: 20,
        paddingVertical: 20,
        borderColor: "#ddd",
        borderBottomWidth: 1,
    },
    innerSectionStyle: {
        alignItems: "center",
    },
    routeSectionStyle: {
        flex: 2,
    },
    rankSectionStyle: {
        flex: 1,
    },
    priceSectionStyle: {
        flex: 1,
    },
    titleRouteStyle: {
        fontSize: 17,
        fontWeight: "bold",
    },
    dateRouteStyle: {
        fontSize: 14,
        color: "#727272",
        fontWeight: "bold",
    },
    titleColumnStyle: {
        fontSize: 12,
        color: "#727272",
        fontWeight: "bold",
    },
    rankTextStyle: {
        fontSize: 20,
        color: Colors.PRIMARY,
        fontWeight: "bold",
        paddingTop: 6,
    },
    priceTextStyle: {
        fontSize: 13,
        color: Colors.PRIMARY,
        fontWeight: "600",
        paddingTop: 6,
        textAlign: "center",
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
        fontFamily: "RobotoRegular",
        color: Colors.WHITE,
        paddingTop: 4,
        textAlign: 'center',
    },
    eventButtonPosition: {
        bottom: 90,
        right: 50
    },
    luckyButtonPosition: {
        bottom: 20,
        right: 50
    },
    rankingContainer: {
        flex:1
    },
    image: {
        flex: 1,
        borderRadius: 60,
        width: null
        //resizeMode: "cover", 
        //width: "100%", 
        //height: null
    },
    ProfileImageStyle: {
        backgroundColor: Colors.GRAY_DARK,
        height: 80,
        width: 80,
        borderRadius: 60,
    },
    scrollBox: {
        flex: 1,
    }
}

export default styles;