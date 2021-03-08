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
                {data.description == null ? (
                  <Text
                    style={{
                      marginTop: 0,
                      marginRight: "10%",
                      fontFamily: "HorizontalRounded",
                      color: "grey",
                    }}
                  >
                    No Description Available
                  </Text>
                ) : data.description.charAt(0) != "<" ? (
                  <Text
                    style={{
                      marginTop: 0,
                      marginRight: "10%",
                      fontFamily: "HorizontalRounded",
                      color: "grey",
                    }}
                  >
                    {data.description}
                  </Text>
                ) : (
                  <HTML
                    source={{ html: `<div>` + data.description + `</div>` }}
                    baseFontStyle={{
                      fontFamily: "HorizontalRounded",
                      color: "grey",
                      fontWeight: null,
                      fontSize: Platform.isPad ? windowWidth / 30 : 17,
                    }}
                    tagsStyles={{
                      p: {
                        // fontFamily: "HorizontalRounded",
                        padding: 0,
                        fontSize: Platform.isPad ? windowWidth / 20 : 17,
                      },
                      ol: {
                        padding: 0,
                        // marginBottom: 30,
                        margin: 0,
                        fontSize: Platform.isPad ? windowWidth / 20 : 17,
                        // fontFamily: "HorizontalRounded",
                      },
                      li: {
                        padding: 0,
                        margin: 0,
                        marginTop: 3,
                        fontSize: Platform.isPad ? windowWidth / 20 : 17,
                        // fontFamily: "HorizontalRounded",
                      },
                      ul: {
                        padding: 0,
                        margin: 0,
                        fontSize: Platform.isPad ? windowWidth / 20 : 17,
                        // fontFamily: "HorizontalRounded",
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
                )}

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
        {/* <Rect x="0" y="0" rx="0" ry="0" width="100%" height="150" /> */}
        <Rect x="10" y="25" rx="100" ry="100" width="80" height="80" />
        <Rect x="100" y="50" rx="10" ry="10" width="40%" height="20" />
        <Rect x="100" y="75" rx="10" ry="10" width="25%" height="20" />

        <Rect x="300" y="50" rx="10" ry="10" width="15%" height="20" />

        <Rect x="20" y="140" rx="10" ry="10" width="90%" height="20" />
        <Rect x="20" y="170" rx="10" ry="10" width="30%" height="20" />
        <Rect x="20" y="200" rx="10" ry="10" width="60%" height="20" />
        <Rect x="20" y="230" rx="10" ry="10" width="70%" height="20" />
        <Rect x="20" y="260" rx="10" ry="10" width="50%" height="20" />
        <Rect x="20" y="290" rx="10" ry="10" width="90%" height="20" />

        <Rect x="20" y="330" rx="10" ry="10" width="90%" height="175" />
        <Rect x="20" y="530" rx="10" ry="10" width="90%" height="175" />
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
            activeOpacity={1}
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
