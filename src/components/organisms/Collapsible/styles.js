import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  subContainer3: {
    flex: 1,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "HorizontalRounded",
    marginTop: "5%",
    marginBottom: 8,
    marginLeft: 22,
  },
  newsTitleTextStyle: {
    fontSize: 16,
    fontFamily: "HorizontalRounded",
    marginBottom: 7,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    height: 40,
  },
  newsImage: {
    width: 159.2,
    height: 121.2,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  firstNewsCardStyle: {
    width: 161.2,
    marginLeft: 20,
    marginRight: 20,
    elevation: 3,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    marginBottom: 5,
  },
  newsCardStyle: {
    width: 161.2,
    marginRight: 20,
    elevation: 3,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    marginBottom: 5,
  },
});

export default styles;
