import React from "react";
import styles from "./styles";
import { Image, View } from "../../atoms";
import { StyleSheet, Platform, Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const dimensions = Dimensions.get("window").width;
const imageWidth = Math.round((dimensions.width * 9) / 16);
import AutoImage from "react-native-autosize-image";

const ImageGenerator = ({ rowData }) => {
  // console.log("rowData: ", shopPosts.created.at.seconds);

  const data = [];

  for (let i = 0; i < rowData.length; i++) {
    // ImageSize(rowData[i]);
    data.push(
      <View key={i} style={{ justifyContent: "space-between", paddingVertical: 10 }}>
        {/* <Image
          resizeMode="contain"
          key={i}
          source={{ uri: rowData[i] }}
          style={{
            flex: 1,
            width: null,
            height: imageHeight,
            // marginVertical: 3,
          }}
        /> */}
        <AutoImage mainAxisSize={dimensions / 1.2} source={{ uri: rowData[i] }} />
      </View>
    );
  }

  return data;
};
export { ImageGenerator };
