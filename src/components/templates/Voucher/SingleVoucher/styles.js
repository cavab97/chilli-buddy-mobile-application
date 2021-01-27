import { StyleSheet, Dimensions } from "react-native";
import { Colors, Mixins, Typography } from "../../../../settings/styles/theme";

const size = Dimensions.get("window").width / 1.1;
const fullsize = Dimensions.get("window").width / 5;

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
    height: "100%",
  },
  logoPosition: {
    width: 70,
    height: 70,
    alignSelf: "center",
    position: "absolute",
    top: 210,
    zIndex: 5,
  },
  logo: {
    width: "100%",
    height: "100%",
    borderRadius: 35,
  },
  detailArea: {
    width: "100%",
    paddingLeft: "5%",
    height: "100%",
    //paddingRight: "5%", uncomment this at social media icon
    paddingTop: "5%",
    marginTop: 0,
    marginBottom: 40,
    alignSelf: "center",
    backgroundColor: "white",
    // shadowRadius: 5,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.5,
    position: "relative",
    borderWidth: 0,
  },
  titleStyle: {
    // fontSize: 25,
    // fontWeight: "700",
    // fontFamily: "RobotoRegular",
    // marginBottom: 10,
    // marginTop: 10,
    // paddingTop: 40,
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    // backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "RobotoRegular",
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
    paddingTop: 10,
    width: fullsize * 2,
    backgroundColor: "black",
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
  singlePostContainer: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    margin: 10,
  },
  singlePostTitle: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: Typography.FONT_FAMILY_BOLD,
    paddingBottom: 10,
  },
  singlePostDescription: {
    fontSize: 14,
    paddingBottom: 20,
  },
  firstPromoteCardStyle: {
    width: 181.2,
    marginLeft: 20,
    marginRight: 20,
    elevation: 3,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    marginBottom: 6,
  },
  promoteCardStyle: {
    width: 181.2,
    marginRight: 20,
    elevation: 3,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    marginBottom: 6,
  },
  promoteImage: {
    width: 179.2,
    height: 121.2,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  promoteNoImage: {
    width: 179.2,
    height: 121.2,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    resizeMode: "center",
  },
  promoteTitleTextStyle: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "RobotoRegular",
    marginBottom: 7,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    height: 55,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: "700",
    fontFamily: "RobotoRegular",
    marginTop: "5%",
    marginBottom: 8,
    marginLeft: 22,
  },

  // button style
  RedeemButtonStyle: {
    alignSelf: "center",
    backgroundColor: Colors.SUCCESS,
    borderRadius: 20,
    bottom: 0,
    position: "relative",
  },

  RedeemInvalidButtonStyle: {
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    bottom: 0,
    position: "relative",
  },

  subContainer1: {
    height: "100%",
  },

  posterArea: {
    height: "25%",
  },

  ///card

  columnOne: {
    borderRadius: 100,
    borderWidth: 5,
    padding: 0,
    position: "relative",
    width: size / 4.5,
    height: size / 4.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    top: 0,
    marginVertical: 5,
    zIndex: -1,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    backgroundColor: "#fff",
    zIndex: -1,
  },
  columnOneText: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "#fff",
    fontSize: 18,
    fontFamily: "RobotoBold",
  },

  columnTwoText: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "black",
    fontSize: 15,
    fontFamily: "RobotoBold",
    justifyContent: "center",
    textAlign: "left",
  },
  columnTwo: {
    padding: 10,
  },
  columnThree: {
    backgroundColor: "#fff",
    padding: 0,
    borderRadius: 10,
    width: size / 2.1,
    bottom: 0,
    marginVertical: 10,
    // textAlign: "center",
    // alignContent: "center",
  },
  card: {
    width: "100%",
    height: "100%",
    borderBottomWidth: 0,
    //backgroundColor: Colors.PRIMARY,
    borderRadius: 100,
    backgroundColor: "#fff",
  },
  cardContainer: {
    width: "85%",
    position: "absolute",
    height: "16.5%",
    padding: Platform.OS === "ios" ? 10 : 20,
    marginBottom: Platform.OS === "ios" ? 10 : 30,
    borderRadius: 20,
    marginTop: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  logoImage: {
    width: size / 5,
    height: size / 5,
    resizeMode: "contain",
    top: 0,
    marginTop: "0%",
    borderRadius: 100,
    position: "absolute",
    zIndex: -1,
    borderWidth: 1,
  },
  titleBox: {
    paddingTop: 20,
    backgroundColor: "white",
    width: "95%",
    justifyContent: "center",
    textAlign: "center",
  },
  detailsBox: {
    paddingTop: 20,
  },

  //status
  statusActiveText: {
    textTransform: "uppercase",
    color: Colors.SUCCESS,
  },
  statusDeactiveText: {
    textTransform: "uppercase",
    color: Colors.PRIMARY,
  },

  // QR IMage
  qrLogo: {
    resizeMode: "contain",
    width: size / 6.5,
    height: size / 6.5,
    color: "grey",
    backgroundColor: "#fff",
  },
  qrContainer: {
    backgroundColor: "white",
    width: size / 8,
    height: size / 5,
    justifyContent: "center",
    alignItems: "center",
    right: -28,
    bottom: size / 20,
    marginLeft: 0,
    // marginRight: 50,
    resizeMode: "contain",
    position: "absolute",
  },
  FirstRow: {
    paddingTop: 20,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  col: { width: "45%", backgroundColor: "#fff" },
  col2: { width: "50%", backgroundColor: "#fff", textAlign: "left" },
  col2Text: {
    color: "grey",
  },
  columnTwoSubText: {
    color: "grey",
    fontSize: 12,
  },
  ///descriptiontext
});

export default styles;
