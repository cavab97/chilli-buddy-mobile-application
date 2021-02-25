import React from "react";
import moment from "moment";
import styles from "./styles";

import { View, Image, Text, FlatList, ImageBackground, TouchableOpacity } from "@components/atoms";

import { NotFoundFooter } from "@components/molecules";

const chatBoxImage = require("../../../assets/chilliBuddy2.0Icon/chilliBuddySingleShopV2/ChatBox_background.png");
const shareIcon = require("../../../assets/chilliBuddy2.0Icon/chilliBuddySingleShopV2/shareArrow_Icon.png");
const defaultImage = require("../../../assets/chilliBuddy2.0Icon/chilliBuddySingleShopV2/noImageBackground.jpeg");

const Post = ({ item, icon, onPostPress, SharePress }) => {
  return (
    <View>
      <View style={styles.postsTopRow}>
        <View style={styles.logoPositionInModal}>
          <Image style={styles.logo} source={icon} />
        </View>
        <TouchableOpacity
          style={styles.chatbox} //chatboxcontainer
          onPress={() => onPostPress(item)}
          activeOpacity={1}
        >
          {/* <ImageBackground style={styles.chatBoxImg} source={chatBoxImage}> */}
          {/* <View style={styles.chatbox}> */}
            <View style={styles.chatBoxTopText}>
              <Text style={styles.chatBoxText} numberOfLines={2}>
                {item.title}{" "}
              </Text>
              <TouchableOpacity onPress={() => SharePress(item)}>
                <Image style={styles.shareIcon} source={shareIcon} />
              </TouchableOpacity>
            </View>
            {item.images[0] === undefined ? (
              <Image style={styles.chatBoxInnerImage} source={defaultImage} />
            ) : (
              <Image
                style={styles.chatBoxInnerImage}
                source={{
                  uri: item.images[0],
                }}
              />
            )}
          {/* </View> */}
          {/* </ImageBackground> */}
        </TouchableOpacity>
      </View>
      <Text style={styles.daysText}>{moment(item.created.at).fromNow()}</Text>
    </View>
  );
};

const PostList = ({ data, icon, onPostPress, SharePress }) => {
  if (data.length > 0) {
    return (
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Post item={item} icon={icon} onPostPress={onPostPress} SharePress={SharePress} />
        )}
      />
    );
  } else {
    return <NotFoundFooter message="No post available." />;
  }
};

export { PostList };
