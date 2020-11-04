import { Colors } from "../../../../settings/styles/theme";

const styles = {
    cardContainer: {
        width: "95%",
        paddingHorizontal: 10,
        paddingBottom: 5
    },
    titleFont: {
        fontSize: 24,
        color: Colors.PRIMARY,
        width: "80%",
        fontFamily: "RobotoRegular",
    },
    cardSectionStyle: {
        borderBottomWidth: 0,
    },
    timeCountStyle: {
        fontSize: 12,
        fontFamily: "RobotoRegular",
        color: Colors.GRAY_DARK,
        alignSelf: "flex-end",
        paddingBottom: 3,
        flex: 1
    },
    descriptionStyle: {
        fontSize: 10,
        opacity: 0.59,
        flex: 5,
        fontFamily: "RobotoRegular",
    },
    descripCardSectionStyle: {
        justifyContent: "space-between",
        paddingLeft: 10,
        paddingRight: 10,
    },
    titleCardSectionStyle: {
        justifyContent: "space-between",
    },
    buttonCardSectionStyle: {
        justifyContent: "flex-end",
    },
    iconStyle: {
        flex: 1,
        paddingLeft: 20,
    },
    scrollBox: {
        flex: 1,
    }
}

export default styles;