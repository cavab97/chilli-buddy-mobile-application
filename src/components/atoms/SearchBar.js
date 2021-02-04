import React from "react";
import * as ReactNativeElements from "react-native-elements";

const SearchBar = (props) => {
  const { ...prop } = props;

  return <ReactNativeElements.SearchBar {...prop}>{props.children}</ReactNativeElements.SearchBar>;
};

export { SearchBar };
