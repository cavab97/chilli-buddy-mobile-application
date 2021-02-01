import { StyleSheet } from "react-native";
import { Colors } from "../../../../settings/styles/theme";

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
  },
  headerContainerStyle: {
    flex: 1,
    alignItems: "center",
  },
  titleStyle: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "RobotoRegular",
    color: Colors.PRIMARY,
    paddingVertical: 35,
  },
  redeemImageStyle: {
    width: "50%",
    height: "75%",
    resizeMode: "contain",
  },
  bodyContainerStyle: {
    flex: 1,
    alignItems: "center",
  },
  descriptStyle: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "RobotoRegular",
    color: Colors.PRIMARY,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  claimButtonContainer: {
    width: "50%",
    height: 40,
    marginVertical: 20,
    backgroundColor: Colors.PRIMARY,
  },
  claimButtonText: {
    color: "#fff",
  },
  container: {
    flex: 1,
    display: "flex",
    marginTop: 150,
    marginHorizontal: 15,
    paddingVertical: 5,
  },
  large: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
  },
});

export default styles;
