import { Dimensions } from "react-native";
import { StyleSheet, Platform } from "react-native";

const numColumns = 5;

const size = Dimensions.get("window").width / numColumns;
const size1w = Dimensions.get("window").width * 0.4;
const size1h = Dimensions.get("window").width * 0.43;

const widthDimensions = Dimensions.get("window").width;
const heightDimensions = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    marginTop: 10,
    marginHorizontal: 15,
    paddingVertical: 5,
  },
  viewPanel: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  itemContainer: {
    width: size,
    height: size / 4,
    borderRadius: 30,
    borderWidth: 0,
    paddingLeft: 0,
    paddingBottom: Platform.OS === "ios" ? size / 0.9 : Platform.isPad ? size / 0.95 : size / 0.85,
  },
  itemContainer2: {
    width: size1w,
    height: size1h,
    borderWidth: 0,
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: Platform.OS === "ios" ? size / 0.9 : Platform.isPad ? size / 0.95 : size / 0.85,
  },

  checkinButton: {
    width: "50%",
  },
  buttonStyles: {
    alignSelf: "center",
    padding: Platform.OS === "ios" ? 20 : 20,
    marginBottom: Platform.OS === "ios" ? 30 : 30,
    // position: "absolute",
    // bottom: -130,
  },
  logoImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    bottom: 0,
    position: "relative",
  },
  logoImageBig: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    bottom: 40,
    position: "relative",
  },
  CheckinContainer: {
    flex: 1,
    borderWidth: 0,
    justifyContent: "center",
    paddingTop: 10,
  },
  //text
  textContainer: {
    color: "red",
    backgroundColor: "red",
    resizeMode: "contain",
    justifyContent: "center",
    flex: 1,
  },
  checkInBox: {
    backgroundColor: "#303030",
    borderRadius: 10,
    borderWidth: 0,
    borderColor: "white",
    width: "95%",
    height: size,
  },
  Checked24: {
    backgroundColor: "grey",
    borderRadius: 10,
    borderWidth: 0,
    borderColor: "white",
    width: "95%",
    height: size,
  },
  checkInBoxWhite: {
    backgroundColor: "white",
    width: "100%",
    height: "80%",
    justifyContent: "center",
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    borderWidth: 5,
    top: size / 19,
  },
  checkInBoxWhite24: {
    backgroundColor: "grey",
    width: "100%",
    height: "80%",
    justifyContent: "center",
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    borderWidth: 5,
    top: size / 20,
  },
  touchContainer: {
    borderRadius: 15,
    position: "absolute",
    bottom: 0,
  },
  Days: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    fontFamily: "HorizontalRounded",
  },

  ///days 7
  touchContainer2: {
    width: size1w - 15,
    height: size1h + 2,
    position: "absolute",
    bottom: 0,
  },

  checkInBox2: {
    backgroundColor: "#303030",
    borderRadius: 10,
    borderColor: "white",
    width: "80%",
    height: "85%",
  },
  checkInBox224: {
    backgroundColor: "grey",
    borderRadius: 10,
    borderColor: "white",
    width: "80%",
    height: "85%",
  },
  checkInBoxRed: {
    backgroundColor: "#D81212",
    borderRadius: 10,
    borderColor: "white",
    width: "80%",
    height: Platform.OS === "ios" ? "85%" : Platform.isPad ? "95%" : "90%",
    top: Platform.OS === "ios" ? 0 : Platform.isPad ? 10 : -10,
  },
  checkInBoxWhite2: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    top: 0,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    borderWidth: 5,
    top: size / 19,
  },
  checkInBoxWhite224: {
    backgroundColor: "grey",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    top: 0,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    borderWidth: 5,
    top: size / 19,
  },
  checkInBoxWhite2Red: {
    backgroundColor: "white",
    width: "100%",
    height: Platform.isPad ? "89%" : "100%",
    justifyContent: "center",
    top: 0,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    borderWidth: 5,
    borderColor: "#D81212",
    top: Platform.isPad ? size / 10 : size / 19,
  },

  ///large box
  redeemImageStyle: {
    width: "55%",
    height: "55%",
    left: size / 3.5,
    resizeMode: "contain",
  },
  redeemImageQuestionStyle: {
    width: "55%",
    height: "55%",
    left: size / 3.5,
    justifyContent: "center",
    resizeMode: "contain",
  },

  //title text
  checkInTitle: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#D81212",
    fontFamily: "HorizontalRounded",

    // fontFamily: "Cochin",
  },
  checkInSubTitle: {
    fontSize: 17,
    marginTop: 10,
    fontFamily: "HorizontalRounded",
  },
  checkInSubRefreshing: {
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 15,
    color: "grey",
    fontFamily: "HorizontalRounded",
  },
  CheckInTextContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
  },

  /// small container star
  smallRedeemImageStarStyle: {
    width: "50%",
    height: "50%",
    left: size / 4.5,
    resizeMode: "contain",
    top: Platform.isPad ? size / 3 : 34,
    position: "absolute",
  },
});

export default styles;
