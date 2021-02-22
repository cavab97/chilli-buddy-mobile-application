import { auto } from "eol";
import { StyleSheet, Dimensions, Platform } from "react-native";
import { Colors, Typography } from "../../../../settings/styles/theme";
import Constants from "expo-constants";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  slide2: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  posterArea: {
    flex: 1,
    height: 200,
    borderBottomWidth: 0.5,
  },
  subContainer1: {
    flex: 1,
    height: 200,
    // backgroundColor: "black",
    // resizeMode: "cover",
  },
  actionDotStyle: {
    // backgroundColor: '#ffffff',
    width: 6,
    height: 6,
    // borderRadius: 7,
    // marginLeft: 7,
    // marginRight: 7
  },
  dotStyle: {
    // backgroundColor: '#999999',
    width: 6,
    height: 6,
    // borderRadius: 7,
    // marginLeft: 7,
    // marginRight: 7
  },
  paginationStyle: {
    bottom: 20,
  },
  imageTopStyle: {
    width: "100%",
    height: 200,
  },
  logoPosition: {
    width: 70,
    height: 70,
    // alignSelf: "center",
    position: "absolute",
    top: 160,
    zIndex: 5,
    flex: 1,
    marginLeft: 20,
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
  },
  outPostContainer: {
    flex: 1,
    // backgroundColor: "red",
  },

  logo: {
    width: "100%",
    height: "100%",
    borderRadius: 35,
  },
  detailArea: {
    width: "98%",
    paddingLeft: "5%",
    //paddingRight: "5%", uncomment this at social media icon
    paddingTop: "8%",
    marginTop: 0,
    marginBottom: 20,
    alignSelf: "center",
    backgroundColor: "white",
    // marginHorizontal: 100,
  },
  titleWhiteboard: {
    fontSize: Platform.isPad ? windowWidth / 20 : 25,
    fontFamily: "HorizontalRounded",
    marginBottom: 10,
    marginTop: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "HorizontalRounded",
    marginTop: 30,
  },
  detail: {
    fontSize: 18,
    marginTop: 15,
    flexDirection: "row",
  },
  subIconDetail: {
    margin: 3,
  },
  subIconDetailMain: {
    width: 30,
    marginTop: 15,
  },
  setRow: {
    flexDirection: "row",
    backgroundColor: "white",
  },
  operatingHour: {},
  operatingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  postLabel: {
    // color: Colors.BLACK,
    color: Colors.WHITE,
    fontSize: 21,
    paddingTop: 12,
    paddingLeft: 20,
    fontWeight: "bold",
  },
  postContainer: {
    width: "100%",
    height: 50,
    // borderWidth: 2,
    // borderColor: Colors.GRAY_MEDIUM,
    backgroundColor: Colors.PRIMARY,
  },
  postIconSwap: {
    position: "absolute",
    top: 11,
    right: 20,
    // color: Colors.BLACK
    color: Colors.WHITE,
  },
  coverImageSwapLeft: {
    position: "absolute",
    color: Colors.GRAY_LIGHT,
    top: 110,
    left: 10,
  },
  coverImageSwapRight: {
    position: "absolute",
    color: Colors.GRAY_LIGHT,
    top: 110,
    right: 10,
  },
  singlePostDescription: {
    fontSize: 14,
    paddingBottom: 20,
  },
  firstPromoteCardStyle: {
    width: 181.2,
    // marginLeft: 20,
    marginRight: 20,
    elevation: 1,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 0.5,
    marginBottom: 6,
    paddingTop: 10,
    alignItems: "center",
  },
  promoteCardStyle: {
    width: 181.2,
    // marginLeft: 20,
    marginRight: 20,
    elevation: 1,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 0.5,
    marginBottom: 6,
    paddingTop: 10,
    alignItems: "center",
  },
  promoteImage: {
    width: 165,
    height: 121.2,
    borderRadius: 20,
  },
  promoteNoImage: {
    width: 179.2,
    height: 121.2,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    resizeMode: "center",
  },
  promoteTitleTextStyle: {
    fontSize: 13,
    fontFamily: "HorizontalRounded",
    marginBottom: 0,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    // height: ,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "HorizontalRounded",
    marginTop: "5%",
    marginBottom: 8,
    marginLeft: 22,
    color: Colors.RED,
  },
  lastSectionFlatListRow: {
    marginLeft: 15,
  },

  FirstRow: {
    paddingTop: 20,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  TopRow: {
    paddingTop: 20,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  TopTitle: {
    fontSize: 25,
    fontFamily: "HorizontalRounded",
    paddingBottom: 3,
    width: 240,
    // marginBottom: 10,
    // marginTop: 10,
  },
  ShopPostTopTitle: {
    fontSize: 17,
    fontFamily: "HorizontalRounded",
    paddingBottom: 3,
    width: 150,
    // backgroundColor: "red",
    // marginBottom: 10,
    // marginTop: 10,
  },
  ShopPostSubTitle: { color: "grey", fontSize: 12, width: 150, fontFamily: "HorizontalRounded" },
  TopSubTitle: {
    fontSize: 13,
    // fontWeight: "700",
    fontFamily: "HorizontalRounded",
    color: "grey",
    // marginBottom: 10,
    // marginTop: 10,
    width: 240,
    // backgroundColor: "red",
  },
  textLabel: {
    color: "black",
    fontFamily: "HorizontalRounded",
  },
  SubTopcol: {
    flex: 1,
    flexDirection: "row",
    // backgroundColor: "yellow",
  },
  Topcol: { width: "65%", backgroundColor: "#fff" },
  lastSectionTextContainer: {
    alignSelf: "flex-start",
    marginLeft: 10,
    // width: 100,
    height: 50,
    // backgroundColor: "grey",
  },
  FirstRowSocialMedia: {
    paddingTop: 20,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    backgroundColor: "#FFF",
    width: "100%",
  },
  col: { width: "35%", backgroundColor: "#fff" },
  colSocialMedia: { width: "35%", backgroundColor: "#fff", marginTop: 8 },

  col2: { width: "55%", backgroundColor: "#fff", textAlign: "left" },

  modalContainer: {
    margin: 0,
    justifyContent: "flex-end",
  },
  shopPostsContainer: {
    paddingTop: 20,
    flex: 1,
  },
  shareText: {
    fontSize: 15,
    fontFamily: "HorizontalRounded",
    color: Colors.RED,
    paddingLeft: 5,
    paddingRight: 5,
  },
  shareContainer: {
    backgroundColor: "white",
    height: 27,
    width: 80,
    alignItems: "center",
    borderRadius: 40,
    resizeMode: "cover",
    flexDirection: "row",
    paddingHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    padding: 2,
  },
  postsTopRowNameContainer: {
    marginRight: 40,
  },
  ///WhiteBoard
  postText: {
    fontSize: 20,
    paddingLeft: 50,
    paddingTop: 35,
    fontFamily: "HorizontalRounded",
    // backgroundColor: "red",
  },
  outPostContainer: {
    flex: 1,
    // backgroundColor: "red",
  },
  outPostContainer: {
    flex: 1,
    // backgroundColor: "red",
  },
  outPostContainer: {
    flex: 1,
    // backgroundColor: "red",
  },
  contentFull: {
    height: windowHeight - Constants.statusBarHeight,
    width: windowWidth,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  swipeableIndicator: {
    backgroundColor: "#d3d3d3",
    width: 50,
    height: 5,
    alignSelf: "center",
    marginVertical: 15,
    borderRadius: 15,
  },
  title: {
    fontFamily: "HorizontalRounded",
    fontSize: 18,
    paddingBottom: 10,
  },
  contentContainer: {
    paddingTop: 15,
    paddingHorizontal: 30,
    marginBottom: 40,
  },
});

export default styles;
