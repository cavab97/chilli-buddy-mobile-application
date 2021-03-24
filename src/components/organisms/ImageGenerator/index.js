import React from "react";
import styles from "./styles";
import { Image, View, ScrollView } from "../../atoms";
import { StyleSheet, Platform, Dimensions, FlatList } from "react-native";
const windowWidth = Dimensions.get("window").width;
const dimensions = Dimensions.get("window").width;
const imageWidth = Math.round((dimensions.width * 9) / 16);
import AutoImage from "react-native-autosize-image";

const ImageGenerator = ({ rowData }) => {
  // console.log("rowData: ", shopPosts.created.at.seconds);

  // const data = [];
  // for (let i = 0; i < rowData.length; i++) {
  //   // ImageSize(rowData[i]);
  //   data.push(
  //     <View key={i} style={{ justifyContent: "space-between", paddingVertical: 10 }}>
  //       {/* <Image
  //         resizeMode="contain"
  //         key={i}
  //         source={{ uri: rowData[i] }}
  //         style={{
  //           flex: 1,
  //           width: null,
  //           height: imageHeight,
  //           // marginVertical: 3,
  //         }}
  //       /> */}
  //       <AutoImage
  //         mainAxisSize={Platform.OS == "ios" ? dimensions / 1.24 : dimensions / 1.3}
  //         source={{ uri: rowData[i] }}
  //         style={{ backgroundColor: "grey" }}
  //       />
  //     </View>
  //   );
  // }

  // return data;
  getItemLayout = (data, index) => ({ length: 20, offset: 100 * index, index });

  return (
    <FlatList
      data={rowData}
      renderItem={({ item, index }) => (
        <View style={{ justifyContent: "space-between", paddingVertical: 10 }}>
          <AutoImage
            source={{ uri: item }}
            transition={false}
            mainAxisSize={Platform.OS == "ios" ? dimensions / 1.24 : dimensions / 1.3}
            resizeMethod="resize"
            style={{ backgroundColor: "grey" }}
          />
          {/* <TouchableOpacity
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
        </TouchableOpacity> */}
        </View>
      )}
      keyExtractor={(item) => item}
      getItemLayout={getItemLayout}
    />
  );
};
export { ImageGenerator };
