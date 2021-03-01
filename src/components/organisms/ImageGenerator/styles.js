import { StyleSheet, Platform } from "react-native";
import { Colors, Mixins, Typography } from "../../../settings/styles/theme";

const styles = StyleSheet.create({
  chatBoxInnerImage: {
    width: "100%",
    height: Platform.isPad ? 370 : Platform.OS == "ios" ? 165 : 160,
    resizeMode: "cover",
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 1 },
    // borderWidth: 1,
    shadowOpacity: 1,
    shadowRadius: 2.22,
    // elevation: 10,
    // position: "absolute",
    // top: 40,
    // left: 30,
    // marginHorizontal: 30,
    marginVertical: 3,
  },
});

export default styles;
