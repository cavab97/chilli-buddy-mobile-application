import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { Colors, Mixins, Typography } from "../../../../settings/styles/theme";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
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
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 130,
    position: "absolute",
    top: 20,
    left: 20,
    height: 30,
    backgroundColor: "#D60000",
    borderRadius: 100,
    borderColor: Colors.SECONDARY,
    flexDirection: "row",
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
