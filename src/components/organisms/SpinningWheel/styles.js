import { StyleSheet, Platform } from "react-native";
import { Colors } from "../../../settings/styles/theme";

const styles = StyleSheet.create({
  modelBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  //spinning wheel pop up container
  containerForSpinningWheel: {
    backgroundColor: "#D60000",
    borderRadius: 10,
    minWidth: Platform.OS === "ios" && Platform.isPad === true ? 460 : 300,
    height: Platform.OS === "ios" && Platform.isPad === true ? 950 : 530,
  },
  //spinning wheel image
  spinningWheelImage: {
    alignItems: "center",
    paddingBottom: 15,
    justifyContent: "center",
  },
  //spinning wheel modal title
  spinningTitle: {
    fontSize: Platform.OS === "ios" && Platform.isPad === true ? 36 : 18,
    paddingBottom: Platform.OS === "ios" && Platform.isPad === true ? 20 : 5,
    marginTop: "13%",
    fontFamily: "ZiTiQuanXinYiGuanHeiTi",
    color: Colors.WHITE,
  },

  //spinning wheel next modal title
  spinningTitle2: {
    fontSize: Platform.OS === "ios" && Platform.isPad === true ? 29 : 11,
    paddingBottom: Platform.OS === "ios" && Platform.isPad === true ? 20 : 5,
    marginTop: "13%",
    fontFamily: "ZiTiQuanXinYiGuanHeiTi",
    color: Colors.WHITE,
  },
  //sub Title
  subTitle: {
    fontSize: Platform.OS === "ios" && Platform.isPad === true ? 36 : 18,
    paddingBottom: Platform.OS === "ios" && Platform.isPad === true ? 20 : 5,
    marginTop: 5,
    fontFamily: "ZiTiQuanXinYiGuanHeiTi",
    color: Colors.WHITE,
    textAlign: "center",
  },
  //category text holder
  categoryTextHolder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  //category Text
  categoryText: {
    fontSize: Platform.OS === "ios" && Platform.isPad === true ? 23 : 15,
    color: "#ffffff",
    fontFamily: "ZiTiQuanXinYiGuanHeiTi",
    marginVertical: 16,
    textAlign: "center",
  },
  //random category text
  buttonText: {
    fontSize: Platform.OS === "ios" && Platform.isPad === true ? 23 : 15,
    color: "#ffffff",
    fontFamily: "ZiTiQuanXinYiGuanHeiTi",
    marginVertical: 16,
    textAlign: "center",
  },
  //random Category button
  categoriesButton: {
    backgroundColor: "#D60000",
    width: Platform.OS === "ios" && Platform.isPad === true ? 450 : 220,
    borderRadius: 10,
    height: Platform.isPad ? 70 : 50,
    marginRight: "auto",
    marginLeft: "auto",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    padding: Platform.isPad ? 0 : 0,
  },
  //close spinning wheel modal
  closeWheelModal: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
export default styles;
