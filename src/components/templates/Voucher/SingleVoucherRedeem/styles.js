import { StyleSheet, Dimensions } from "react-native";
const opacity = "rgba(0, 0, 0, .6)";

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: 300,
  },

  BarCodeScannerStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,

    borderWidth: 10,
    marginHorizontal: 0,
    marginLeft: 0,
    marginStart: 0,
    paddingHorizontal: 0,
    paddingLeft: 0,
    paddingStart: 0,
    height: "100%",
    padding: 0,
  },
  containerQR: {
    borderWidth: 10,
  },
  layerTop: {
    flex: 1,
    backgroundColor: opacity,
  },
  layerCenter: {
    flex: 1,
    flexDirection: "row",
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity,
  },
  focused: {
    flex: 4,
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity,
  },
  layerBottom: {
    flex: 1,
    backgroundColor: opacity,
  },
});
export default styles;
