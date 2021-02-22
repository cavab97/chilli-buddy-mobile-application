import { StyleSheet, Dimensions, Platform } from "react-native";
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
    width: Platform.isPad ? windowWidth / 10 : 50,
    height: Platform.isPad ? windowWidth / 10 : 50,
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
    marginTop: Platform.isPad ? 10 : 3,
    marginBottom: 8,
    paddingBottom: 10,
  },
  chatBoxImg: {
    width: Platform.isPad ? windowWidth / 1.5 : 250, //240,
    height: Platform.isPad ? windowWidth / 2.5 : 160,
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
    width: Platform.isPad ? windowWidth / 2.2 : 180,
    height: 30,
    paddingLeft: 10,
    overflow: "hidden",
    fontSize: Platform.isPad ? windowWidth / 30 : 12,
    // backgroundColor: "yellow",
  },
  shareIcon: {
    resizeMode: "cover",
    width: Platform.isPad ? windowWidth / 30 : 18,
    // backgroundColor: "red",
    height: Platform.isPad ? windowWidth / 30 : 14,
    marginLeft: 15,
    marginTop: 3,
  },
  chatBoxInnerImage: {
    width: Platform.isPad ? windowWidth / 2 : 205,
    height: Platform.isPad ? windowWidth / 3.2 : 100,
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
    fontSize: Platform.isPad ? windowWidth / 30 : 12,
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
