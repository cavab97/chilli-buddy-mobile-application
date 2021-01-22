import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";

const numColumns = 4;
const size = Dimensions.get("window").width / numColumns;
const styles = StyleSheet.create({
  itemContainer: {
    width: size,
    height: size,
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
  dayStyle: {},
});

export default styles;
