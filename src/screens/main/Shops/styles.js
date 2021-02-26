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
    fontWeight: "bold",
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
    //backgroundColor: Colors.PRIMARY,
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
    color: Colors.PRIMARY,
  },
  categoriesContainer: {
    borderWidth: 0,
    shadowColor: "rgba(0, 0, 0, 0.38)",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1,
  },
  categoriesSelect: {
    backgroundColor: Colors.WHITE,
    borderWidth: 0,
    marginTop: 5,
    borderColor: "#373737",
  },
  categoriesButton: {
    borderWidth: 0,
    width: 200,
  },
  modalSelectTextStyle: {
    color: Colors.PRIMARY,
  },
  modalOptionTextStyle: {
    color: Colors.PRIMARY,
  },
  promotionTag: {
    fontSize: 13,
    backgroundColor: "#f18a22",
    justifyContent: "center",
    alignItems: "center",
    left: 5,
    top: 10,
    width: 70,
    height: 20,
  },
});

export default styles;
