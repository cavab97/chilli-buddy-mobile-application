import { TouchableOpacity } from "@components/atoms/index";
import React, { PureComponent } from "react";
import { StyleSheet, Platform, Dimensions, Keyboard } from "react-native";
import { Image, View, TextInput } from "../atoms";
import { ActivityIndicator } from "@components/atoms";
const numColumns = 5;

const size = Dimensions.get("window").width / numColumns;

const SearchBar = (props) => {
  // console.log(props.mainScreenMessageBoolean);
  return (
    <View style={styles.searchBarStyle}>
      {props.isFocused ? (
        <TouchableOpacity onPress={props.backSearch}>
          <Image
            style={styles.backIcon}
            source={require("../../assets/chilliBuddy2.0Icon/chilliBuddySearchIcon/backSearch.png")}
          />
        </TouchableOpacity>
      ) : (
        <View />
      )}

      <TextInput
        placeholder={props.placeholder}
        keyboardShouldPersistTaps
        onChangeText={props.searchFilterFunction}
        placeholderTextColor={"#f7d0d0"}
        style={styles.innerContainer}
        name="search"
        value={props.dataSearch === "null" ? "" : props.dataSearch}
        onFocus={props.handleInputFocus}
      />
      <TouchableOpacity
        onPress={props.searchButtonClick}
        // activeOpacity={1}
      >
        <Image
          style={styles.searchIcon}
          source={require("../../assets/chilliBuddy2.0Icon/chilliBuddyMainScreenIconV2/Search_Icon.png")}
        />
        {props.loading || props.readLoading ? (
          <ActivityIndicator size="small" color="black" style={styles.smallRedeemImageStarStyle} />
        ) : (
          <View />
        )}
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
    left: Platform.isPad ? 80 : 0,
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
  smallRedeemImageStarStyle: {
    width: "50%",
    height: "50%",
    right: size / 1.3,
    resizeMode: "contain",
    top: Platform.isPad ? size / 3 : 28,
    position: "absolute",
    zIndex: 1,
  },
  backIcon: {
    // width: "50%",
    // height: "50%",
    resizeMode: "contain",
    width: 22,
    height: 22,
    aspectRatio: 120 / 130,
    left: 5,
  },
});

export { SearchBar };
