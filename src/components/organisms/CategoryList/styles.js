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
        width: 100,
        height: 100,
        // marginLeft: 20,
        marginRight: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,  
        elevation: 5,
        marginBottom: 6,
        paddingTop: 10,
        alignItems: "center",
    },
});

export default styles;