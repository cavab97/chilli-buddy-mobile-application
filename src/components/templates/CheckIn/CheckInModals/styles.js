import { StyleSheet, Dimensions, Platform } from "react-native";
import { Colors, Mixins, Typography } from "../../../../settings/styles/theme";
const size = Dimensions.get("window").width / 1.1;
const widthW = Dimensions.get("window").width;
const heightW = Dimensions.get("window").height;

const widthS = Dimensions.get("screen").width;
const widthH = Dimensions.get("screen").height;

const divWH = widthW / heightW;

const styles = StyleSheet.create({
  messageText: {
    fontSize: 16,
    color: "black",
    paddingTop: 20,
    marginHorizontal: 20,
    textAlign: "center",
  },

  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 0,
    bottom: 120,
  },
  contentContainer2: {
    justifyContent: "center",
    alignItems: "center",
    // marginVertical: 0,
    // bottom: 0,
    // backgroundColor: "red",
    padding: 10,
  },

  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "HorizontalRounded",
  },

  ///Whole Container
  containerOverlay: {
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: "center",
    padding: 0,
  },
  containerOverlay2: {
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderTopRightRadius: 40,

    padding: 0,
  },

  // ///icon view
  closeIcon: {
    shadowOffset: { width: 0, height: 1 },
    borderColor: "grey",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    borderRadius: 100,
    width: 50,
    height: 50,
    zIndex: -1,
  },
  //icon error view
  closeIcon2: {
    // position: "absolute",

    bottom: Platform.isPad ? 45 : Platform.OS === "ios" ? 25 : 25,
    left: Platform.isPad
      ? 340
      : Platform.OS === "ios"
      ? widthS <= 375
        ? widthS / 3.5
        : widthS / 3.5
      : widthS <= 375
      ? widthS / 3.5
      : widthS / 3.5,

    // bottom: Platform.isPad
    // ? 200
    // : Platform.OS === "ios"
    // ? screenWidth <= 375
    //   ? screenWidth / 3
    //   : screenWidth / 5
    // : screenWidth <= 375
    // ? screenWidth / 3
    // : screenWidth / 3,
    // backgroundColor: "red",
    resizeMode: "contain",
    fontSize: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    borderRadius: 100,
    width: 50,
    height: 50,
    zIndex: -1,
  },
  redeemImageCrossStyle: {
    resizeMode: "cover",
    width: Platform.isPad ? 70 : 50,
    height: Platform.isPad ? 70 : 50,
    zIndex: 0,
  },

  ///image view
  imageAnime: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center", // backgroundColor: "red",
    resizeMode: "cover",
    marginTop: Platform.isPad ? "25%" : "65%",
    // top: 80,
  },
  imageAnime2: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center", // backgroundColor: "red",
    resizeMode: "cover",
    // marginTop: "2%",
    marginBottom: "10%",
    // height: "%",
    borderRadius: 100,
    // backgroundColor: "yellow",
  },
  redeemImageChilliStyle: {
    resizeMode: "contain",
    width: Platform.isPad ? size / 3 : size / 2.2,
    height: size / 2.2,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  redeemImageChilliStyle2: {
    // flex: 1,
    resizeMode: "contain",
    width: Platform.isPad ? size / 3.5 : size / 2.2,
    height: size / 2.5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    // backgroundColor: "grey",
    // position: "absolute",
  },

  //redeem now
  redeemNowBox: {
    backgroundColor: "#fff",
    shadowRadius: 3,
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    padding: 10,
    borderRadius: 100,
    width: size / 3,
    // color: "red",
    alignItems: "center",
    top: 10,
    position: "relative",
    borderColor: "grey",
    justifyContent: "center",
    borderWidth: 1,
  },
  redeemNowText: {
    color: "#D81212",
    fontFamily: "HorizontalRounded",
    textAlign: "center",
  },
  emojiText: {
    fontSize: size / 15,
    color: "#D81212",
    marginHorizontal: 0,
    textAlign: "center",
    fontFamily: "HorizontalRounded",
    bottom: 0,
    paddingBottom: 5,
  },
  emojiText2: {
    fontSize: size / 18,
    color: "black",
    // marginHorizontal: 0,
    fontFamily: "HorizontalRounded",
    textAlign: "center",
    bottom: 0,
    paddingBottom: 0,
  },
  subjectText: {
    fontSize: size / 25,
    color: "black",
    fontFamily: "HorizontalRounded",
    marginHorizontal: 0,
    textAlign: "center",
    bottom: 0,
    paddingBottom: 3,
  },
  subjectText2: {
    fontSize: size / 25,
    color: "black",
    fontFamily: "HorizontalRounded",
    marginHorizontal: 0,
    textAlign: "center",
    bottom: 0,
    paddingBottom: 3,
  },
  desciptionBox: {
    alignItems: "center",
    top: 0,
    paddingBottom: 0,
  },
  desciptionBox2: {
    alignItems: "center",
    // position: "absolute",
    // height: "100%",
    // backgroundColor: "red",
    // marginBottom: 10,
  },
  voucherValue: {
    fontSize: size / 13,
    color: "black",
    fontFamily: "HorizontalRounded",
    marginHorizontal: 0,
    textAlign: "center",
    bottom: 0,
  },
  restaurantText: {
    color: "black",
    fontSize: size / 20,
    fontFamily: "HorizontalRounded",
    textAlign: "center",
  },
  doubleOption: {
    alignItems: "center",
    // backgroundColor: "#fff",
    top: 0,
    marginVertical: 0,
    marginTop: 10,
  },
  redeemNowBoxSecond: {
    backgroundColor: "#fff",
    shadowRadius: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    padding: 6,
    borderRadius: 100,
    width: size / 3,
    // color: "red",
    alignItems: "center",
    bottom: 0,
    borderColor: "grey",
    borderWidth: 1,
    // marginVertical: -40,
  },
  Or: {
    color: "grey",
    top: 0,
    paddingBottom: 10,
    paddingTop: 10,
  },
  bottomText: {
    color: "grey",
    top: 0,
    textAlign: "center",
    fontSize: 8,
    paddingTop: 10,
  },
  bottomTextBox: {
    width: size / 2.65,
  },
  container: {
    flex: 1,
    display: "flex",
    marginTop: 10,
    marginHorizontal: 15,
    paddingVertical: 5,
  },
  loadingBox: {
    marginVertical: "80%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center", // backgroundColor: "red",
    resizeMode: "cover",
  },
});

export default styles;
