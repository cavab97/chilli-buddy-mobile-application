import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";

const numColumns = 5;

const size = Dimensions.get("window").width / numColumns;
const size1w = Dimensions.get("window").width * 0.4;
const size1h = Dimensions.get("window").width * 0.39;

const styles = StyleSheet.create({
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
    paddingTop: 5,
  },
  itemContainer2: {
    width: size1w,
    height: size1h,
    borderWidth: 0,
    paddingLeft: 0,
    paddingTop: 5,
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
    backgroundColor: "black",
    borderRadius: 17,
    borderWidth: 0,
    borderColor: "white",
    width: "90%",
    height: "100%",
  },
  checkInBoxWhite: {
    backgroundColor: "white",
    width: "90%",
    height: "65%",
    justifyContent: "center",
    top: 1,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    borderTopRightRadius: 0,
    marginLeft: "5%",
    borderWidth: 0,
  },
  touchContainer: {
    borderRadius: 15,
  },
  Days: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    paddingTop: 4,
    textAlign: "center",
  },

  ///days 7
  touchContainer2: {
    width: size1w - 15,
    height: size1h,
    position: "absolute",
    bottom: 0,
  },

  checkInBox2: {
    backgroundColor: "black",
    borderRadius: 17,
    borderWidth: 0,
    borderColor: "white",
    width: "90%",
    height: "100%",
  },
  checkInBox21: {
    backgroundColor: "red",
    borderRadius: 17,
    borderWidth: 0,
    borderColor: "white",
    width: "90%",
    height: "100%",
  },
  checkInBoxWhite2: {
    backgroundColor: "white",
    width: "95%",
    height: "75%",
    justifyContent: "center",
    top: 13,
    marginLeft: "2.5%",
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    borderTopRightRadius: 0,
    borderWidth: 0,
  },

  ///large box
  redeemImageStyle: {
    width: "55%",
    height: "55%",
    left: 30,
    resizeMode: "contain",
  },
  redeemImageQuestionStyle: {
    width: "55%",
    height: "55%",
    left: 25,
    justifyContent: "center",
    resizeMode: "contain",
  },

  //title text
  checkInTitle: {
    fontSize: 40,
    fontWeight: "bold",
    color: "red",
    // fontFamily: "Cochin",
  },
  checkInSubTitle: {
    fontSize: 17,
  },
  checkInSubRefreshing: {
    paddingTop: 10,
    fontSize: 15,
    color: "grey",
  },
  CheckInTextContainer: {
    paddingLeft: 15,
    paddingRight: 15,
  },
});

export default styles;
