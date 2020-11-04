import React from "react";
import styles from "./styles";

import {
  FlatList,
  Text,
  View
} from "../../../atoms";

import ContentLoader, { Rect, Circle } from 'react-content-loader/native'
import { ImageInfo } from "../../../molecules";

const rewardListItem = (item, index) => {
  if (item.obtained.by) {
    return (
      <View>
        <View style={styles.row}>
          <Text style={styles.index}>{index + 1}</Text>
          <View style={styles.imageContainer}>
            <ImageInfo
              banner={
                item.user.photoURL
                  ? item.user.photoURL
                  : require("../../../../assets/DefaultAvatar.jpg")
              }
              imageContainer={styles.image}
              imageStyle={styles.imageFrame}
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{item.user.displayName? item.user.displayName :"Awarded"}</Text>
            <Text style={styles.prize}>Prize: {item.title}</Text>
          </View>
        </View>
        <View style={styles.line} />
      </View>
    );
  } else {
    return (
      <View>
        <View style={styles.row}>
          <Text style={styles.index}>{index + 1}</Text>
          <View style={styles.imageContainer}>
            <ImageInfo
              banner={require("../../../../assets/DefaultAvatar.jpg")}
              imageContainer={styles.image}
              imageStyle={styles.imageFrame}
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>No winner</Text>
            <Text style={styles.prize}>Prize: {item.title}</Text>
          </View>
        </View>
        <View style={styles.line} />
      </View>
    );
  }
};

const LuckyDrawWinnerRanking = ({ data, prizeTitle, readLoading }) => {
  return (
    <View style={styles.container}>
      {readLoading?
        <View>
          <ContentLoader
            speed={1}
            width={"100%"}
            height={90}
            backgroundColor= "#d9d9d9"
          >
            <Rect x="0" y="30" rx="4" ry="4" width="20" height="20" />
            <Circle cx="19%" cy="45" r="30"/>
            <Rect x="30%" y="25" rx="4" ry="4" width="30%" height="16" />
            <Rect x="30%" y="50" rx="4" ry="4" width="20%" height="16" />
            
          </ContentLoader>
          <View style={styles.line} />
        </View>
      :
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => rewardListItem(item, index)}
          keyExtractor={(item) => item.id}
        />
      }
    </View>
  );
};

export { LuckyDrawWinnerRanking };
