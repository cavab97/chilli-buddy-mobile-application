import { StyleSheet, ColorPropType, Platform } from "react-native";
import { Colors, Mixins } from "../../../../settings/styles/theme";

const styles = StyleSheet.create({
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
  promoTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    paddingTop: 10,
    alignSelf: "center",
  },
  categoryContainer: {
    flexDirection: "row",
    width: "90%",
    paddingTop: 10,
    alignSelf: "center",
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
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 100,
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
    marginTop: 30,
    alignSelf: "center",
    height: "auto",
    flex: 1,
    flexDirection: "row",
  },
  flatList: {
    minHeight: Mixins.WINDOW_HEIGHT - 300,
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
    fontSize: 12,
    color: Colors.GREY,
    fontFamily: "HorizontalRounded",
  },
  descriptionContainer: {
    paddingHorizontal: 8,
    paddingVertical: 0,
    borderBottomWidth: 0,
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    fontSize: 16,
    fontFamily: "HorizontalRounded",
    flex: 1,
    flexWrap: "wrap",
  },
  subtitle: {
    fontSize: 12,
    fontFamily: "HorizontalRounded",
    flex: 1,
    flexWrap: "wrap",
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
    fontFamily: "RobotoBold",
  },
  bookmarkIcon: {
    position: "absolute",
    right: 5,
    bottom: 0,
  },
  leftCardContainer: {
    width: "35%",
  },
  rightCardContainer: {
    width: "65%",
    height: 100,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  button: {
    shadowColor: Colors.GREY, 
    shadowOffset: { 
        height: 0, 
        width: 0 
    }, 
    shadowOpacity: 0.4,
    shadowRadius: 1.5, 
    backgroundColor: Colors.WHITE,
    elevation: 2,  
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center'
  },
  iconButton: {
    fontFamily: 'HorizontalRounded', 
    paddingRight: 5
  }
});

export default styles;
