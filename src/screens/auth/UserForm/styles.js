import { StyleSheet, Platform } from "react-native";
import {
  padding,
  Colors,
  fontSize,
  fontFamily,
  windowWidth,
  normalize,
} from "../../../settings/styles/theme";

const styles = StyleSheet.create({
  container: {
    //height: 754,
  },
  ProfileImageStyle: {
    backgroundColor: Colors.GRAY_DARK, //delete this at profile picture
    height: 100,
    width: 100,
    borderRadius: 60,
    //borderRadius: 150,  uncomment this at profile picture
  },
  ProfileContatiner: {
    // justifyContent: "center",
    height: 120,
    // alignItems: "center",
    // backgroundColor: "red",
    paddingHorizontal: 20,
  },
  image: {
    flex: 1,
    borderRadius: 60,
    //borderRadius: 150, uncomment this at profile picture
    width: null,
    resizeMode: "cover",

    //resizeMode: "cover", uncomment this line need cover
  },
  BodyContatiner: {
    //height: 800,
    paddingHorizontal: 10,
  },
  UploadImageButton: {
    backgroundColor: Colors.WHITE,
    height: 34,
    width: 34,
    borderRadius: 60,
    // position: "absolute",
    // top: 120,
    // right: 140,
    left: 70,
    bottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  infoDetailSection: {
    // paddingTop: 10,
    paddingBottom: 25,
    marginHorizontal: 20,
    borderBottomColor: "#D1D1D1",
    justifyContent: "center",
  },
  addressDetailSection: {
    paddingTop: 20,
    paddingBottom: 10,
    marginHorizontal: 20,
    justifyContent: "center",
  },
  infoTitleStyle: {
    fontSize: 13,
    // fontWeight: "bold",
    color: "#A2A2A2",
    // backgroundColor: "grey",
    fontFamily: "HorizontalRounded",
  },
  infoDetailStyle: {
    fontSize: 18,
    // fontWeight: "bold",
    paddingTop: 6,
    fontFamily: "HorizontalRounded",
  },
  inputTextStyle: {
    color: "#000",
    fontSize: 18,
    // fontWeight: "bold",
    paddingLeft: 0,
    paddingTop: 0,
    //paddingVertical: 5,
    borderBottomColor: "#D1D1D1",
    borderBottomWidth: 1,
    backgroundColor: "white",
    fontFamily: "HorizontalRounded",
  },
  inputErrorTextStyle: {
    color: "#000",
    fontSize: 18,
    // fontWeight: "bold",
    fontFamily: "HorizontalRounded",

    paddingLeft: 0,
    paddingTop: 0,
    //paddingVertical: 5,
    borderBottomColor: Colors.WARNING,
    borderBottomWidth: 1,
    backgroundColor: "white",
  },
  addressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    //paddingLeft: 20,
    //flex: 'row',
  },
  fixContainer: {
    flex: 1,
  },
  countryStyle: {
    color: "#000",
    fontSize: 18,
    // fontWeight: "bold",
    fontFamily: "HorizontalRounded",
    marginTop: 20,
    marginLeft: 10,
    paddingBottom: 13,
    borderBottomColor: "#D1D1D1",
    borderBottomWidth: 1,
    backgroundColor: "white",
  },
  buttonContainerStyle: {
    width: "100%",
    //height: 35,
    //marginTop: 5,
    backgroundColor: "#fff",
    borderColor: "#707070",
    justifyContent: "flex-end",
    //marginRight: 0,
    paddingLeft: 10,
    flex: 2,
  },
  genderButtonContainerStyle: {
    width: 130,
    height: 35,
    // marginTop: 10,
    // backgroundColor: "#fff",
    borderColor: "#707070",
    borderRadius: 50,
    borderWidth: 1,
    // justifyContent: "flex-end",
    marginLeft: 15,
    // fontFamily: "HorizontalRounded",

    //paddingLeft: 10,
    // backgroundColor: "yellow",
  },
  buttonTextStyle: {
    color: "#CCCCCC",
  },
  saveContainerStyle: {
    alignSelf: "center",
    height: 30,
    //marginTop: 20,
    width: 180,
    backgroundColor: "#FFF",
    marginBottom: 30,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    // backgroundColor: "red",
  },
  saveTextStyle: {
    color: Colors.RED,
    fontFamily: "HorizontalRounded",
    fontSize: 15,
  },

  containerOverlay: {
    //flex: 1,
    padding: 40,
    flexDirection: "column",
    justifyContent: "center",
    //alignItems: 'center'
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  percentText: {
    fontSize: 18,
    color: "white",
  },
  messageText: {
    fontSize: 16,
    color: "white",
    paddingTop: 20,
    marginHorizontal: 20,
    textAlign: "center",
  },
  subjectText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    paddingTop: 20,
    marginHorizontal: 20,
    textAlign: "center",
  },
  topTextContainer: {
    // backgroundColor: "black",
    marginHorizontal: 20,
    paddingBottom: 15,
  },
  topText: {
    color: Colors.RED,
    fontSize: 30,
    paddingBottom: 10,
    paddingTop: 15,
    fontFamily: "HorizontalRounded",
  },
  infoDetailGenderSection: {
    // paddingTop: 10,
    paddingBottom: 25,
    marginHorizontal: 20,
    borderBottomColor: "#D1D1D1",
    // justifyContent: "space-between",
    flexDirection: "row",
    // backgroundColor: "blue",
    flex: 1,
  },
  infoTitleGenderStyle: {
    fontSize: 13,
    // fontWeight: "bold",
    color: "#A2A2A2",
    fontFamily: "HorizontalRounded",
    // backgroundColor: "grey",
    paddingTop: 10,
  },
  touchableStyle: {
    borderWidth: 0,
  },
  topSubText: {
    fontFamily: "HorizontalRounded",
    fontSize: 15,
  },
  cameraIcon: {
    width: 50,
    height: 50,
  },
});

export default styles;
