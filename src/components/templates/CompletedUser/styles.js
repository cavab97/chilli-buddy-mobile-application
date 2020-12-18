import { Colors } from "../../../settings/styles/theme";

const styles = {
  container: {
    flex: 1,
    display: "flex",
    paddingHorizontal: 20,
  },
  rowSelected: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 20,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.PRIMARY,
    marginVertical: 5,
    borderRadius: 5,
  },
  row: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleSelected: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    paddingBottom: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 3,
    maxWidth: 120,
  },
  indexSelected: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    maxWidth: 80,
  },
  index: {
    color: Colors.PRIMARY,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "right",
  },
  subtitle: {
    fontSize: 12,
    textTransform: "capitalize",
    textAlign: "right",
    paddingBottom: 3,
  },
  image: {
    width: 60,
    height: 60,
  },
  imageFrame: {
    flex: 1,
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  currencyContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    paddingHorizontal: 10,
  },
  line: {
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY_LIGHTER,
    width: "100%",
    justifyContent: "center",
  },
  titleContainer: {
    flex: 1,
  },
  index: {
    color: Colors.PRIMARY,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    maxWidth: 80,
  },
  messageContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.GRAY_LIGHTEST,
    borderRadius: 5,
  },
  textColor: {
    color: Colors.PRIMARY,
    fontWeight: "bold",
    fontFamily: "RobotoRegular",
  },
  prizeTitle: {
    fontSize: 12,
  },
  textFontFamily: {
    fontFamily: "RobotoRegular",
  },
  noUserContainer: {
    flex: 1,
  },
  noUserImageStyle: {
    width: "100%",
    height: "70%",
    resizeMode: "contain",
  },
  noUserTitle: {
    marginTop: 10,
    fontWeight: "bold",
    alignSelf: "center",
    color: Colors.PRIMARY,
  },
};

export default styles;
