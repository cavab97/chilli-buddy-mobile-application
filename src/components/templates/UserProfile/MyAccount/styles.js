import { Colors } from "../../../../settings/styles/theme";

const styles = {
    accountContainer: {
        flex: 1,
        paddingTop: 20,
    },
    accountMoreContainer: {
        flex: 1,
        paddingLeft: 15,
    },
    moreTextStyle: {
        fontSize: 16,
        fontFamily: "HorizontalRounded",
        color: Colors.GRAY_DARK,
    },
    listButtonStyle: {
        flexDirection: "row",
        paddingHorizontal: 30,
        paddingVertical: 20,
        justifyContent: "space-between",
    },
    listTitle: {
        fontSize: 17,
        fontFamily: "HorizontalRounded",
    },
    versionTextStyle: {
        fontSize: 18,
        color: Colors.PRIMARY,
        fontWeight: "bold",
        fontFamily: "HorizontalRounded",
    },
    signoutButtonStyle: {
        //alignSelf: "left",
        paddingVertical: 35,
        paddingHorizontal: 30,
        // marginBottom: Platform.OS === 'ios' ? 30 : 30,
        // position: "absolute",
        // bottom: -130,
    },
}

export default styles;