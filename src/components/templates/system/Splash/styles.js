import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    // resizeMode: "cover",
    // height: "50%",
    // width: "90%",
    marginVertical: 100,
  },
  restaurant: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  chilliIcon: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  dot: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});

export default styles;
