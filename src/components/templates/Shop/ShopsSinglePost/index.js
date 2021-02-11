import React from "react";
import styles from "./styles";

import HTML from "react-native-render-html";
import moment from "moment";

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

const ShopsSinglePost = ({ shopPosts, icon, dataSource, find_dimensions = () => {} }) => {
  const ImageLoop = ({ rowData }) => {
    // console.log("rowData: ", shopPosts.created.at.seconds);

    const data = [];

    for (let i = 0; i < rowData.length; i++) {
      data.push(<Image key={i} source={{ uri: rowData[i] }} style={styles.chatBoxInnerImage} />);
    }

    return data;
  };

  const PostList = ({ data }) => {
    console.log(data.images.length);
    console.log(data.images[0]);
    if (data.length !== 0) {
      return (
        <View>
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
                        margin: 0,
                        // backgroundColor: "grey",
                      },
                      li: {
                        padding: 0,
                        margin: 0,

                        // backgroundColor: "red",
                      },
                    }}

                    // tagsStyles={ p}
                  />

                  {data.images.length < 1 ? (
                    <Image style={styles.chatBoxInnerImage} source={noImageV2} />
                  ) : (
                    <ImageLoop rowData={data.images} />
                  )}

                  {/* <Text>create at: {item.created.at}</Text> */}
                </View>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View>
          <ScrollView>
            <View>
              <ScrollView>
                <View style={styles.singlePostContainer}>
                  <Text style={styles.singlePostTitle}>Currently there are no post available</Text>
                </View>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      );
    }
  };

  return (
    <ScrollView style={styles.outPostContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.postsTopRow}>
        <View style={styles.logoPositionInModal}>
          <Image style={styles.logo} source={icon} />
          {/* <Image source={} style={} resizeMode={"cover"} /> */}
        </View>
        <View style={styles.postsTopRowNameContainer}>
          <Text style={styles.ShopPostTopTitle}>{dataSource.displayTitle}</Text>
          <Text style={styles.ShopPostSubTitle}>
            {/* {moment(shopPosts.created.at).format("DD/MM/YYYY")} */}
            {/* {shopPosts.created.at.seconds == null ? "no date" : shopPosts.created.at.seconds} */}
          </Text>
        </View>
        <TouchableOpacity style={styles.shareContainer}>
          <Text style={styles.shareText}>Share</Text>
          <Image style={styles.shareIcon} source={shareIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.shopPostsContainer}>
        <PostList data={shopPosts} />
      </View>
    </ScrollView>
  );
};

export { ShopsSinglePost };
