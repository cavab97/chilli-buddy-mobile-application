import { StyleSheet, ColorPropType, Platform, Dimensions } from "react-native";

import { Colors, Mixins } from "../../../settings/styles/theme";

const size = Dimensions.get("window").width / 1.1;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: size / 3,
    borderBottomWidth: 0,
    backgroundColor: "#fff",
    borderRadius: 25,
  },

  columnOneText: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "#fff",
    fontSize: 18,
    fontFamily: "HorizontalRounded",
  },
  columnTwoText: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "black",
    fontSize: Platform.isPad ? 25 : 15,
    fontFamily: "HorizontalRounded",
    justifyContent: "center",
    textAlign: "left",
    // resizeMode: "contain",
  },
  columnTwo: {
    paddingHorizontal: 5,
    paddingVertical: 20,
  },

  image: {
    width: "100%",
    height: 250,
  },
  emptySection: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  emptyText: {
    fontWeight: "bold",
    fontSize: 20,
    color: Platform.OS === "ios" ? Colors.GRAY_LIGHTEST : "#E6E6E6",
  },
  emptyIcon: {
    paddingTop: 35,
    alignSelf: "center",
    justifyContent: "center",
    color: Platform.OS === "ios" ? Colors.GRAY_LIGHTEST : "#F4F4F4",
  },
  flatList: {
    minHeight: Mixins.WINDOW_HEIGHT - 300,
  },
  title: {
    fontSize: 20,
    fontFamily: "HorizontalRounded",
    color: Colors.PRIMARY,
  },
  detail: {
    marginLeft: 10,
    fontSize: 12,
    color: Colors.BLACK,
    fontFamily: "HorizontalRounded",
  },
  checkbox: {
    backgroundColor: Colors.GRAY_LIGHT,
  },
  subscribe: {
    backgroundColor: Colors.PRIMARY,
    width: 120,
    height: 40,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 10,
    top: 200,
  },
  profile: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 10,
    top: 20,
  },
  tagsButton: {
    marginLeft: 10,
    marginRight: 10,
    color: Colors.WHITE,
  },
  categoriesContainer: {
    borderWidth: 0,
    shadowColor: "rgba(0, 0, 0, 0.38)",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1,
  },
  categoriesSelect: {
    backgroundColor: Colors.PRIMARY,
    borderWidth: 1.2,
    marginTop: 5,
    borderColor: Colors.PRIMARY,
  },
  categoriesButton: {
    borderColor: "#D60000",
    borderRadius: 3,
    width: 200,
    marginRight: 10,
    marginTop: 8,
  },
  modalSelectTextStyle: {
    color: Colors.WHITE,
    fontWeight: "500",
  },
  modalOptionTextStyle: {
    color: Colors.PRIMARY,
  },

  bookmark: {
    //backgroundColor: Colors.PRIMARY,
    borderRadius: 30,
    //justifyContent: "center",
    //alignItems: "center",
    position: "absolute",
    right: 15,
    top: 15,
  },

  floatingDistanceIndicator: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 130,
    position: "absolute",
    top: 10,
    left: 10,
    height: 30,
    backgroundColor: "#D60000",
    borderRadius: 100,
    borderColor: Colors.SECONDARY,
    flexDirection: "row",
  },
  distanceIndicatorTitle: {
    marginLeft: 10,
    fontSize: 12,
    color: Colors.WHITE,
    fontFamily: "HorizontalRounded",
  },

  //image logo
  borderImage: {
    width: size / 2.5,
    height: size * 0.5,
    resizeMode: "contain",
    bottom: 0,
  },

  merchantImage: {
    resizeMode: "cover",
    // position: "absolute",
    width: size / 8,
    height: size / 8,
    left: 0,
    borderRadius: 80,
  },

  merchantBorder: {
    backgroundColor: "#fff",
    width: size / 8,
    height: size / 8,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    borderRadius: 100,
    left: Platform.isPad ? 35 : 15,
    resizeMode: "contain",
    borderColor: "black",
    borderWidth: 3,
  },

  //status invalid ui
  columnOneInvalid: {
    backgroundColor: "grey",
    padding: 10,
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },

  //single card list's card
  CardListSingleCard: {
    width: size,
    // height: size / 4,
    paddingBottom: 0,
    borderRadius: 25,
  },
  // image border
  columnOne: {
    backgroundColor: "white",
    padding: 0,
    width: size / 2.3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    height: size / 4.5,
    marginVertical: "4%",
  },
  textStyle: { fontWeight: "bold", fontSize: 18 },
  columnThree: {
    backgroundColor: "#fff",
    padding: 2,
    width: size / 2,
    bottom: Platform.isPad ? -25 : 0,
    resizeMode: "contain",
    textAlign: "left",
  },
  salesPoint: {
    position: "absolute",
    backgroundColor: "#fff",
    justifyContent: "center",
    textAlign: "center",
    right: Platform.isPad ? 80 : 38,
    fontWeight: "bold",
  },
  salesPointText: {
    fontSize: Platform.isPad ? 50 : 20,
    fontFamily: "HorizontalRounded",
  },
  VoucherListTitle: {
    color: "#D81212",
    fontSize: 40,
    padding: 10,
    fontFamily: "HorizontalRounded",
  },
  termNconditionText: {
    color: "grey",
    fontSize: 10,
    fontFamily: "HorizontalRounded",
  },
  usedBanner: {
    backgroundColor: "grey",
    position: "absolute",
    width: size / 1,
    height: size / 3,
    borderBottomWidth: 0,
    borderRadius: 25,
    marginVertical: "3%",
    paddingBottom: 0,
    zIndex: 1,
    opacity: 0.8,
    marginHorizontal: "5%",
    resizeMode: "contain",
  },
  usedBannerImage: {
    position: "absolute",
    resizeMode: "contain",
    height: size / 3,
    width: "100%",
    paddingBottom: 0,
  },
  usedStyles: {
    color: "#fff",
    zIndex: 2,
    opacity: 1,
    fontSize: 24,
    top: 75,
    right: 10,
    textAlign: "right",
    fontFamily: "HorizontalRounded",
  },

  ///Used Banner
  CardListSingleCard2: {
    width: size,
    // height: size / 4,
    paddingBottom: 0,
    borderRadius: 25,
  },
  card2: {
    width: "100%",
    height: size / 3,
    borderBottomWidth: 0,
    backgroundColor: "#fff",
    borderRadius: 25,
  },
  columnOne2: {
    backgroundColor: "white",
    padding: 0,
    width: size / 2.3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    height: size / 4.5,
    marginVertical: "4%",
  },
  // bannerOutSide: {
  //   backgroundColor: "grey",
  // },
  merchantBorder2: {
    backgroundColor: "#fff",
    width: size / 8,
    height: size / 8,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    borderRadius: 100,
    left: Platform.isPad ? 35 : 15,
    resizeMode: "contain",
    borderColor: "black",
    borderWidth: 3,
  },
  merchantImage2: {
    resizeMode: "contain",
    // position: "absolute",
    width: size / 8,
    height: size / 8,
    left: 0,
    borderRadius: 100,
  },
  borderImage2: {
    width: size / 2.5,
    height: size * 0.5,
    resizeMode: "contain",
    bottom: 0,
  },
  salesPoint2: {
    position: "absolute",
    backgroundColor: "#fff",
    justifyContent: "center",
    textAlign: "center",
    right: Platform.isPad ? 80 : 38,
    fontWeight: "bold",
  },
});

export default styles;
