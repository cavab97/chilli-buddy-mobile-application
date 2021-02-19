import { StyleSheet, Platform } from "react-native";
import { Colors, Mixins, Typography } from "../../../settings/styles/theme";

const styles = StyleSheet.create({
  imageTopStyle: {
    // borderRadius: 15,
    resizeMode: "cover",
    flex: 1,
  },
  subContainer1: {
    borderRadius: 15,
  },
  wrapper: {
    backgroundColor: "red",
  },
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "black",
  },
  // container: {
  //   borderWidth: 1,
  //   borderColor: "black",
  // },
});

export default styles;
