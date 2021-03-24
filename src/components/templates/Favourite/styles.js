import { StyleSheet, ColorPropType, Platform } from "react-native";
import { Colors, Mixins } from "../../../settings/styles/theme";

const styles = StyleSheet.create({
  shopImage: {
    width: "100%",
    height: Platform.isPad ? 350 : 200,
    borderRadius: 20,
  },
  emptySection: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  promoTitleContainer: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10,
    width: "90%",
    alignSelf: "center",
    // backgroundColor: "yellow",
  },
  iconContainer: {
    flexDirection: "row",
    paddingTop: 5,
  },
  pageTitle: {
    fontSize: 30,
    color: Colors.PRIMARY,
    fontFamily: "HorizontalRounded",
  },
  imageContainer: {
    borderBottomWidth: 0,
    padding: 0,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 0,
  },
  image: {
    width: Platform.isPad ? "100%" : "100%",
    height: Platform.isPad ? 200 : 95,
    borderRadius: 20,
  },
  emptyHeartIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
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
  cardContainer: {
    width: "90%",
    marginTop: 20,
    backgroundColor: "#fff",
    alignSelf: "center",
    height: "auto",
    flex: 1,
    flexDirection: "row",
  },
  shopCardContainer: {
    width: "90%",
    marginTop: 20,
    backgroundColor: "#fff",
    alignSelf: "center",
    height: "auto",
  },
  flatList: {
    minHeight: Mixins.WINDOW_HEIGHT - 300,
    paddingBottom: 60,
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
    textShadowColor: Colors.SECONDARY,
    //textShadow: "0 0 3px #000",
  },
  distanceIcon: {
    height: 15,
    width: 15,
    marginRight: 5,
  },
  detail: {
    fontSize: Platform.isPad ? 20 : 12,
    color: Colors.GREY,
    fontFamily: "HorizontalRounded",
    paddingLeft: Platform.isPad ? 0 : 7,
  },
  descriptionContainer: {
    paddingHorizontal: Platform.isPad ? 8 : 15,
    paddingVertical: 0,
    borderBottomWidth: 0,
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    fontSize: Platform.isPad ? 30 : 16,
    fontFamily: "HorizontalRounded",
    flex: 1,
    flexWrap: "wrap",
    paddingLeft: Platform.isPad ? 0 : 7,
  },
  subtitle: {
    fontSize: Platform.isPad ? 25 : 12,
    fontFamily: "HorizontalRounded",
    flex: 1,
    flexWrap: "wrap",
    paddingLeft: Platform.isPad ? 0 : 7,
  },
  favouriteIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  textContainer: {
    paddingHorizontal: 8,
    borderBottomWidth: 0,
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
  bookmarkIcon: {
    position: "absolute",
    right: 5,
    bottom: 0,
  },
  topSubText: {
    fontFamily: "HorizontalRounded",
    fontSize: 18,
    width: "90%",
    paddingBottom: 10,
    // backgroundColor: "red",
    alignSelf: "center",
  },
  promotionWrapper: {
    width: 100,
    height: 40,
    resizeMode: "contain",
  },
  profile: {
    //backgroundColor: Colors.PRIMARY,
    borderRadius: 30,
    //justifyContent: "center",
    //alignItems: "center",
    position: "absolute",
    top: 15,
    left: -3,
  },
});

export default styles;
