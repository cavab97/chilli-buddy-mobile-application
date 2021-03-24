import React from "react";
import styles from "./styles";

import { Dimensions, Alert, Linking, Platform } from "react-native";
import HTML from "react-native-render-html";

import {
  View,
  Image,
  Text,
  ScrollView,
  FlatList,
  Carousel,
  TouchableOpacity,
} from "@components/atoms";

import { SingleMerchantPromo } from "../../Promo/SingleMerchantPromo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { PostList } from "@components/organisms/PostList";
import Modal from "react-native-modal";

import { Card } from "@components/molecules";

import moment from "moment";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const facebook = require("../../../../assets/chilliBuddy2.0Icon/chilliBuddySingleShopV2/Facebook_Icon.png"); //social media icon
const instagram = require("../../../../assets/chilliBuddy2.0Icon/chilliBuddySingleShopV2/Instagram_Icon.png");
const whatsapp = require("../../../../assets/chilliBuddy2.0Icon/chilliBuddySingleShopV2/Whatsapp_Icon.png");
const webSite = require("../../../../assets/chilliBuddy2.0Icon/chilliBuddySingleShopV2/websiteGlobal_Icon.png");
const distanceIcon = require("../../../../assets/chilliBuddy2.0Icon/chilliBuddySingleShopV2/Distance_Icon.png");
const newsIcon = require("../../../../assets/chilliBuddy2.0Icon/chilliBuddySingleShopV2/news_Icon.png");
const fillLessLove = require("../../../../assets/chilliBuddy2.0Icon/chilliBuddySingleShopV2/favorLove_Icon.png");
const mapSign = require("../../../../assets/chilliBuddy2.0Icon/chilliBuddySearchIcon/map.png");

const filledHeartIcon = require("../../../../assets/chilliBuddy2.0Icon/chilliBuddySingleShopV2/filledHeart.png");

