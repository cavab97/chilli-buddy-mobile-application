import { StyleSheet } from "react-native";
import { Colors, Mixins, Typography } from "../../../../settings/styles/theme";

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  slide2: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  posterArea: {
    flex: 1,
    height: 250,
  },
  subContainer1: {
    flex: 1,
    height: 250,
  },
  container: {
    flex: 1,
    display: "flex",
    marginTop: 10,
    marginHorizontal: 15,
    paddingVertical: 5,
  },
  actionDotStyle: {
    // backgroundColor: '#ffffff',
    width: 6,
    height: 6,
    // borderRadius: 7,
    // marginLeft: 7,
    // marginRight: 7
  },
  dotStyle: {
    // backgroundColor: '#999999',
    width: 6,
    height: 6,
    // borderRadius: 7,
    // marginLeft: 7,
    // marginRight: 7
  },
  paginationStyle: {
    bottom: 20,
  },
  imageTopStyle: {
    width: "100%",
    height: "100%",
  },
  logoPosition: {
    width: 70,
    height: 70,
    alignSelf: "center",
    position: "absolute",
    top: 210,
    zIndex: 5,
  },
  logo: {
    width: "100%",
    height: "100%",
    borderRadius: 35,
  },
  detailArea: {
    width: "100%",
    paddingLeft: "5%",
    //paddingRight: "5%", uncomment this at social media icon
    paddingTop: "5%",
    marginTop: 0,
    marginBottom: 20,
    alignSelf: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 25,
    fontWeight: "700",
    fontFamily: "HorizontalRounded",
    marginBottom: 10,
    marginTop: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "HorizontalRounded",
    marginTop: 30,
  },
  detail: {
    fontSize: 18,
    marginTop: 15,
    flexDirection: "row",
  },
  subIconDetail: {
    margin: 3,
  },
  subIconDetailMain: {
    width: 30,
    marginTop: 15,
  },
  setRow: {
    flexDirection: "row",
  },
  operatingHour: {},
  operatingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  postLabel: {
    // color: Colors.BLACK,
    color: Colors.WHITE,
    fontSize: 21,
    paddingTop: 12,
    paddingLeft: 20,
    fontWeight: "bold",
  },
  postContainer: {
    width: "100%",
    height: 50,
    // borderWidth: 2,
    // borderColor: Colors.GRAY_MEDIUM,
    backgroundColor: Colors.PRIMARY,
  },
  postIconSwap: {
    position: "absolute",
    top: 11,
    right: 20,
    // color: Colors.BLACK
    color: Colors.WHITE,
  },
  coverImageSwapLeft: {
    position: "absolute",
    color: Colors.GRAY_LIGHT,
    top: 110,
    left: 10,
  },
  coverImageSwapRight: {
    position: "absolute",
    color: Colors.GRAY_LIGHT,
    top: 110,
    right: 10,
  },
  singlePostContainer: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    margin: 10,
  },
  singlePostTitle: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: Typography.FONT_FAMILY_BOLD,
    paddingBottom: 10,
  },
  singlePostDescription: {
    fontSize: 14,
    paddingBottom: 20,
  },
  firstPromoteCardStyle: {
    width: 181.2,
    marginLeft: 20,
    marginRight: 20,
    elevation: 3,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    marginBottom: 6,
  },
  promoteCardStyle: {
    width: 181.2,
    marginRight: 20,
    elevation: 3,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    marginBottom: 6,
  },
  promoteImage: {
    width: 179.2,
    height: 121.2,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  promoteNoImage: {
    width: 179.2,
    height: 121.2,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    //resizeMode: "center",
  },
  promoteTitleTextStyle: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "HorizontalRounded",
    marginBottom: 7,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    height: 55,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: "700",
    fontFamily: "HorizontalRounded",
    marginTop: "5%",
    marginBottom: 8,
    marginLeft: 22,
  },
});

export default styles;
