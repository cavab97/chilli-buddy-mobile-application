import { StyleSheet, Dimensions, Platform } from "react-native";
import { Colors, Mixins, Typography } from "../../../../settings/styles/theme";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  modelBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  adsImageStyle: {
    minWidth: Platform.OS === "ios" && Platform.isPad === true ? 460 : 300, //windowWidth - 150,
    height: Platform.OS === "ios" && Platform.isPad === true ? 810 : 530, //(windowHeight * 80) / 100,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
    backgroundColor: "#d9d9d9",
  },
  closeButton: {
    position: "absolute",
    top: -20,
    right: -20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  cross: {
    width: Platform.isPad ? 100 : 50,
    height: Platform.isPad ? 100 : 50,
    zIndex: 0,
  },
  wrapper: {},
  posterArea: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#eaeaea",
    width: windowWidth - 20,
    height: windowHeight - 100,
    resizeMode: "stretch",
    alignSelf: "center",
  },
  poster: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  floatingShopButton: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    position: "absolute",
    bottom: 10,
    right: 10,
    height: 70,
    backgroundColor: "#D60000",
    borderRadius: 100,
    borderColor: Colors.SECONDARY,
  },
  floatingShopButtonTitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: "white",
    paddingTop: 4,
    textAlign: "center",
  },
  floatingDistanceIndicator: {
    borderBottomWidth: 0,
    paddingHorizontal: 5,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    alignItems: "center",
    justifyContent: "center",
    width: 230,
    position: "absolute",
    bottom: 20,
    left: 40,
    height: 30,
    backgroundColor: "white",
    borderRadius: 100,
    borderColor: Colors.PRIMARY,
    flexDirection: "row",
  },
  distanceIndicatorTitle: {
    paddingVertical: 5,
    fontSize: 12,
    color: Colors.PRIMARY,
    alignSelf: "center",
    fontFamily: "HorizontalRounded",
  },
  subContainer1: {
    flex: 1,
    height: 250,
  },
  promoImageSwapLeft: {
    position: "absolute",
    color: Colors.GRAY_DARK,
    top: 270,
    left: 10,
  },
  promoImageSwapRight: {
    position: "absolute",
    color: Colors.GRAY_DARK,
    top: 270,
    right: 10,
  },
  caption: {
    color: "white",
    paddingTop: 15,
    alignSelf: "center",
    fontFamily: "HorizontalRounded",
    opacity: 0.6,
  },
  dateContainer: {
    backgroundColor: "white",
    marginTop: 10,
    borderRadius: 30,
    marginHorizontal: 20,
  },
  // actionDotStyle: {
  //     backgroundColor: '#ffffff',
  //     width: 6,
  //     height: 6,
  //     borderRadius: 7,
  //     marginLeft: 7,
  //     marginRight: 7
  // },
  // dotStyle: {
  //     backgroundColor: '#999999',
  //     width: 6,
  //     height: 6,
  //     borderRadius: 7,
  //     marginLeft: 7,
  //     marginRight: 7
  // },

  imageTopStyle: {
    width: windowWidth - 20,
    height: "100%",
  },
});

export default styles;
