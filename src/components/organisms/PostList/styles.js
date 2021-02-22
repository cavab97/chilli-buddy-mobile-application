import { StyleSheet, Dimensions } from "react-native";
import Constants from "expo-constants";
import { Colors } from "../../../settings/styles/theme";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  postsTopRow: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    top: 0,
    //marginHorizontal: 40,
  },
  logoPositionInModal: {
    width: 50,
    height: 50,
    borderColor: "white",
    borderWidth: 3.5,
    borderRadius: 35,
    elevation: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    marginTop: 2,
  },
  logo: {
    width: "100%",
    height: "100%",
    borderRadius: 35,
  },
  chatBoxContainer: {
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 1.22,
    elevation: 5,
    paddingLeft: 5,
    marginTop: 3,
    marginBottom: 8,
    paddingBottom: 10,
  },
  chatBoxImg: {
    width: 250, //240,
    height: 160,
    resizeMode: "cover",
    shadowColor: "grey",
    alignItems: "center",
    borderRadius: 20,
  },
  chatBoxTopText: {
    top: 5,
    paddingVertical: 5,
    left: 0,
    zIndex: 1,
    flexDirection: "row",
  },
  chatBoxText: {
    width: 180,
    height: 30,
    paddingLeft: 10,
    overflow: "hidden",
    fontSize: 12,
  },
  shareIcon: {
    resizeMode: "cover",
    width: 18,
    // backgroundColor: "red",
    height: 14,
    marginLeft: 15,
    marginTop: 3,
  },
  chatBoxInnerImage: {
    width: 205,
    height: 100,
    resizeMode: "cover",
    left: 3,
    marginTop: 5,
    backgroundColor: "#d9d9d9",
  },
  daysText: {
    textAlign: "right",
    color: "grey",
    width: "100%",
    paddingTop: 3,
    paddingBottom: 10,
    paddingRight: 10,
    fontFamily: "HorizontalRounded",
    bottom: 10,
    fontSize: 12,
  },
  singlePostContainer: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    margin: 10,
  },
  singlePostTitle: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "HorizontalRounded",
    paddingBottom: 10,
  },
});

export default styles;
