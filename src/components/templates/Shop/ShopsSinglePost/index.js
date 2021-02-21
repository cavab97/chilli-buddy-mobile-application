import React from "react";
import styles from "./styles";

import HTML from "react-native-render-html";
import moment from "moment";
import { ImageGenerator } from "../../../organisms/ImageGenerator";

import {
  View,
  Image,
  Text,
  ScrollView,
  FlatList,
  Carousel,
  TouchableOpacity,
  Button,
  Overlay,
  Modal,
} from "@components/atoms";
const shareIcon = require("../../../../assets/chilliBuddy2.0Icon/chilliBuddySingleShopV2/shareArrow_Icon.png");
const noImageV2 = require("../../../../assets/chilliBuddy2.0Icon/chilliBuddySingleShopV2/noImageBackground.jpeg");

const ShopsSinglePost = ({
  shopPosts,
  icon,
  dataSource,
  readPostLoading,
  catchCondition,
  find_dimensions = () => {},
}) => {

  const PostList = ({ data }) => {
    if (data.length !== 0) {

      return (
        <ScrollView>
          <View
            onLayout={(event) => {
              find_dimensions(event.nativeEvent.layout);
            }}
          >
            <ScrollView>
              <View style={styles.singlePostContainer}>
                <Text style={styles.singlePostTitle}>{data.title}</Text>
                {/* <Text style={singlePostDescription}>{item.description}</Text> */}
                {/* {console.log(item.id)} */}
                <HTML
                  source={{ html: `<div>` + data.description + `</div>` }}
                  // alterData={alterData}
                  tagsStyles={{
                    p: {
                      padding: 0,
                      margin: 0,
                    },
                    ol: {
                      padding: 0,
                      marginBottom: 30,
                      margin: 0,
                    },
                    li: {
                      padding: 0,
                      margin: 0,
                    },
                    ul: {
                      padding: 0,
                      margin: 0,
                    }
                  }}
                />

                {data.images.length < 1 ? (
                  <Image style={styles.chatBoxInnerImage} source={noImageV2} />
                ) : (
                  <ImageGenerator rowData={data.images} />
                )}

                {/* <Text>create at: {item.created.at}</Text> */}
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView>
          <View style={styles.singlePostContainer}>
            <Text style={styles.singlePostTitle}>
              Currently there are no post available
            </Text>
          </View>
        </ScrollView>
      );
    }
  };

  if (readPostLoading) {
    return (
      <View>
        <Text>no available</Text>
      </View>
    );
  } else {
    return (
      <ScrollView 
        style={styles.outPostContainer} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.postsTopRow}>
          <View style={styles.logoPositionInModal}>
            <Image 
              style={styles.logo} 
              source={icon} 
            />
            {/* <Image source={} style={} resizeMode={"cover"} /> */}
          </View>
          <View style={styles.postsTopRowNameContainer}>
            <Text style={styles.ShopPostTopTitle}>
              {shopPosts.shop.displayTitle}
            </Text>
            <Text style={styles.ShopPostSubTitle}>
              {catchCondition}
            </Text>
          </View>
          <TouchableOpacity style={styles.shareContainer}>
            <Text style={styles.shareText}>
              Share
            </Text>
            <Image style={styles.shareIcon} source={shareIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.shopPostsContainer}>
          <PostList data={shopPosts} />
        </View>
      </ScrollView>
    );
  }
};

export { ShopsSinglePost };
