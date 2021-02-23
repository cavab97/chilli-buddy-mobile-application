import { StyleSheet, Platform, Dimensions } from "react-native";
import { Colors, Mixins, Typography } from "../../../../settings/styles/theme";
const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  outPostContainer: {
    flex: 1,
    // backgroundColor: "red",
    marginHorizontal: 20,
  },
  postsTopRow: {
    // backgroundColor: "grey",
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    top: 20,
    alignItems: "center",
    alignSelf: "center",
    // marginHorizontal: 10,
    // backgroundColor: "yellow",
    width: Platform.isPad ? windowWidth / 1.1 : "90%",
  },
  logoPositionInModal: {
    width: Platform.isPad ? 70 : 50,
    height: Platform.isPad ? 70 : 50,
    // alignSelf: "center",
    // position: "absolute",
    // top: 30,
    // zIndex: 5,
    // direction: "row",
    // flexDirection: "row",
    // justifyContent: "space-between",
    // marginHorizontal: 20,
    // flex: 1,
    // marginLeft: 20,
    borderColor: "white",
    // backgroundColor: "grey",
    borderWidth: 3.5,
    borderRadius: 35,
    elevation: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
  logo: {
    width: "100%",
    height: "100%",
    borderRadius: 35,
  },
  postsTopRowNameContainer: {
    marginRight: Platform.isPad ? windowWidth / 2.5 : 10,
    marginHorizontal: 10,
    // backgroundColor: "red",
    // top: 10,
  },
  ShopPostTopTitle: {
    fontSize: Platform.isPad ? windowWidth / 20 : 17,
    fontFamily: "HorizontalRounded",
    width: 150,
    // backgroundColor: "red",
    // marginBottom: 10,
    // marginTop: 10,
  },
  ShopPostSubTitle: { color: "grey", fontSize: 12, width: 150, fontFamily: "HorizontalRounded" },
  shareContainer: {
    backgroundColor: "white",
    height: Platform.isPad ? windowWidth / 15 : 27,
    width: Platform.isPad ? windowWidth / 8 : 80,
    alignItems: "center",
    borderRadius: 40,
    resizeMode: "cover",
    flexDirection: "row",
    paddingHorizontal: Platform.isPad ? windowWidth / 50 : 5,
    shadowColor: Colors.GREY,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.5,
    backgroundColor: Colors.WHITE,
    elevation: 2,
    padding: 2,
  },
  shareText: {
    fontSize: 15,
    fontFamily: "HorizontalRounded",
    color: Colors.RED,
    paddingLeft: 5,
    paddingRight: 5,
  },
  shareIcon: {
    resizeMode: "cover",
    width: 18,
    height: 14,
  },

  ///postList

  singlePostContainer: {
    // borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: Platform.isPad ? 30 : 15,
    marginHorizontal: 5,
  },
  singlePostTitle: {
    fontSize: Platform.isPad ? windowWidth / 20 : 18,
    fontWeight: "bold",
    fontFamily: "HorizontalRounded",
    paddingBottom: 10,
  },
  shopPostsContainer: {
    paddingTop: 40,
    paddingBottom: 40,
    flex: 1,
  },
  chatBoxInnerImage: {
    width: "100%",
    height: Platform.isPad ? windowWidth / 3 : 130,
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
