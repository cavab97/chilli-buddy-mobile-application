import React, { PureComponent } from "react";
import { StyleSheet, Dimensions, List, FlatList } from "react-native";

import { ListItem } from "react-native-elements";

import { Image, View, TextInput, Text } from "../atoms";
import { TouchableOpacity } from "@components/atoms/index";
import { Colors } from "../../settings/styles/theme";

const windowWidth = Dimensions.get("window").width;
const clock = require("../../assets/chilliBuddy2.0Icon/chilliBuddySearchIcon/clock.png");

const SearchFlatList = (props) => {
  let data;
  // const data = [
  //   { id: "1", title: "First item" },
  //   { id: "2", title: "Second item" },
  //   { id: "3", title: "Third item" },
  //   { id: "4", title: "Fourth item" },
  // ];
  console.log(" props.historySearchStore");

  // console.log(Object.keys(props.historySearchStore).length === 0);
  if (props.historySearchStore !== null) {
    if (props.historySearchStore !== undefined) {
      if (Object.keys(props.historySearchStore).length > 0) {
        data = props.historySearchStore.map(function (item, index) {
          return {
            title: item,
            id: index,
          };
        });
      } else {
        data = [];
      }
    } else {
      data = [];
    }
  } else {
    data = [];
  }
  // console.log("props.historySearchStore");
  // console.log(data);
  // for (let i = 0; 4 < data.length; i++) {
  //   data[i].title.toLowerCase().include(props.dataSearch.toLowerCase());
  // }

  // data.title.toLowerCase().include(props.dataSearch.toLowerCase());
  let matches = data.filter((v) => v.title.toLowerCase().includes(props.dataSearch.toLowerCase()));

  if (data.length !== 0) {
    return (
      <View style={styles.mainView}>
        {/* <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}> */}
        <View style={styles.historyFirstRow}>
          <Text style={styles.historyTitle}>History</Text>
          <TouchableOpacity onPress={props.removeAllPress}>
            <Text style={styles.clearAllTitle}>Clear All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={matches}
          renderItem={({ item }) => (
            <View style={styles.historyDetail}>
              <Image source={clock} transition={false} style={styles.smallClock} />
              <TouchableOpacity
                style={styles.titleView}
                onPress={() => props.selectHistory(item.title)}
              >
                <Text style={styles.subtitleFood}>{item.title}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.ErrorView}
                onPress={() => props.specificMarkPress(item)}
              >
                <Text style={styles.subtitleError}>x</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.mainView}>
        {/* <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}> */}
        <View style={styles.historyFirstRow}>
          <Text style={styles.historyTitle}>History</Text>
          <TouchableOpacity>
            <Text style={styles.clearAllTitle}>Clear All</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
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
    flex: 1,
  },
  innerContainer: {
    marginLeft: 20,
    paddingLeft: 5,
    paddingRight: 10,
    width: "77%",
  },
  // mainView: { po },
  titleView: {
    height: 25,
    width: "80%",
  },
  ErrorView: {
    height: 25,
  },
  subtitleFood: {
    fontSize: 15,
  },
  clearAllTitle: {
    color: "red",
    fontFamily: "HorizontalRounded",
    color: Colors.RED,
  },
  historyFirstRow: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingBottom: 10,
    paddingTop: 10,
  },
  historyTitle: {
    color: "black",
    fontFamily: "HorizontalRounded",
    fontSize: 20,
  },
  historyDetail: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 12,
    marginTop: 10,
  },
  smallClock: {
    width: 20,
    height: 19,
    resizeMode: "contain",
  },
  subtitleError: {
    width: 20,
    height: 20,
    textAlign: "center",
    fontSize: 20,
    color: "grey",
  },
});

export { SearchFlatList };
