import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";

const numColumns = 5;

const size = Dimensions.get("window").width / numColumns;
const size1w = Dimensions.get("window").width * 0.4;
const size1h = Dimensions.get("window").width * 0.43;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    marginTop: 10,
    marginHorizontal: 15,
    paddingVertical: 5
  },
  viewPanel: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  itemContainer: {
    width: size,
    height: size,
    borderRadius: 30,
    borderWidth: 0,
    paddingLeft: 0,
    paddingBottom: size * 1.1,
  },
  itemContainer2: {
    width: size1w,
    height: size1h,
    borderWidth: 0,
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: size * 1.1,
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
  },
  checkInBoxWhite24: {
    backgroundColor: "grey",
    width: "100%",
    height: "80%",
    justifyContent: "center",
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    borderWidth: 5,
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
    fontFamily: "HorizontalRounded"
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
    height: "85%",
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
  },
  checkInBoxWhite2Red: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    top: 0,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    borderWidth: 5,
    borderColor: "#D81212",
  },

  ///large box
  redeemImageStyle: {
    width: "55%",
    height: "55%",
    left: 20,
    resizeMode: "contain",
  },
  redeemImageQuestionStyle: {
    width: "55%",
    height: "55%",
    left: 20,
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
    left: 18,
    resizeMode: "contain",
    top: 28,
    position: "absolute",
  },
});

export default styles;
