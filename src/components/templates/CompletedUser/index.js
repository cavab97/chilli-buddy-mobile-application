import React from "react";
import styles from "./styles";

import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Image
} from "../../atoms";
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'
import { ImageInfo } from "../../molecules";

const rewardListItem = (item, index, uid) => {
  let timeCount = null;
  const startTime = item.route ? item.route.startTime : new Date();
  
  if (item.user.id && item.user.id === uid) {
    return (
      <View>
        <View style={styles.rowSelected}>
          <Text style={styles.indexSelected}>{index + 1}</Text>
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
            <Text style={styles.titleSelected}>You</Text>
            {/* <Text style={styles.prizeTitle}>
              Prize:
              {item.title}
            </Text> */}
          </View>
          <View>
            <Text style={styles.indexSelected}>NOT FINALIZE</Text>
          </View>
        </View>
        <View style={styles.line} />
      </View>
    );
  } else if (item.user.id && item.user.id !== uid) {
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
            <Text style={styles.title}>{item.user.displayName? item.user.displayName:"Awarded"}</Text>
          </View>
          <View>
            <Text style={styles.index}>NOT FINALIZE</Text>
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
            <Text style={styles.title}>Awarded</Text>
          </View>
          <View>
            <Text style={styles.index}>NOT FINALIZE</Text>
          </View>
        </View>
        <View style={styles.line} />
      </View>
    );
  }
};

const UserCompleted = ({
  data,
  uid,
  message,
  termsAndConditions,
  readLoading,
  noUserImage,
  noUserMessage
}) => {
  return (
    <View style={styles.container}>
      {readLoading?
          <View style={{flex:1}}>
            <ContentLoader
              speed={1}
              width={"100%"}
              height={95}
              backgroundColor= "#d9d9d9"
            >
              <Rect x="5" y="30" rx="4" ry="4" width="20" height="20" />
              <Circle cx="19%" cy="45" r="30"/>
              <Rect x="30%" y="35" rx="4" ry="4" width="30%" height="16" />
            </ContentLoader>
            <View style={styles.line} />
          </View>
        : data.length !== 0 ?
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => rewardListItem(item, index, uid)}
            keyExtractor={(item) => item.id}
          />

          :

          <View style={styles.noUserContainer}>
              <Image source={noUserImage} style={styles.noUserImageStyle} />
              <Text style={styles.noUserTitle}>{noUserMessage}</Text>
          </View>
      }
      
      <View style={styles.messageContainer}>
        <Text style={styles.textFontFamily}>{message}</Text>
        <Text style={styles.textColor}>{termsAndConditions}</Text>
      </View>
    </View>
  );
};

export { UserCompleted };
