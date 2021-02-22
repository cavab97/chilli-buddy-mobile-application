import { StyleSheet, Dimensions } from "react-native";
import Constants from "expo-constants";
import { Colors, Mixins } from "../../../settings/styles/theme";
const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    height: Platform.OS === "ios" ? windowWidth / 8 : Constants.statusBarHeight * 2,
    /*  flex: 1, */
    alignItems: "flex-start",
    flexDirection: "row",
    paddingTop: 10,
    paddingRight: 1,
    marginHorizontal: 15,
    justifyContent: "space-between",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  button: {
    shadowColor: Colors.GREY,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.5,
    backgroundColor: Colors.WHITE,
    elevation: 2,
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginLeft: 10,
  },
  selectedButton: {
    shadowColor: Colors.GREY,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.5,
    backgroundColor: Colors.PRIMARY,
    elevation: 2,
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginLeft: 10,
  },
  text: {
    fontSize: 12,
    fontFamily: "HorizontalRounded",
  },
  selectedText: {
    fontSize: 12,
    fontFamily: "HorizontalRounded",
    color: Colors.WHITE,
  },
});

export default styles;
