import { StyleSheet, Platform } from "react-native";
import { Dimensions } from "react-native";
import { Colors, Mixins } from "../../../settings/styles/theme";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // height: windowHeight / 20,
      marginHorizontal: 20,
    },
    card: {
      height: 170,
      width: 90,
      borderRadius: 30,
      backgroundColor: Colors.WHITE,
      padding: 15,
      shadowColor: "#979797",
      shadowOffset: {
          width: 0,
          height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 2.5,
      elevation: 3,
      marginRight: 15,
      marginLeft: 3,
      marginBottom: 15,
      marginTop: 15,
    },
    cardSelected: {
      height: 170,
      width: 90,
      borderRadius: 30,
      backgroundColor: Colors.PRIMARY,
      padding: 15,
      shadowColor: Colors.GREY,
      shadowOffset: {
          width: 0,
          height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 2.5,
      elevation: 3,
      marginRight: 15,
      marginLeft: 3,
      marginBottom: 15,
      marginTop: 15,
    },
    iconContainer: {
      height: 60,
      width: 60,
      borderRadius: 23,
      backgroundColor: Colors.WHITE,
      //padding: 15,
      shadowColor: "#979797",
      shadowOffset: {
          width: 0,
          height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 2.5,
      elevation: 3,
      justifyContent: 'center',
      alignItems: 'center'
    },
    title: {
      fontFamily: 'HorizontalRounded',
      marginTop: 20,
    },
    titleSelected: {
      fontFamily: 'HorizontalRounded',
      marginTop: 20,
      color: Colors.WHITE
    },
    icon: {
      width: 40, 
      height: 40,
    }
});

export default styles;