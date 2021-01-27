import { Colors } from "../../../settings/styles/theme";
import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: "#FFFFFF",
    height: "100%",
  },
  listItemContainer: {
    height: 55,
    borderWidth: 0.5,
    borderColor: "#ECECEC",
  },
  moreIcon: {
    backgroundColor: "#F55C22",
    alignItems: "center",
    borderColor: "transparent",
    borderRadius: 10,
    borderWidth: 1,
    height: 34,
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 18,
    width: 34,
  },
  rightTitle: {
    fontSize: 15,
    color: "#f18a22",
    alignSelf: "flex-end",
  },
  container: {
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
    /* borderRadius: 5,
    borderColor: "#ddd",
    borderBottomWidth: 1, */
    flexDirection: 'row'
  },
  avatarContainer: {
    //marginRight: 12,
    marginTop: 80,
    paddingLeft: 15,
  },
  userTitle: {
    justifyContent: "flex-start",
    fontSize: 21,
    fontFamily: "RobotoRegular",
    color: "#000",
    marginRight: 8,
    marginTop: 15,
  },
  userDesc: {
    fontSize: 14,
    fontFamily: "RobotoRegular",
    marginVertical: 2,
    color: "#000",
  },
  titleButton: {
    color: "#ffffff",
    fontFamily: "RobotoMedium",
    fontSize: 12,
  },
  editButton: {
    padding: 1,
    borderColor: "#F55C22",
    backgroundColor: "#F55C22",
    borderWidth: 1,
  },
  editProfileText: {
    fontSize: 12,
    fontFamily: "RobotoRegular",
    color: "#FFF",
  },
  editProfileTextContainer: {
    marginTop: 15,
    padding: 3,
    borderRadius: 5,
    backgroundColor: "#D60000",
  },
  editButtonContainer: {
    width: 80,
    marginVertical: 10,
    backgroundColor: "#F55C22",
  },
  textContainer1: {
    flexDirection: "row",
    marginTop: 80,
    paddingLeft: 15,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  textContainer2: {
    flexDirection: "row",
    paddingLeft: 15,
    alignItems: "flex-start",
    marginTop: 10,
  },
  textContainer3: {
    marginTop: 0,
    paddingLeft: 15,
    flexDirection: "row",
    //justifyContent: "center",
    alignItems: "flex-start",
  },
  userInfomationIcon: {
    textAlign: "center",
    textAlignVertical: "center",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    borderRadius: 5,
    borderColor: "#F55C22",
    borderWidth: 2,
    padding: 2,
    position: "absolute",
    top: 6,
    left: -12,
  },
  userEditIcon: {
    //textAlign: "center",
    //textAlignVertical: "center",
    //alignSelf: "center",
    //justifyContent: "center",
    //alignItems: "center",
    //alignContent: "center",
    borderRadius: 5,
    borderColor: "#919191",
    borderWidth: 2,
    //marginTop: 16,
    opacity: 0.6,
    position: "absolute",
  },
  multitabContainer: {
    marginTop: 60,
    width: "100%",
  },
  navFontStyle: {
    marginVertical: 6,
    fontFamily: "RobotoRegular",
  },
  btmContainer: {
    flex: 1,
  },
  pencilIconTouchableOpacityStyle: {
    padding: 12,
    top: 18,
  },

  //Notification Style
  //RewardCard
  /* cardContainer: {
        width: "95%",
        paddingHorizontal: 10,
        paddingBottom: 5
    },
    titleFont: {
        fontSize: 24,
        color: Colors.PRIMARY,
        width: "80%",
        fontFamily: "RobotoRegular",
    },
    cardSectionStyle: {
        borderBottomWidth: 0,
    },
    timeCountStyle: {
        fontSize: 12,
        fontFamily: "RobotoRegular",
        color: Colors.GRAY_DARK,
        alignSelf: "flex-end",
        paddingBottom: 3,
        flex: 1
    },
    descriptionStyle: {
        fontSize: 10,
        opacity: 0.59,
        flex: 5,
        fontFamily: "RobotoRegular",
    },
    descripCardSectionStyle: {
        justifyContent: "space-between",
        paddingLeft: 10,
        paddingRight: 10,
    },
    titleCardSectionStyle: {
        justifyContent: "space-between",
    },
    buttonCardSectionStyle: {
        justifyContent: "flex-end",
    },
    iconStyle: {
        flex: 1,
        paddingLeft: 20,
    }, */

  //Myaccount Style
  /* accountContainer: {
        flex: 1,
        paddingTop: 20,
    },
    accountMoreContainer: {
        flex: 1,
        paddingLeft: 15,
    },
    moreTextStyle: {
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: "RobotoRegular",
        color: Colors.GRAY_DARK,
    },
    listButtonStyle: {
        flexDirection: "row",
        paddingHorizontal: 30,
        paddingVertical: 20,
        justifyContent: "space-between",
    },
    listTitle: {
        fontSize: 17,
        fontFamily: "RobotoRegular",
    },
    versionTextStyle: {
        fontSize: 18,
        color: Colors.PRIMARY,
        fontWeight: "bold",
        fontFamily: "RobotoRegular",
    },
    signoutButtonStyle: {
        alignSelf: "center",
        padding: Platform.OS === 'ios' ? 20 : 20,
        marginBottom: Platform.OS === 'ios' ? 30 : 30,
        // position: "absolute",
        // bottom: -130,
    }, */

  //Myranking Style
  /* listSectionStyle: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginHorizontal: 20,
        paddingVertical: 20,
        borderColor: "#ddd",
        borderBottomWidth: 1,
    },
    innerSectionStyle: {
        alignItems: "center",
    },
    routeSectionStyle: {
        flex: 2,
    },
    rankSectionStyle: {
        flex: 1,
    },
    priceSectionStyle: {
        flex: 1,
    },
    titleRouteStyle: {
        fontSize: 17,
        fontWeight: "bold",
    },
    dateRouteStyle: {
        fontSize: 14,
        color: "#727272",
        fontWeight: "bold",
    },
    titleColumnStyle: {
        fontSize: 12,
        color: "#727272",
        fontWeight: "bold",
    },
    rankTextStyle: {
        fontSize: 20,
        color: Colors.PRIMARY,
        fontWeight: "bold",
        paddingTop: 6,
    },
    priceTextStyle: {
        fontSize: 13,
        color: Colors.PRIMARY,
        fontWeight: "600",
        paddingTop: 6,
        textAlign: "center",
    },
    eventButtonStyle: {
        width: 52,
        height: 52,
        position: 'absolute',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        shadowColor: Colors.BLACK,
        shadowOpacity: 0.16,
    },
    eventTextStyle: {
        fontSize: 9,
        fontWeight: 'bold',
        fontFamily: "RobotoRegular",
        color: Colors.WHITE,
        paddingTop: 4,
        textAlign: 'center',
    },
    eventButtonPosition: {
        bottom: 90,
        right: 50
    },
    luckyButtonPosition: {
        bottom: 20,
        right: 50
    },
    rankingContainer: {
        flex:1
    }, */
  image: {
    flex: 1,
    borderRadius: 60,
    width: null,
    //resizeMode: "cover",
    //width: "100%",
    //height: null
  },
  profileImageStyle: {
    backgroundColor: Colors.GRAY_DARK,
    height: 100,
    width: 100,
    borderRadius: 80,
  },
  scrollBox: {
    flex: 1,
  },
});

export default styles;
