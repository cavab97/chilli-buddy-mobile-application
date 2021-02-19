import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "red",
    // flexDirection: "column",
    // justifyContent: "space-between",
    alignItems: "center",
    // resizeMode: "cover",
    // height: 100,
    // width: 200,
    // marginVertical: 100,
    // resizeMode: "contain",
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
  image: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },
});

export default styles;
