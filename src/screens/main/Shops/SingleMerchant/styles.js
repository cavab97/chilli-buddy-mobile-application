import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#9DD6EB"
    },
    slide2: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#97CAE5"
    },
    slide3: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#92BBD9"
    },
    text: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold"
    },
    posterArea: {
        borderWidth: 1,
        borderColor: "#eaeaea",
        width: "100%",
        height: 200,
        resizeMode: "stretch",
        alignSelf: "center"
    },
    poster: {
        width: "100%",
        height: "100%",
        alignSelf: "center"
    },
    logoPosition: {
        width: 70,
        height: 70,
        alignSelf: "center",
        position: "absolute",
        top: -40
    },
    logo: {
        width: "100%",
        height: "100%",
        borderRadius: 35
    },
    detailArea: {
        width: "100%",
        height: "100%",
        // padding: "5%",
        paddingLeft: '5%',
        //paddingRight: '5%',
        paddingTop: '5%',
        marginTop: -40,
        alignSelf: "center",
        backgroundColor: "white"
    },
    title: {
        fontSize: 25,
        fontWeight: "700",
        fontFamily: "RobotoRegular",
        marginBottom: 10,
        marginTop: 10
    },
    subTitle: {
        fontSize: 18,
        fontWeight: "600",
        fontFamily: "RobotoRegular",
        marginTop: 30
    },
    detail: {
        fontSize: 18,
        marginTop: 15,
        flexDirection: "row"
    },
    subIconDetail: {
        margin: 3
    },
    subIconDetailMain: {
        width: 30,
        marginTop: 15,
    },
    setRow:{
        flexDirection: 'row',
    },
    operatingHour: {},
    operatingContainer: { 
        flexDirection: "row", 
        alignItems: "center" 
    }
});

export default styles;