import { StyleSheet, Platform, Dimensions } from "react-native";
import { Colors } from "../../../settings/styles/theme";
const windowWidth = Dimensions.get("window").width;
const screenWidth = Dimensions.get("screen").width;

const windowHeight = Dimensions.get("window").height;
const inch = windowHeight / windowWidth;
const styles = StyleSheet.create({
  modelBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "blue",
  },
  holderPng: {
    // height: "",
    // aspectRatio: 50 / 100,
    width: Platform.isPad ? windowWidth / 4.5 : 95,
    height: Platform.isPad ? windowWidth / 4.5 : 95,
    // position: "absolute",
    // marginBottom: 1000,
    // resizeMode: "cover",
    alignSelf: "center",
    // bottom: 30,
    // bottom: windowWidth / 3,
    // backgroundColor: "red",
  },

  // holderContainer: {
  //   backgroundColor: "red",
  //   // width: Platform.OS === "ios" && Platform.isPad === true ? 450 : 220,
  //   // borderRadius: 10,
  //   // height: Platform.isPad ? 70 : 50,
  //   // marginRight: "auto",
  //   // marginLeft: "auto",
  //   // borderWidth: 1,
  //   // borderColor: "#FFFFFF",
  //   // padding: Platform.isPad ? 0 : 0,
  //   marginTop: -50,
  // },
  //spinning wheel pop up container
  containerForSpinningWheel: {
    // backgroundColor: "#FFF",
    borderRadius: 10,
    minWidth: Platform.OS === "ios" && Platform.isPad === true ? 460 : 300,
    height: Platform.OS === "ios" && Platform.isPad === true ? 950 : 400,
    paddingTop: 30,
  },
  //spinning wheel image
  spinningWheelImage: {
    alignItems: "center",
    // paddingBottom: 15,
    justifyContent: "center",
    paddingTop: 0,
    marginTop: 0,
  },
  //spinning wheel modal title
  spinningTitle: {
    fontSize: Platform.OS === "ios" && Platform.isPad === true ? 36 : 18,
    paddingBottom: Platform.OS === "ios" && Platform.isPad === true ? 20 : 5,
    // marginTop: "13%",
    fontFamily: "HorizontalRounded",
    color: Colors.WHITE,
  },

  //spinning wheel next modal title
  spinningTitle2: {
    fontSize: Platform.OS === "ios" && Platform.isPad === true ? 29 : 30,
    paddingBottom: Platform.OS === "ios" && Platform.isPad === true ? 20 : 5,
    // marginTop: "13%",
    fontFamily: "HorizontalRounded",
    color: Colors.RED,
    flexDirection: "row",
  },
  //sub Title
  subTitle: {
    fontSize: Platform.OS === "ios" && Platform.isPad === true ? 36 : 15,
    paddingBottom: Platform.OS === "ios" && Platform.isPad === true ? 20 : 5,
    // marginTop: 5,
    fontFamily: "HorizontalRounded",
    color: "black",
    // textAlign: "left ",
    // alignItems: "stretch",
  },

  //sub Title2
  subTitle2: {
    fontSize: Platform.OS === "ios" && Platform.isPad === true ? 36 : 15,
    // paddingBottom: Platform.OS === "ios" && Platform.isPad === true ? 20 : 5,
    // marginTop: 5,
    fontFamily: "HorizontalRounded",
    color: "black",
    paddingTop: 5,
    // textAlign: "left ",
  },
  mainTitleContain: {
    alignItems: "flex-start",
    paddingTop: 20,
    backgroundColor: "#FFF",
    width: "100%",
    // marginHorizontal: 60,
    paddingHorizontal: 20,
  },
  //category text holder
  categoryTextHolder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",

    // backgroundColor: "red",
  },
  //category Text
  categoryText: {
    fontSize: Platform.OS === "ios" && Platform.isPad === true ? 23 : 19,
    color: "#ffffff",
    fontFamily: "HorizontalRounded",
    marginVertical: 16,
    textAlign: "center",
  },
  //random category text
  buttonText: {
    fontSize: Platform.OS === "ios" && Platform.isPad === true ? 23 : 25,
    color: Colors.RED,
    marginVertical: Platform.OS === "ios" && Platform.isPad === true ? 20 : 0,
    textAlign: "center",
    fontFamily: "HorizontalRounded",
  },
  //random Category button
  categoriesButton: {
    // backgroundColor: "#FFF",
    width: Platform.OS === "ios" && Platform.isPad === true ? 450 : 220,
    borderRadius: 10,
    height: Platform.isPad ? 70 : 50,
    marginRight: "auto",
    marginLeft: "auto",
    // paddingTop: 20,
    // borderWidth: 1,
    // borderColor: "#FFFFFF",
    padding: Platform.isPad ? 0 : 0,
  },
  //close spinning wheel modal
  closeWheelModal: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  //start and spin again contain
  buttonContain: {
    // marginTop: 35,
    paddingTop: 0,
    height: 200,
    marginBottom: 0,
    // backgroundColor: "red",
    justifyContent: "space-between",
    flex: 1,
    bottom: Platform.isPad
      ? screenWidth / 2
      : Platform.OS === "ios"
      ? screenWidth <= 375
        ? screenWidth / 3
        : screenWidth / 5
      : screenWidth <= 375
      ? screenWidth / 3
      : screenWidth / 3,
  },
  wheelIcon: {
    width: windowWidth / 5.5,
    height: windowWidth / 5.5,
    // color: "white",
    // backgroundColor: "white",
  },
  wheelIconV2: {
    width: windowWidth / 7,
    height: windowWidth / 7,
  },
});
export default styles;
