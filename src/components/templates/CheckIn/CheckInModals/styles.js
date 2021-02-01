import { StyleSheet, Dimensions } from "react-native";
import { Colors, Mixins, Typography } from "../../../../settings/styles/theme";
const size = Dimensions.get("window").width / 1.1;

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
    marginVertical: 0,
    bottom: 0,
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
  },

  // ///icon view
  closeIcon: {
    shadowOffset: { width: 0, height: 1 },
  },
  //icon error view
  closeIcon2: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 400 : 330,
    right: -54,
    // backgroundColor: "red",
    resizeMode: "contain",
    fontSize: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    zIndex: 1,
  },
  redeemImageCrossStyle: { resizeMode: "contain", width: 100, height: 50, zIndex: 1 },

  ///image view
  imageAnime: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center", // backgroundColor: "red",
    resizeMode: "cover",
    marginTop: "100%",
    backgroundColor: "#fff",
    // top: 80,
  },
  imageAnime2: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center", // backgroundColor: "red",
    resizeMode: "cover",
    marginTop: "2%",
    borderRadius: 100,
    backgroundColor: "#fff",
  },
  redeemImageChilliStyle: {
    flex: 0,
    resizeMode: "contain",
    width: size / 2.2,
    height: size / 2.2,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  redeemImageChilliStyle2: {
    flex: 1,
    resizeMode: "contain",
    width: size / 2.3,
    height: size / 2.3,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#fff",
    // position: "absolute",
  },

  //redeem now
  redeemNowBox: {
    backgroundColor: "#fff",
    shadowRadius: 3,
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    padding: 6,
    borderRadius: 100,
    width: size / 3,
    color: "red",
    alignItems: "center",
    top: 0,
    position: "relative",
    borderColor: "grey",
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
    fontSize: size / 17,
    color: "black",
    marginHorizontal: 0,
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
    backgroundColor: "#fff",
    alignItems: "center",
    top: 0,
    paddingBottom: 0,
  },
  desciptionBox2: {
    backgroundColor: "#fff",
    alignItems: "center",
    bottom: 45,

    // position: "absolute",
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
    backgroundColor: "#fff",
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
});

export default styles;
