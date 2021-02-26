import React from "react";
import styles from "./styles";
import { Dimensions, Platform } from "react-native";

import HTML from "react-native-render-html";
import moment from "moment";
import { ImageGenerator } from "../../../organisms/ImageGenerator";
import ContentLoader, { Rect } from "react-content-loader/native";

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
const windowWidth = Dimensions.get("window").width;

const ShopsSinglePost = ({
  shopPosts,
  icon,
  dataSource,
  readPostLoading,
  catchCondition,
  find_dimensions = () => {},
  SharePress,
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
                  tagsStyles={{
                    p: {
                      fontFamily: "HorizontalRounded",
                      padding: 0,
                      fontSize: Platform.isPad ? windowWidth / 30 : 10,
                      lineHeight: Platform.isPad ? 0 : 10,
                    },
                    ol: {
                      padding: 0,
                      // marginBottom: 30,
                      margin: 0,
                      fontSize: Platform.isPad ? windowWidth / 20 : 10,
                    },
                    li: {
                      padding: 0,
                      margin: 0,
                      marginTop: 3,
                      fontSize: Platform.isPad ? windowWidth / 20 : 10,
                    },
                    ul: {
                      padding: 0,
                      margin: 0,
                      fontSize: Platform.isPad ? windowWidth / 20 : 10,
                      lineHeight: 5,
                    },
                  }}
                  style={styles.singlePostTitle}

                  // alterData={alterData}
                  // tagsStyles={
                  //   ({
                  //     p: {
                  //       // padding: 0,
                  //       // margin: 0,
                  //     },
                  // ol: {
                  //   padding: 0,
                  //   marginBottom: 30,
                  //   margin: 0,
                  // },
                  // li: {
                  //   padding: 0,
                  //   margin: 0,
                  // },
                  // ul: {
                  //   padding: 0,
                  //   margin: 0,
                  // },
                  //   },
                  //   styles.singlePostTitle)
                  // }
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
            <Text style={styles.singlePostTitle}>Currently there are no post available</Text>
          </View>
        </ScrollView>
      );
    }
  };

  if (readPostLoading) {
    return (
      <ContentLoader speed={1} width={"100%"} height={"100%"} backgroundColor="#d9d9d9">
        <Rect x="0" y="0" rx="0" ry="0" width="100%" height="150" />
        <Rect x="10" y="100" rx="100" ry="100" width="25%" height="15%" />
        <Rect x="20" y="200" rx="10" ry="10" width="250" height="175" />
        <Rect x="20" y="400" rx="10" ry="10" width="250" height="175" />
      </ContentLoader>
    );
  } else {
    return (
      <ScrollView style={styles.outPostContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.postsTopRow}>
          <View style={styles.logoPositionInModal}>
            <Image style={styles.logo} source={icon} />
            {/* <Image source={} style={} resizeMode={"cover"} /> */}
          </View>
          <View style={styles.postsTopRowNameContainer}>
            <Text style={styles.ShopPostTopTitle}>{shopPosts.shop.displayTitle}</Text>
            <Text style={styles.ShopPostSubTitle}>{catchCondition}</Text>
          </View>
          <TouchableOpacity
            style={styles.shareContainer}
            onPress={SharePress.bind(this, shopPosts)}
          >
            <Text style={styles.shareText}>Share</Text>
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
