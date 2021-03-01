import { StyleSheet, ColorPropType, Platform } from "react-native";
import { Colors, Mixins } from "../../../../settings/styles/theme";

const styles = StyleSheet.create({
  shopContainer: {
    height: "100%",
  },
  shopTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
    paddingTop: 10,
  },
  iconContainer: {
    flexDirection: "row",
    paddingTop: 5,
  },
  emptyHeartIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginRight: 15,
  },
  filterIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  categoryTitleContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 10,
  },
  categoryTitle: {
    fontFamily: "HorizontalRounded",
    fontSize: 18,
  },
  cardContainer: {
    width: "90%",
    marginTop: 30,
    backgroundColor: "#fff",
    alignSelf: "center",
    height: "auto",
  },
  favouriteIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  imageContainer: {
    borderBottomWidth: 0,
    padding: 0,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    zIndex: 0,
  },
  pageTitle: {
    fontSize: 30,
    color: Colors.PRIMARY,
    fontFamily: "HorizontalRounded",
  },
  image: {
    width: "100%",
    height: Platform.isPad ? 400 : Platform.OS === "ios" ? 210 : 200,
    borderRadius: 20,
  },
  textContainer: {
    paddingTop: 15,
    paddingHorizontal: 5,
    borderBottomWidth: 0,
  },
  descriptionContainer: {
    paddingHorizontal: 5,
    paddingVertical: 0,
    borderBottomWidth: 0,
    alignItems: "center",
    flexDirection: "row",
  },
  distanceIcon: {
    height: 15,
    width: 15,
    marginRight: 5,
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
  promotionWrapper: {
    width: 100,
    height: 40,
    resizeMode: "contain",
  },
  flatList: {
    minHeight: Mixins.WINDOW_HEIGHT - 300,
    marginBottom: Mixins.WINDOW_HEIGHT / 15,
  },
  title: {
    fontSize: 16,
    // fontWeight: "bold",
    fontFamily: "HorizontalRounded",
  },
  detail: {
    fontSize: 12,
    color: Colors.GREY,
    fontFamily: "HorizontalRounded",
  },
  checkbox: {
    backgroundColor: Colors.GRAY_LIGHT,
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
    borderColor: Colors.PRIMARY, //"#373737",
  },
  categoriesButton: {
    //borderWidth: 1.2,
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

  promotionTagView: {
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: Colors.PRIMARY,
    borderColor: Colors.PRIMARY,
    left: 0,
    top: 10,
    width: 75,
    height: 20,
  },

  favourite: {
    //backgroundColor: Colors.PRIMARY,
    //borderRadius: 30,
    position: "absolute",
    width: 60,
    height: 60,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    textShadowColor: Colors.SECONDARY,
    //textShadow: "0 0 3px #000",
  },

  promotionTag: {
    fontSize: 13,
    color: "white",
    textAlign: "center",
    fontWeight: "500",
  },
});

export default styles;