const SingleMerchant = ({
  // alterData,
  dataSource,
  shopPosts,
  categoryName,
  promotions,
  icon,
  postImage,
  noImage,
  noPromoteImage,
  isOpenPost,
  renderOperatingHour,
  onPostTitleClick,
  onFavouriteClick,
  onPromoteClick,
  setSwiperRef,
  onClickToSwip,
  viewHeight,
  distance,
  calculatedDistance, //distance calculated from single merchant view
  onPostPress,
  promotion,
  promotionModal,
  onPromoPressedClose,
  onPromoPressed,
  isFavourite,
  find_dimensions = () => {},
  SharePress,
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
  return (
    <ScrollView scrollIndicatorInsets={{ right: 0.1 }}>
      <View style={posterArea}>
        {dataSource.images.length == 0 ? (
          <Image source={noImage} style={imageTopStyle} resizeMode={"cover"} />
        ) : (
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
            autoplay={true}
            sliderWidth={windowWidth}
            itemWidth={windowWidth}
          />
        )}
        {/* <ImageSwiper
                // autoplay={false}
                // autoplayTime={7}
                style={styles}
                condition={dataSource.images.length > 0 }
                noImageSlider={noImage}
                slider={dataSource.images}
            /> */}
        {/* 
        <MaterialCommunityIcons
          style={coverImageSwapLeft}
          name="chevron-left-circle"
          size={30}
          onPress={onClickToSwip.bind(this, "back")}
        /> */}
        {/* <MaterialCommunityIcons
          style={coverImageSwapRight}
          name="chevron-right-circle"
          size={30}
          onPress={onClickToSwip.bind(this, "next")}
        /> */}
      </View>
      <View style={logoPosition}>
        <Image style={logo} source={icon} />
      </View>

      {/* Post Modal */}
      <Modal
        isVisible={isOpenPost}
        onSwipeComplete={(e) => {
          onPostTitleClick();
        }}
        style={styles.modalContainer}
        swipeDirection={["down"]}
        backdropOpacity={0.45}
        propagateSwipe={true}
      >
        <View style={styles.contentFull}>
          <View style={styles.swipeableIndicator} />
          <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
            <Text style={styles.titleWhiteboard}>Whiteboard</Text>

            <View style={styles.shopPostsContainer}>
              <PostList
                data={shopPosts}
                icon={icon}
                onPostPress={onPostPress}
                SharePress={SharePress}
              />
            </View>
          </ScrollView>
        </View>
      </Modal>

      <View>
        <View style={detailArea}>
          <View style={styles.TopRow}>
            <View style={styles.Topcol}>
              <Text style={styles.TopTitle}>{dataSource.displayTitle}</Text>
              <View style={styles.SubTopcol}>
                <Text style={styles.TopSubTitle}>
                  {categoryName} ·{" "}
                  <Image style={{ width: 15, height: 15, marginLeft: 2 }} source={distanceIcon} />{" "}
                  Just {+(Math.round(distance + "e+2") + "e-2")}Km away
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "22%",
                // backgroundColor: "#FFF",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
                marginLeft: 25,
                // backgroundColor: "red",
              }}
            >
              <TouchableOpacity //uncomment social media icon
                onPress={() => onFavouriteClick(isFavourite)}
              >
                <Image
                  source={isFavourite ? filledHeartIcon : fillLessLove}
                  style={{ width: 27, height: 25, resizeMode: "contain" }}
                />
              </TouchableOpacity>
              <TouchableOpacity //uncomment social media icon
                onPress={onPostTitleClick}
              >
                <Image style={{ width: 30, height: 25, resizeMode: "contain" }} source={newsIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View style={styles.FirstRow}>
              <View style={styles.col}>
                <Text style={styles.textLabel}> Operating Hour</Text>
              </View>
              <View style={styles.col2}>
                {/* <Text style={styles.col2Text}>{tnc}</Text> */}
                {renderOperatingHour()}
              </View>
            </View>

            <View style={styles.FirstRow}>
              <View style={styles.col}>
                <Text style={styles.textLabel}> Contact Number</Text>
              </View>
              <View style={styles.col2}>
                {/* <Text style={styles.col2Text}>{tnc}</Text> */}
                <Text
                  style={{ marginTop: 0, fontFamily: "HorizontalRounded", color: "grey" }}
                  onPress={() => {
                    Linking.openURL(`tel:${dataSource.phoneNumber}`);
                  }}
                >
                  {dataSource.phoneNumber == null
                    ? "No Phone Number Available"
                    : dataSource.phoneNumber}
                </Text>
              </View>
            </View>

            <View style={styles.FirstRow}>
              <View style={styles.colAddress}>
                <Text style={styles.textLabel}> Address</Text>
                <Image source={mapSign} style={styles.mapSignStyle} resizeMode={"cover"} />
              </View>
              <View style={styles.col2}>
                {/* <Text style={styles.col2Text}>{tnc}</Text> */}
                <Text
                  style={{
                    marginTop: 0,
                    marginRight: "10%",
                    fontFamily: "HorizontalRounded",
                    color: "grey",
                  }}
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
            <View style={setRow}>
              {/* <Ionicons
                  style={subIconDetailMain}
                  name="ios-pin"
                  size={26}
                  color={Colors.PRIMARY}
                /> */}
            </View>
          </View>

          {/* {dataSource.description ? (    ) : (
              []
            )} */}

          <View style={styles.FirstRow}>
            <View style={styles.col}>
              <Text style={styles.textLabel}> Description</Text>
            </View>
            <View style={styles.col2}>
              {dataSource.description == null ? (
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
              ) : dataSource.description.charAt(0) != "<" ? (
                <Text
                  style={{
                    marginTop: 0,
                    marginRight: "10%",
                    fontFamily: "HorizontalRounded",
                    color: "grey",
                  }}
                >
                  {dataSource.description}
                </Text>
              ) : (
                <HTML
                  source={{ html: dataSource.description }}
                  // alterData={alterData}
                  baseFontStyle={{
                    fontFamily: "HorizontalRounded",
                    color: "grey",
                    fontWeight: null,
                    fontSize: Platform.isPad ? windowWidth / 30 : 17,
                  }}
                  ignoredStyles={["font-family", "letter-spacing"]}
                  tagsStyles={{
                    p: {
                      fontFamily: "HorizontalRounded",
                      padding: 0,
                      color: "grey",
                    },
                    div: {
                      fontFamily: "HorizontalRounded",
                      color: "grey",
                    },
                    b: {
                      fontFamily: "HorizontalRounded",
                      color: "grey",
                    },
                    ol: {
                      padding: 0,
                      marginBottom: 30,
                      margin: 0,
                      fontFamily: "HorizontalRounded",
                      color: "grey",
                    },
                    li: {
                      padding: 0,
                      margin: 0,
                      fontFamily: "HorizontalRounded",
                      color: "grey",
                    },
                    ul: {
                      padding: 0,
                      margin: 0,
                      fontFamily: "HorizontalRounded",
                      color: "grey",
                    },
                  }}
                />
              )}
            </View>
          </View>

          <View style={styles.FirstRowSocialMedia}>
            <View style={styles.colSocialMedia}>
              <Text style={styles.textLabel}> Social Media</Text>
            </View>
            <View style={styles.col2}>
              {/* <Text style={styles.col2Text}>{tnc}</Text> */}
              <View
                style={{
                  // paddingBottom: 100,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  backgroundColor: "#FFF",
                  // borderWidth:1,
                }}
              >
                {
                  //dataSource.facebookUrl !== "" && dataSource.facebookUrl &&
                  // <Ionicons
                  //   style={{}}
                  //   name="logo-facebook"
                  //   size={30}
                  //   color={Colors.PRIMARY}
                  //   onPress={() => {
                  //     if (!dataSource.facebookUrl) {
                  //       return Alert.alert("Sorry, we don't have facebook.");
                  //     }
                  //     Linking.openURL(dataSource.facebookUrl);
                  //   }}
                  // />
                  <TouchableOpacity //uncomment social media icon
                    onPress={() => {
                      if (!dataSource.facebookUrl) {
                        return Alert.alert("Sorry, we don't have facebook.");
                      }
                      Linking.openURL(dataSource.facebookUrl);
                    }}
                  >
                    <Image style={{ width: 30, height: 30 }} source={facebook} />
                  </TouchableOpacity>
                }
                {
                  //dataSource.instagramUrl !== "" && dataSource.instagramUrl &&
                  // <Ionicons
                  //   style={{}}
                  //   name="logo-instagram"
                  //   size={30}
                  //   color={Colors.PRIMARY}
                  //   onPress={() => {
                  //     if (!dataSource.instagramUrl) {
                  //       return Alert.alert("Sorry, we don't have instagram.");
                  //     }
                  //     Linking.openURL(
                  //       "instagram://user?username=" + dataSource.instagramUrl.replace(/ /g, "")
                  //     );
                  //   }}
                  // />
                  <TouchableOpacity //uncomment social media icon
                    onPress={() => {
                      if (!dataSource.instagramUrl) {
                        return Alert.alert("Sorry, we don't have instagram.");
                      }
                      Linking.openURL(
                        "instagram://user?username=" + dataSource.instagramUrl.replace(/ /g, "")
                      );
                    }}
                  >
                    <Image style={{ width: 30, height: 30 }} source={instagram} />
                  </TouchableOpacity>
                }
                {
                  //dataSource.whatsapp !== "" && dataSource.whatsapp   &&
                  // <Ionicons
                  //   style={{}}
                  //   name="logo-whatsapp"
                  //   size={30}
                  //   color={Colors.PRIMARY}
                  //   onPress={() => {
                  //     if (!dataSource.whatsapp) {
                  //       return Alert.alert("Sorry, we don't have whatsapp.");
                  //     }
                  //     Linking.openURL("https://wa.me/" + dataSource.whatsapp);
                  //   }}
                  // />
                  <TouchableOpacity //uncomment social media icon
                    onPress={() => {
                      if (!dataSource.whatsapp) {
                        return Alert.alert("Sorry, we don't have whatsapp.");
                      }
                      Linking.openURL("https://wa.me/" + dataSource.whatsapp);
                    }}
                  >
                    <Image style={{ width: 30, height: 30 }} source={whatsapp} />
                  </TouchableOpacity>
                }
                {
                  //dataSource.websiteUrl !=='' && dataSource.websiteUrl &&
                  // <View    //UNCOMMENT VIEW
                  //   style={{
                  //     backgroundColor: Colors.PRIMARY,
                  //     borderRadius: 7,
                  //     width: 30,
                  //     height: 30,
                  //   }}
                  // >

                  <TouchableOpacity //uncomment social media icon
                    onPress={() => {
                      if (!dataSource.websiteUrl) {
                        return Alert.alert("Sorry, we don't have website.");
                      }
                      dataSource.websiteUrl.substring(0, 4) === "http"
                        ? Linking.openURL(dataSource.websiteUrl)
                        : Linking.openURL("https://" + dataSource.websiteUrl);
                    }}
                  >
                    <Image style={{ width: 26, height: 26 }} source={webSite} />
                  </TouchableOpacity>
                  // <Ionicons
                  //   style={{}} //{{ marginLeft: "auto", marginRight: "auto", top: "15%" }}  //uncomment social media icon
                  //   name="md-link"
                  //   size={30} //{20}  uncomment social media icon
                  //   color={Colors.PRIMARY} //{Colors.WHITE} UNCOMMENT
                  // onPress={() => {
                  //   if (!dataSource.websiteUrl) {
                  //     return Alert.alert("Sorry, we don't have website.");
                  //   }
                  //   dataSource.websiteUrl.substring(0, 4) === "http"
                  //     ? Linking.openURL(dataSource.websiteUrl)
                  //     : Linking.openURL("https://" + dataSource.websiteUrl);
                  // }}
                  // />
                  // </View>  UNCOMMENT VIEW‹
                }
              </View>
            </View>
          </View>
        </View>

        {/* 
          <View style={styles.lastSectionFlatListRow}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={promoSource}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                  <TouchableOpacity onPress={() => onMerchantPressed(item)}>
                    <Card
                      key={item.id}
                      style={index === 0 ? styles.firstPromoteCardStyle : styles.promoteCardStyle}
                    >
                      {item.coverPhotos.length > 0 ? (
                        <Image
                          source={{ uri: item.coverPhotos[0] }}
                          style={styles.promoteImage}
                          resizeMode="cover"
                        />
                      ) : (
                        <Image source={noPromoteImage} style={promoteNoImage} resizeMode="cover" />
                      )}
                      <View style={styles.lastSectionTextContainer}>
                        <Text numberOfLines={2} style={styles.promoteTitleTextStyle}>
                          {item.title}
                        </Text>
                      </View>
                    </Card>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
                onRefresh={handleRefresh}
                refreshing={false}
                scrollEnabled={promoSource.length > 1}

                // ListFooterComponent={renderFooter({ empty: dataSource.length === 0 ? true : false })}
                // style={styles.flatList}
              />
            </View> */}

        {promotions.length > 0 ? (
          <View>
            <SingleMerchantPromo
              promotionModal={promotionModal}
              dataSource={promotion}
              onPromoPressedClose={onPromoPressedClose}
            />
            <Text style={sectionTitle}>Promotions</Text>
            <View style={styles.lastSectionFlatListRow}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={promotions}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                  <TouchableOpacity onPress={onPromoPressed.bind(this, item)} activeOpacity={1}>
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
                      <View style={styles.lastSectionTextContainer}>
                        <Text numberOfLines={1} style={promoteTitleTextStyle}>
                          {item.title}
                        </Text>
                      </View>
                    </Card>
                  </TouchableOpacity>
                )}
                scrollEnabled={promotions.length > 1}
              />
            </View>
          </View>
        ) : (
          []
        )}

        <View style={{ height: 50 }} />
      </View>
      {/* ) : (
      <View>
        <Text>Trigger</Text>
      </View>
      )} */}
    </ScrollView>
  );
};

export { SingleMerchant };
