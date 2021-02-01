import { StyleSheet, Dimensions } from "react-native";
import { Colors, Mixins, Typography } from "../../../../settings/styles/theme";

const styles = StyleSheet.create({
  messageText: {
    fontSize: 16,
    color: "white",
    paddingTop: 20,
    marginHorizontal: 20,
    textAlign: "center",
    fontFamily: "HorizontalRounded",
  },
  subjectText: {
    fontSize: 20,
    color: "white",
    paddingTop: 20,
    marginHorizontal: 20,
    textAlign: "center",
    fontFamily: "HorizontalRounded",
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
    fontFamily: "HorizontalRounded",
  },
});

export default styles;
