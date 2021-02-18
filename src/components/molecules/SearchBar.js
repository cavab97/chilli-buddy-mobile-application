import { TouchableOpacity } from "@components/atoms/index";
import React, { PureComponent } from "react";
import { StyleSheet, Platform, Dimensions } from "react-native";
import { Image, View, TextInput } from "../atoms";
const windowWidth = Dimensions.get("window").width;

const SearchBar = (props) => {
  return (
    <View style={styles.searchBarStyle}>
      <TextInput
        placeholder={props.placeholder}
        keyboardShouldPersistTaps
        onChangeText={props.onChangeText}
        placeholderTextColor={"#f7d0d0"}
        style={styles.innerContainer}
      />
      <TouchableOpacity>
        <Image
          style={styles.searchIcon}
          source={require("../../assets/chilliBuddy2.0Icon/chilliBuddyMainScreenIconV2/Search_Icon.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchIcon: {
    width: 70,
    height: 70,
    aspectRatio: 120 / 130,
    right: 0,
    bottom: 0,
    alignSelf: "flex-end",
  },
  searchBarStyle: {
    backgroundColor: "#FFF",
    // borderWidth: 1, //no effect
    borderRadius: 25,
    shadowColor: "#000",
    shadowRadius: 1.22,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    // justifyContent: "space-between",

    flex: 1,
    // alignSelf: "flex-end",
  },
  innerContainer: {
    marginLeft: 20,
    // marginRight: 10,
    // height: 50,
    // borderColor: "#86d972",
    // borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 10,
    // alignSelf: "flex-end",
    width: "77%",
  },
});

export { SearchBar };
