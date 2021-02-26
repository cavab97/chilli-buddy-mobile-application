import { StyleSheet, ColorPropType, Platform } from "react-native";
import { Colors, Mixins } from "../../../settings/styles/theme";

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
});

export default styles;
