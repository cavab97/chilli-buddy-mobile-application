import { StyleSheet } from "react-native";
import {
  padding,
  Colors,
  fontSize,
  fontFamily,
  windowWidth,
  normalize,
} from "../../../settings/styles/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  container2: {
    flex: 1,
  },
  containerpart1: {
    height: 200,
    marginTop: 160,
    justifyContent: "center",
    alignItems: "center",
  },
  containerpart2: {
    marginTop: 36,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  containerpart3: {
    marginTop: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  containerpart4: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  containerpart5: {
    flex: 1,
    alignItems: "center",
    height: "100%",
    minHeight: 100,
    marginTop: 50,
  },
  containerpart6: {
    alignItems: "center",
    //justifyContent: "flex-end",
    //marginBottom: 100,
  },
  errorContainer: {},
  logoImage: {
    width: 220,
    height: 170,
    alignSelf: "center",
  },
  subTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  errorText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  countDownText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  countDownTime: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 13,
  },
  resendTAC: {
    color: "#fff",
    textDecorationLine: "underline",
    fontSize: 16,
  },
  submitContainer: {
    backgroundColor: "#fff",
    borderRadius: 3,
    width: 328,
    height: 49,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  submitText: {
    color: Colors.PRIMARY,
    fontSize: 20,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default styles;
