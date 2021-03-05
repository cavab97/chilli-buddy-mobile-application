import React, { PureComponent } from "react";
import { StyleSheet, Dimensions, FlatList, View } from "react-native";
import { ListItem } from "react-native-elements";
import { SearchBar } from "../../molecules";
const windowWidth = Dimensions.get("window").width;

const SearchFlatList = (props) => {
  return (
    // <FlatList
    //   data={props.data}
    //   renderItem={({ item }) => (
    //     <ListItem
    //       // roundAvatar
    //       title={`${item.title}`}
    //       subtitle={item.title}
    //       // avatar={{ uri: item.picture.thumbnail }}
    //       containerStyle={{ borderBottomWidth: 0 }}
    //     />
    //   )}
    //   ListHeaderComponent={() => (
    //     <SearchBar
    //       placeholder={props.placeholder}
    //       searchFilterFunction={props.searchFilterFunction}
    //       //   data={props.data}
    //       //   value={props.value}
    //     />
    //   )}
    //   keyExtractor={(item) => item.title}
    // />
    <Text>hello</Text>

    //   console.log(props.data);
  );

  //   <ListItem
  //   // roundAvatar
  //   //   title={item.title}
  //   // subtitle={item.email}
  //   // avatar={{ uri: item.picture.thumbnail }}
  //   // containerStyle={{ borderBottomWidth: 0 }}
  //   />
  //   )}
  // keyExtractor={(item) => item.title}
  // ItemSeparatorComponent={this.renderSeparator}
  //   ListHeaderComponent={() => <SearchBar />}
  //   />
};
export { SearchFlatList };
