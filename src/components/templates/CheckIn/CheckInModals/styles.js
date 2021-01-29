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
  },

  submitContainer: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 3,
    width: "100%",
    height: 49,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    position: "absolute",
    bottom: 3,
    left: 10,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "RobotoRegular",
  },

  ///Whole Container
  containerOverlay: {
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },

  ///icon view
  closeIcon: {
    position: "absolute",
    top: -30,
    right: -54,
    // backgroundColor: "red",
    resizeMode: "cover",
    fontSize: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  redeemImageCrossStyle: { resizeMode: "contain", width: 100, height: 50, zIndex: 1 },

  ///image view
  imageAnime: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center", // backgroundColor: "red",
    resizeMode: "cover",
    marginTop: "50%",
    backgroundColor: "#fff",
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
    flex: 1,
    resizeMode: "contain",
    width: size / 2.2,
    height: size / 2.2,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    padding: 6,
    borderRadius: 100,
    width: size / 3,
    color: "red",
    alignItems: "center",
    top: 225,
    position: "absolute",
  },
  redeemNowText: {
    color: "#D81212",
    fontWeight: "bold",

    textAlign: "center",
  },
  emojiText: {
    fontSize: size / 15,
    color: "#D81212",
    fontWeight: "bold",
    marginHorizontal: 0,
    textAlign: "center",
    bottom: 0,
    paddingBottom: 5,
  },
  emojiText2: {
    fontSize: size / 17,
    color: "black",
    fontWeight: "bold",
    marginHorizontal: 0,
    textAlign: "center",
    bottom: 0,
    paddingBottom: 0,
  },
  subjectText: {
    fontSize: size / 25,
    color: "black",
    fontWeight: "bold",
    marginHorizontal: 0,
    textAlign: "center",
    bottom: 0,
    paddingBottom: 3,
  },
  subjectText2: {
    fontSize: size / 25,
    color: "black",
    fontWeight: "bold",
    marginHorizontal: 0,
    textAlign: "center",
    bottom: 0,
    paddingBottom: 3,
  },
  desciptionBox: {
    backgroundColor: "#fff",
    alignItems: "center",
    top: 100,
    position: "absolute",
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
    fontWeight: "bold",
    marginHorizontal: 0,
    textAlign: "center",
    bottom: 0,
  },
  restaurantText: {
    color: "black",
    fontSize: size / 20,
    fontWeight: "bold",
  },
  doubleOption: {
    alignItems: "center",
  },
  redeemNowBoxSecond: {
    backgroundColor: "#fff",
    shadowRadius: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    padding: 6,
    borderRadius: 100,
    width: size / 3,
    color: "red",
    alignItems: "center",
    top: 290,
    position: "absolute",
  },
  Or: {
    color: "grey",
    top: 265,
  },
  bottomText: {
    color: "grey",
    top: 309,
    textAlign: "center",
    fontSize: 8,
  },
  bottomTextBox: {
    width: size / 2.65,
  },
});

export default styles;
