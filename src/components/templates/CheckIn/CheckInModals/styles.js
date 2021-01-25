import { StyleSheet, Dimensions } from "react-native";
import { Colors, Mixins, Typography } from "../../../../settings/styles/theme";

const styles = StyleSheet.create({
  messageText: {
    fontSize: 16,
    color: "black",
    paddingTop: 20,
    marginHorizontal: 20,
    textAlign: "center",
  },
  subjectText: {
    fontSize: 22,
    color: "black",
    fontWeight: "bold",
    marginHorizontal: 0,
    textAlign: "center",
    bottom: 65,
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
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
  redeemImageCrossStyle: { resizeMode: "contain", width: 100, height: 50 },

  ///image view
  imageAnime: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center", // backgroundColor: "red",
    resizeMode: "cover",
  },
  redeemImageChilliStyle: {
    flex: 1,
    resizeMode: "contain",
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});

export default styles;
