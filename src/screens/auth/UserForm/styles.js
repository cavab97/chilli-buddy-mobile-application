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
    height: 114,
    width: 114,
    borderRadius: 60,
    //borderRadius: 150,  uncomment this at profile picture
  },
  ProfileContatiner: {
    justifyContent: "center",
    height: 186,
    alignItems: "center",
  },
  image: {
    flex: 1,
    borderRadius: 60,
    //borderRadius: 150, uncomment this at profile picture
    width: null,
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
    position: "absolute",
    top: 120,
    right: 140,
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
    fontWeight: "bold",
    color: "#A2A2A2",
  },
  infoDetailStyle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 6,
  },
  inputTextStyle: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 0,
    paddingTop: 0,
    //paddingVertical: 5,
    borderBottomColor: "#D1D1D1",
    borderBottomWidth: 1,
    backgroundColor: "white",
  },
  inputErrorTextStyle: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
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
    fontWeight: "bold",
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
    width: "100%",
    //height: 35,
    marginTop: 10,
    backgroundColor: "#fff",
    borderColor: "#707070",
    justifyContent: "flex-end",
    //marginRight: 0,
    //paddingLeft: 10,
    flex: 2,
  },
  buttonTextStyle: {
    color: "#CCCCCC",
  },
  saveContainerStyle: {
    alignSelf: "center",
    //marginTop: 20,
    backgroundColor: Colors.PRIMARY,
    marginBottom: 30,
  },
  saveTextStyle: {
    color: Colors.WHITE,
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
});

export default styles;
