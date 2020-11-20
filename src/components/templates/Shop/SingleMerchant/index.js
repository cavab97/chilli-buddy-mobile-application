import React from "react";
import styles from "./styles";

import { Dimensions, Alert, Linking } from "react-native";

import {
  View,
  Image,
  Text,
  ScrollView,
  FlatList,
  Carousel,
  TouchableOpacity,
} from "@components/atoms";

import { Card } from "@components/molecules";

import { Collapsible } from "@components/organisms/Collapsible";

import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../../../../settings/styles/theme";
import moment from "moment";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const SingleMerchant = ({
  dataSource,
  shopPosts,
  promotions,
  icon,
  noImage,
  noPromoteImage,
  isOpenPost,
  renderOperatingHour,
  onPostTitleClick,
  onPromoteClick,
  setSwiperRef,
  onClickToSwip,
  viewHeight,
  distance,
  find_dimensions = () => {},
}) => {
  const {
    posterArea,
    logoPosition,
    logo,
    detailArea,
    title,
    subTitle,
    subIconDetailMain,
    setRow,
    postLabel,
    postContainer,
    coverImageSwapLeft,
    coverImageSwapRight,
    postIconSwap,
    singlePostContainer,
    singlePostTitle,
    singlePostDescription,
    firstPromoteCardStyle,
    promoteCardStyle,
    promoteImage,
    promoteNoImage,
    promoteTitleTextStyle,
    sectionTitle,
    subContainer1,
    imageTopStyle,
  } = styles;

  const PostList = ({ data }) => {
    if (data.length !== 0) {
      return (
        <View>
          <ScrollView>
            <View
              onLayout={(event) => {
                find_dimensions(event.nativeEvent.layout);
              }}
            >
              <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <ScrollView>
                    <View style={singlePostContainer}>
                      <Text style={singlePostTitle}>{item.title}</Text>
                      <Text style={singlePostDescription}>{item.description}</Text>
                      <Text style={{ paddingTop: 5 }}>
                        {moment(item.created.at).format("DD/MM/YYYY")}
                      </Text>
                      {/* <Text>create at: {item.created.at}</Text> */}
                    </View>
                  </ScrollView>
                )}
              />
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
                <View style={singlePostContainer}>
                  <Text style={singlePostTitle}>Currently there are no post available</Text>
                </View>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      );
    }
  };

  return (
    <ScrollView>
      <View style={posterArea}>
        <Carousel
          ref={setSwiperRef}
          data={dataSource.images}
          renderItem={({ item, index }) => {
            return (
              <View key={index} style={subContainer1}>
                {dataSource.images.length > 0 ? (
                  <Image source={{ uri: item }} style={imageTopStyle} resizeMode={"cover"} />
                ) : (
                  <Image source={noImage} style={imageTopStyle} resizeMode={"cover"} />
                )}
              </View>
            );
          }}
          loop={true}
          //autoplay={true}
          sliderWidth={windowWidth}
          itemWidth={windowWidth}
        />
        {/* <ImageSwiper
                // autoplay={false}
                // autoplayTime={7}
                style={styles}
                condition={dataSource.images.length > 0 }
                noImageSlider={noImage}
                slider={dataSource.images}
            /> */}

        <MaterialCommunityIcons
          style={coverImageSwapLeft}
          name="chevron-left-circle"
          size={30}
          onPress={onClickToSwip.bind(this, "back")}
        />
        <MaterialCommunityIcons
          style={coverImageSwapRight}
          name="chevron-right-circle"
          size={30}
          onPress={onClickToSwip.bind(this, "next")}
        />
      </View>

      <View style={logoPosition}>
        <Image style={logo} source={icon} />
      </View>

      <Collapsible
        isOpen={isOpenPost}
        onPress={onPostTitleClick}
        title={"Post"}
        titleContainerStyle={postContainer}
        titleStyle={postLabel}
        rightIcon={
          !isOpenPost ? (
            <MaterialCommunityIcons style={postIconSwap} name="menu-swap" size={30} />
          ) : (
            <MaterialCommunityIcons style={postIconSwap} name="close" size={30} />
          )
        }
        animeContainerStyle={{ marginTop: 10 }}
        animeTime={Platform.OS == "ios" ? 200 : 1000}
        animeTo={Platform.OS == "ios" ? windowHeight - 360 : viewHeight}
        animeContent={<PostList data={shopPosts} />}
      />

      {!isOpenPost && (
        <View>
          <View style={detailArea}>
            <Text style={title}>{dataSource.displayTitle}</Text>
            <View>
              <View style={setRow}>
                <Ionicons style={{}} name="md-calendar" size={26} color={Colors.PRIMARY} />
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    fontFamily: "RobotoRegular",
                    marginLeft: 10.5,
                    //marginRight: 10.5,
                    marginTop: 3,
                    color: Colors.PRIMARY,
                    marginBottom: 5,
                  }}
                >
                  Operating Hour
                </Text>
              </View>
              {renderOperatingHour()}
              <View style={setRow}>
                <Ionicons
                  style={subIconDetailMain}
                  name="ios-call"
                  size={26}
                  color={Colors.PRIMARY}
                />

                <Text
                  style={{ marginTop: 20, fontFamily: "RobotoRegular" }}
                  onPress={() => {
                    Linking.openURL(`tel:${dataSource.phoneNumber}`);
                  }}
                >
                  {dataSource.phoneNumber}
                </Text>
              </View>
              <View style={setRow}>
                <Ionicons
                  style={subIconDetailMain}
                  name="ios-pin"
                  size={26}
                  color={Colors.PRIMARY}
                />
                <Text
                  style={{ marginTop: 20, marginRight: "10%", fontFamily: "RobotoRegular" }}
                  onPress={() => {
                    const latitude = dataSource.l.latitude;
                    const longitude = dataSource.l.longitude;
                    Linking.openURL(`http://www.google.com/maps/place/${latitude},${longitude}`);
                  }}
                >
                  {dataSource.address.line1} {dataSource.address.line2}{" "}
                  {dataSource.address.postcode} {dataSource.address.state}
                </Text>
              </View>
            </View>

            {dataSource.description && (
              <View>
                <Text style={subTitle}>DESCRIPTION</Text>
                <Text
                  style={{
                    marginTop: 20,
                    fontSize: 18,
                    textAlign: "justify",
                    fontFamily: "RobotoRegular",
                    width: "95%",
                    paddingBottom: 10,
                  }}
                >
                  {dataSource.description}
                </Text>
              </View>
            )}
            <View
              style={{
                marginTop: 25,
                flexDirection: "row",
                justifyContent: "space-between",
                alignSelf: "center",
                width: "45%",
                // borderWidth:1,
              }}
            >
              {
                //dataSource.facebookUrl !== "" && dataSource.facebookUrl &&
                <Ionicons
                  style={{}}
                  name="logo-facebook"
                  size={30}
                  color={Colors.PRIMARY}
                  onPress={() => {
                    if (!dataSource.facebookUrl) {
                      return Alert.alert("Sorry, we don't have facebook.");
                    }
                    Linking.openURL(dataSource.facebookUrl);
                  }}
                />
              }
              {
                //dataSource.instagramUrl !== "" && dataSource.instagramUrl &&
                <Ionicons
                  style={{}}
                  name="logo-instagram"
                  size={30}
                  color={Colors.PRIMARY}
                  onPress={() => {
                    if (!dataSource.instagramUrl) {
                      return Alert.alert("Sorry, we don't have instagram.");
                    }
                    Linking.openURL(
                      "instagram://user?username=" + dataSource.instagramUrl.replace(/ /g, "")
                    );
                  }}
                />
              }
              {
                //dataSource.whatsapp !== "" && dataSource.whatsapp   &&
                <Ionicons
                  style={{}}
                  name="logo-whatsapp"
                  size={30}
                  color={Colors.PRIMARY}
                  onPress={() => {
                    if (!dataSource.whatsapp) {
                      return Alert.alert("Sorry, we don't have whatsapp.");
                    }
                    Linking.openURL("https://wa.me/" + dataSource.whatsapp);
                  }}
                />
              }
              {
                //dataSource.websiteUrl !=='' && dataSource.websiteUrl &&
                <Ionicons
                  style={{}}
                  name="md-link"
                  size={30}
                  color={Colors.PRIMARY}
                  onPress={() => {
                    if (!dataSource.websiteUrl) {
                      return Alert.alert("Sorry, we don't have website.");
                    }
                    Linking.openURL("https://" + dataSource.websiteUrl);
                  }}
                />
              }
            </View>
          </View>

          {promotions.length > 0 && (
            <View>
              <Text style={sectionTitle}>Promote</Text>

              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={promotions}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                  <TouchableOpacity onPress={onPromoteClick.bind(this, item, distance)}>
                    <Card
                      key={item.id}
                      style={index === 0 ? firstPromoteCardStyle : promoteCardStyle}
                    >
                      {item.coverPhotos.length > 0 ? (
                        <Image
                          source={{ uri: item.coverPhotos[0] }}
                          style={promoteImage}
                          resizeMode="cover"
                        />
                      ) : (
                        <Image source={noPromoteImage} style={promoteNoImage} resizeMode="cover" />
                      )}
                      <Text numberOfLines={2} style={promoteTitleTextStyle}>
                        {item.title}
                      </Text>
                    </Card>
                  </TouchableOpacity>
                )}
                scrollEnabled={promotions.length > 1}
              />
            </View>
          )}

          <View style={{ height: 50 }} />
        </View>
      )}
    </ScrollView>
  );
};

export { SingleMerchant };
