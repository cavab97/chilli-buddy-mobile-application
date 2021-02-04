import { StyleSheet, Platform } from "react-native";
import { Dimensions } from "react-native";
import { Colors } from "../../../settings/styles/theme";
import Constants from "expo-constants";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const ratio = windowWidth / 800;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  subContainer1: {
    flex: 1,
    //minHeight: Platform.OS === "ios" && Platform.isPad === true ? 700 : 250,
    //maxHeight: Platform.OS === "ios" && Platform.isPad === true ? 700 : 250,
    minHeight: (windowWidth / 800) * 600,
    maxHeight: (windowWidth / 800) * 600,
  },

  subContainer2: {
    alignItems: "center",
    flex: 1,
  },
  subContainer3: {
    flex: 1,
    marginBottom: 10,
  },
  subContainer4: {
    flex: 1,
  },
  //--top--------------------------------------------
  actionDotStyle: {
    backgroundColor: "#ffffff",
    width: 6,
    height: 6,
    borderRadius: 7,
    marginLeft: 7,
    marginRight: 7,
  },
  dotStyle: {
    backgroundColor: "#999999",
    width: 6,
    height: 6,
    borderRadius: 7,
    marginLeft: 7,
    marginRight: 7,
  },
  paginationStyle: {
    bottom: 20,
  },
  imageTopStyle: {
    width: "100%",
    height: "100%",
  },
  floatingCheckInButton: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    position: "absolute",
    top: 10,
    right: 10,
    height: 70,
    backgroundColor: "#D60000",
    borderRadius: 100,
    borderColor: Colors.SECONDARY,
  },
  floatingCheckInButtonTitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: "white",
    paddingTop: 4,
    textAlign: "center",
  },
  //--join now--------------------------------------------
  sectionTitle: {
    fontSize: Platform.OS === "ios" && Platform.isPad === true ? 40 : 22,
    paddingBottom: Platform.OS === "ios" && Platform.isPad === true ? 20 : 5,
    marginTop: "5%",
    fontFamily: "ZiTiQuanXinYiGuanHeiTi",
    color: Colors.PRIMARY,
  },
  cardSection: {
    margin: 0,
    padding: 0,
    flexDirection: "row",
    borderRadius: 19,
    width: "100%",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 13,
    fontFamily: "RobotoRegular",
  },
  cardContent: {
    color: "#737373",
    fontSize: 11,
    marginLeft: 10,
    fontFamily: "RobotoBold",
    //marginBottom: 3,
  },
  firstCardStyle: {
    width: Platform.OS === "ios" && Platform.isPad === true ? 550 : 320,
    borderRadius: 20,
    height: 50,
    //marginRight: 20,
    //marginLeft: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginBottom: 10,
  },
  cardStyle: {
    width: Platform.OS === "ios" && Platform.isPad === true ? 550 : 320,
    borderRadius: 20,
    height: 50,
    //width: "99%",
    //marginRight: 20,
    //marginLeft: "auto",
    //marginRight: "auto",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginBottom: 10,
  },
  imageMap: {
    margin: 11,
    width: 131,
    height: 1,
    borderRadius: 20,
    resizeMode: "cover",
  },
  cardHolder: {
    flexDirection: "row",
    backgroundColor: "#FAFAFA",
    marginTop: 0,
  },
  textHolderStyle: {
    flex: 1,
    padding: 11,
    paddingLeft: 0,
    paddingTop: 16,
  },
  iconStyle: {
    marginTop: 0,
    marginRight: -5,
    alignItems: "flex-end",
    height: 0,
  },
  categoryIcon: {
    color: Colors.WHITE,
    //marginRight: 10,
    marginRight: "auto",
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 10,
  },

  //-----------your challenge----------------------------------
  imageMap2: {
    /* width: 363.2,
        height: 131.2, */
    height: 50,
    resizeMode: "cover",
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19,
  },
  cardSection2: {
    margin: 0,
    padding: 0,
    height: 50,
    flexDirection: "column",
    borderRadius: 19,
    overflow: "hidden",
  },
  cardTitle2: {
    fontSize: Platform.OS === "ios" && Platform.isPad === true ? 23 : 15,
    color: "#ffffff",
    paddingTop: 3,
    paddingBottom: 3,
    marginRight: "auto",
    //textAlign: "center",
    fontFamily: "ZiTiQuanXinYiGuanHeiTi",
  },
  textHolderStyle2: {
    //flex: 1,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    //backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19,
  },
  imageBackgroundStyle: {
    resizeMode: "cover",
    height: 90.2,
  },
  bottomTextStyle: {
    textAlign: "center",
    fontFamily: "RobotoBold",
    color: "#ffffff",
    backgroundColor: Colors.PRIMARY,
    fontSize: 10,
    paddingTop: 3,
    paddingBottom: 3,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    overflow: "hidden",
  },
  routeType: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    fontFamily: "RobotoRegular",
  },
  //----latest news------------------------------------------------------
  newsTitleTextStyle: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "RobotoRegular",
    marginBottom: 7,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    height: 55,
  },
  newsImage: {
    width: 179.2,
    height: 121.2,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  firstNewsCardStyle: {
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
  newsCardStyle: {
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
  newsNoImage: {
    width: 179.2,
    height: 121.2,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    resizeMode: "center",
  },
  infoContainer: {
    width: "100%",
    height: "20%",
    position: "absolute",
    left: 0,
    zIndex: 10,
    borderWidth: 2,
    borderColor: Colors.PRIMARY,
    borderStyle: "solid",
    backgroundColor: "#fff0cc",
    paddingVertical: 30,
  },
  infoTitle: {
    fontSize: 18,
    color: Colors.PRIMARY,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  infoSubtitle: {
    fontSize: 16,
    color: Colors.PRIMARY,
    textAlign: "justify",
  },
  //----Advertisement Popup Model------------------------------------------------------
  modelBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  closeButton: {
    position: "absolute",
    top: -20,
    right: -20,
  },
  adsImageStyle: {
    // width: "100%",
    // height: "100%",

    minWidth: Platform.OS === "ios" && Platform.isPad === true ? 460 : 300, //windowWidth - 150,
    //maxWidth: (windowWidth * 85) / 100, //windowWidth - 100,
    height: Platform.OS === "ios" && Platform.isPad === true ? 810 : 530, //(windowHeight * 80) / 100,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  adsImageContainer: {
    //borderWidth: 1,
  },

  //Floating button style
  floatingButton: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },

  containerForFloatingButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    position: "absolute",
    bottom: 0,
    left: 5,
    height: 85,
  },

  //spinning wheel pop up container
  containerForSpinningWheel: {
    backgroundColor: "#D60000",
    borderRadius: 10,
    minWidth: Platform.OS === "ios" && Platform.isPad === true ? 460 : 300,
    height: Platform.OS === "ios" && Platform.isPad === true ? 950 : 530,
  },

  //sub Title
  subTitle: {
    fontSize: Platform.OS === "ios" && Platform.isPad === true ? 36 : 18,
    paddingBottom: Platform.OS === "ios" && Platform.isPad === true ? 20 : 5,
    marginTop: 5,
    fontFamily: "ZiTiQuanXinYiGuanHeiTi",
    color: Colors.WHITE,
    textAlign: "center",
  },

  //category Text
  categoryText: {
    fontSize: Platform.OS === "ios" && Platform.isPad === true ? 23 : 15,
    color: "#ffffff",
    fontFamily: "ZiTiQuanXinYiGuanHeiTi",
    marginVertical: 16,
    textAlign: "center",
  },

  floatingShopButtonTitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: "white",
    paddingTop: 4,
    textAlign: "center",
  },
  floatingCheckInTitle: {
    fontSize: 9,
    fontFamily: "HorizontalRounded",
    color: "white",
    paddingTop: 4,
    textAlign: "center",
  },
  // floatingShopButton: {
  //   borderWidth: 1,
  //   borderColor: "rgba(0,0,0,0.2)",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   width: 70,
  //   position: "absolute",
  //   bottom: 10,
  //   right: 10,
  //   height: 70,
  //   backgroundColor: "#D60000",
  //   borderRadius: 100,
  //   borderColor: Colors.SECONDARY,
  // },

  firstSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quarterSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 30,
  },
  QuarterContainer1: { backgroundColor: "black", width: windowWidth / 6 },
  QuarterContainer2: { backgroundColor: "black", width: windowWidth / 6 },
  QuarterContainer3: { backgroundColor: "black", width: windowWidth / 6 },
  QuarterContainer4: { backgroundColor: "black", width: windowWidth / 6 },

  avatarContainer: {
    //marginRight: 12,
    marginTop: 0,

    // paddingLeft: 200,
  },
  profileImageStyle: {
    backgroundColor: Colors.GRAY_DARK,
    height: 50,
    width: 50,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: "white",
  },
  image: {
    flex: 1,
    borderRadius: 100,
    width: "100%",

    resizeMode: "cover",
    //width: "100%",
    // height: "100%",
  },
});

export default styles;
