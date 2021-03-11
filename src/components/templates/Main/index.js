import React from "react";
import styles from "./styles";
import { Platform, Dimensions } from "react-native";
import { Colors } from "../../../settings/styles/theme";

import { Actions } from "react-native-router-flux";
//import Video  from "react-native-video";
import { Video } from "expo-av";
import VideoPlayer from "expo-video-player";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ImageInfo } from "../../molecules";
import { SingleMerchantPromo } from "../../templates/Promo/SingleMerchantPromo";
import { SearchFlatList } from "../../organisms/SearchFlatList";

//import WheelOfFortune from "react-native-wheel-of-fortune";

import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  VirtualizedList,
  Modal,
  Button,
  RefreshControl,
  Icon as Icon2,
} from "../../atoms";

import { Card, CardSection, SearchBarMain } from "../../molecules";

import { InfoBox } from "@components/organisms/InfoBox";

import { ImageSwiper } from "../../organisms/ImageSwiper";

import ContentLoader, { Rect } from "react-content-loader/native";
import { CustomIcon } from "@components/atoms/index";
import Constants from "expo-constants";

const windowWidth = Dimensions.get("window").width;

const AdvertisementPopUp = ({
  isAdvertisementModelShow,
  onCloseAdvertisementModal,
  randomAdPic,
  type,
  handleVideoRef,
}) => {
  return type === "image" ? (
    <Modal
      // animationType="fade"
      transparent={true}
      visible={isAdvertisementModelShow}
      onBackdropPress={onCloseAdvertisementModal}
    >
      <View style={styles.modelBackground}>
        <View style={styles.adsImageContainer}>
          <TouchableOpacity
            // onPress={() => onPressPopUp(getShopId)}
            activeOpacity={1}
          >
            <Image
              source={{ uri: randomAdPic }}
              style={styles.adsImageStyle}
              //resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onCloseAdvertisementModal}
            activeOpacity={1}
          >
            <Image
              source={require("../../../assets/chilliBuddyCheckin/closeButton.png")}
              style={styles.videoImageCrossStyle}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View></View>
    </Modal>
  ) : type === "video" ? (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isAdvertisementModelShow}
      onBackdropPress={onCloseAdvertisementModal}
    >
      <View style={styles.modelBackground}>
        <View style={styles.adsImageContainer}>
          <Video
            ref={handleVideoRef}
            source={{
              uri: randomAdPic,
            }}
            shouldPlay
            resizeMode="contain"
            style={styles.adsImageStyle}
            positionMillis={0}
            useNativeControls={true}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onCloseAdvertisementModal}
            activeOpacity={1}
          >
            <Image
              source={require("../../../assets/chilliBuddyCheckin/closeButton.png")}
              style={styles.videoImageCrossStyle}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  ) : (
    <View />
  );
};

export default ({
  readFail,
  slider,
  dataSource,
  dataSource2,
  sectionTitle1,
  onPressCard,
  onPressImage, //Constant for clicking image advertisement
  noImageHeaderSlider,
  readLoadingAdvertisement,
  readLoadingCategoryList,
  readLoadingHeaderImages,
  onCloseAdvertisementModal,
  isAdvertisementModelShow,
  randomAdPic,
  getShopId,
  onPressPopUp,
  handleRefresh,
  refreshing,
  handleVideoRef,
  type,
  openModal,
  popUpImage,
  onClosePopUp,
  spinningWheelModal,
  onOpenSpinningWheelModal,
  onCloseSpinningWheelModal,
  spinningWheel,
  wheelRotation,
  randomCategory,
  onPressRandomCategory,
  fadeWheel,
  fadeResult,
  spinStatus,
  onCheckInPressed,
  onPromotionsPressed,
  onShopsPressed,
  onProfilePressed,
  user,
  promoSource,
  onMerchantPressed,
  promotions,
  onOpenSpinningWheel,
  returnGreetings,
  promotionModal,
  promotion,
  onCarouselPressed,
  onPromoPressed,
  onPromoPressedClose,
  categories,
  searchFilterFunction,
  onPressSearch,
  onPressSearchButton,
  mainScreenMessageBoolean,
  loading,
  dataSearch,
  // handleInputFocus,
}) => {
  const DATA = [];
  const DATA2 = [];

  const getItem = (data, index) => {
    return {
      key: "routeTicketsOrRoutesLoading" + index,
    };
  };

  const getItem2 = (data, index) => {
    return {
      key: "advertisementLoading" + index,
    };
  };

  const noPromoteImage = require("@assets/gogogain/pinpng.com-camera-drawing-png-1886718.png");
  const wheelIcon = require("../../../assets/icons/wheelIcon.png");

  const PressHeaderToPopUp = ({ url }) => {
    return (
      <Modal animationType="fade" transparent={true} visible={openModal}>
        <View style={styles.modelBackground}>
          <View style={styles.adsImageContainer}>
            <Video
              ref={handleVideoRef}
              source={{
                uri: url,
              }}
              shouldPlay
              resizeMode="contain"
              style={styles.adsImageStyle}
              positionMillis={0}
              useNativeControls={true}
            />
            <TouchableOpacity style={styles.closeButton} onPress={onClosePopUp} activeOpacity={1}>
              <MaterialCommunityIcons name="close-circle" size={40} color="#D60000" />
            </TouchableOpacity>
          </View>
        </View>
        <View></View>
      </Modal>
    );
  };

  const CardListLoading = ({ index }) => {
    return (
      <Card
        key={"cardLoading" + index}
        style={index === 0 ? styles.firstCardStyle : styles.cardStyle}
      >
        <ContentLoader
          speed={1}
          width={Platform.OS === "ios" && Platform.isPad === true ? 550 : 320}
          height={50}
          backgroundColor="#d9d9d9"
        >
          <Rect
            x="0"
            y="0"
            rx="19"
            ry="19"
            width={Platform.OS === "ios" && Platform.isPad === true ? 550 : 320}
            height="50"
          />
        </ContentLoader>
      </Card>
    );
  };

  const CategoriesList = ({ index, data }) => {
    return (
      <TouchableOpacity activeOpacity={0.6} onPress={() => onPressCard(data, data.no)}>
        <Card key={data.id} style={index === 0 ? styles.firstCardStyle : styles.cardStyle}>
          <CardSection style={styles.cardSection2}>
            <ImageBackground
              source={data.image}
              imageStyle={styles.imageMap2}
              style={styles.imageBackgroundStyle}
            >
              <View style={styles.textHolderStyle2}>
                <CustomIcon name={data.icon} size={30} style={styles.categoryIcon} />
                <Text style={styles.cardTitle2}> {data.title} </Text>
              </View>
            </ImageBackground>
          </CardSection>
        </Card>
      </TouchableOpacity>
    );
  };
  function Item({ picture = [], onPress, onBookmarkPressed, gotBookmark, distance }) {
    const { image } = styles;

    let cover = "";
    if (picture.length === 0) cover = require("@assets/images/404NotFound800x533.jpeg");
    else cover = { uri: picture[0] };
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={1}>
        <Card style={{ width: "98%" }}>
          <CardSection
            style={{
              borderBottomWidth: 0,
            }}
          >
            <Image style={image} resizeMode="cover" source={cover} />
          </CardSection>
          <View style={styles.floatingDistanceIndicator}>
            <MaterialCommunityIcons name="map-marker-distance" color="white" size={20} />
            <Text style={styles.distanceIndicatorTitle}>
              {
                +(distance != undefined
                  ? Math.round(distance + "e+2") + "e-2"
                  : Math.round(calculatedDistance + "e+2") + "e-2")
              }
              KM Away
            </Text>
          </View>
          {/* <TouchableOpacity style={styles.bookmark} onPress={onBookmarkPressed}>
            {gotBookmark ? (
              <View
                style={{
                  borderRadius: 100,
                  borderWidth: 0,
                  borderColor: "#ffd30f",
                  backgroundColor: "#ffd30f",
                }}
              >
                <Icon2
                  size={50}
                  iconStyle={{ borderWidth: 0 }}
                  containerStyle={{ justifyContent: "center" }}
                  name={"stars"}
                  color="#d60000"
                />
              </View>
            ) : (
              <View
                style={{
                  borderRadius: 100,
                  backgroundColor: "#ffffff",
                }}
              >
                <Icon2
                  size={50}
                  iconStyle={{ borderWidth: 0 }}
                  containerStyle={{ justifyContent: "center" }}
                  name={"stars"}
                  color="#d60000"
                />
              </View>
            )}
          </TouchableOpacity> */}
          {/* )} */}
        </Card>
      </TouchableOpacity>
    );
  }
  const { displayName, email, phoneNumber, photoURL } = user;

  const wheelImage = require("../../../assets/categoryWheel.png");
  const resultImage = require("../../../assets/categoryResult.png");
  const shopsIcon = require("../../../assets/chilliBuddy2.0Icon/chilliBuddyMainScreenIconV2/shop_Icon.png");
  const salesIcon = require("../../../assets/chilliBuddy2.0Icon/chilliBuddyMainScreenIconV2/sale_Icon.png");
  const spinWheel = require("../../../assets/chilliBuddy2.0Icon/chilliBuddyMainScreenIconV2/spinWheel_Icon.png");
  const checkIn = require("../../../assets/chilliBuddy2.0Icon/chilliBuddyMainScreenIconV2/checkIn_Icon_unopened.png");
  const hotPickIcon = require("../../../assets/chilliBuddy2.0Icon/chilliBuddyMainScreenIconV2/fireHotText_Icon.png");

  let { width } = Dimensions.get("window");
  width = width * 0.7;
  const rotation = wheelRotation.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });
  return (
    <View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps={"always"} //refresh main page function
        //refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      >
        <View style={styles.container}>
          {/* The First screen Row */}
          {readFail && (
            <InfoBox
              title="Memo"
              message={`Your network connection are not healthy`}
              titleStyle={styles.infoTitle}
              messageStyle={styles.infoSubtitle}
              containerStyle={styles.infoContainer}
            />
          )}
          <View style={{ height: Constants.statusBarHeight }} />

          <SingleMerchantPromo
            promotionModal={promotionModal}
            dataSource={promotion}
            onCarouselPressed={onCarouselPressed}
            onPromoPressedClose={onPromoPressedClose}
          />

          <View style={styles.firstSection}>
            {/* Column 1*/}
            <View style={styles.firstSectionFirstColumn}>
              {/* Row1 for Name*/}
              <View>
                {/* Name from firebase*/}
                <Text style={styles.firstSectionText1}>Hi, {user.displayName} </Text>
              </View>
              {/* Row2 for Good Morning*/}
              <View>
                {/* Follow condition by Time*/}
                <Text style={styles.firstSectionText2}>{returnGreetings}</Text>
              </View>
            </View>
            {/* Column 1*/}
            <View style={styles.firstSectionSecondColumn}>
              {/* Row1 for Profile Button*/}

              <TouchableOpacity
                style={styles.avatarContainer}
                onPress={onProfilePressed}
                activeOpacity={1}
              >
                <ImageInfo
                  banner={photoURL ? photoURL : require("../../../assets/DefaultAvatar.jpg")}
                  imageContainer={styles.profileImageStyle}
                  imageStyle={styles.image}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* The Second screen Row */}
          <TouchableOpacity style={styles.SecondSection} onPress={onPressSearch}>
            {/* <SearchBar
              placeholder="Search"
              lightTheme={true}
              searchIcon={true}
              containerStyle={styles.searchBarStyles}
              inputContainerStyle={styles.searchBarInputStyles}
              placeholderTextColor="#f7d0d0"
              round={true}
            /> */}

            <SearchBarMain
              placeholder={"Search"}
              onPressSearchButton={onPressSearchButton}
              mainScreenMessageBoolean={mainScreenMessageBoolean}
              searchFilterFunction={searchFilterFunction}
              loading={loading}
              dataSearch={dataSearch}
              // handleInputFocus={handleInputFocus}
            />
          </TouchableOpacity>
          {/* <SearchFlatList
            data={historySearchStore}
            searchFilterFunction={searchFilterFunction}
            placeholder={"Search"}
            isFocused={isFocused}
          /> */}

          {/* The Third screen Row */}
          <View style={styles.thirdSection}>
            {/* The Slider*/}
            {/* ImageSwiper */}

            <View style={styles.subContainerOutside}>
              {readLoadingHeaderImages ? (
                <ContentLoader
                  speed={1}
                  height={"100%"}
                  style={styles.subContainerOutsideShadow}
                  backgroundColor="#d9d9d9"
                >
                  <Rect x="0" y="0" rx="50" ry="50" width="100%" height="100%" />
                </ContentLoader>
              ) : (
                <ImageSwiper
                  style={styles}
                  slider={slider}
                  autoplayTime={5}
                  autoplay={true}
                  noImageSlider={noImageHeaderSlider}
                  condition={slider.length > 0}
                  onPressImage={onPressImage}
                />
              )}
            </View>
            {/* {readLoadingHeaderImages ? (
              <View />
            ) : randomAdPic !== undefined ? (
              <AdvertisementPopUp />
            ) : (
              <View />
            )} */}

            {randomAdPic !== undefined && (
              <AdvertisementPopUp
                isAdvertisementModelShow={isAdvertisementModelShow}
                onCloseAdvertisementModal={onCloseAdvertisementModal}
                randomAdPic={randomAdPic}
                type={type}
                handleVideoRef={handleVideoRef}
              />
            )}

            {/* {openModal ? <PressHeaderToPopUp url={popUpImage} /> : <View />} */}
          </View>

          {/* The quarter screen Row */}
          <View style={styles.quarterSection}>
            <TouchableOpacity
              style={styles.QuarterContainer1}
              onPress={onShopsPressed}
              activeOpacity={1}
            >
              <View style={styles.quarterInnerBox}>
                <Image source={shopsIcon} transition={false} style={styles.quarterIcon} />
              </View>
              {/* <View style={styles.innerRedBackGround}></View> */}
              <Text style={styles.floatingCheckInTitle}>Shops</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.QuarterContainer1}
              onPress={onPromotionsPressed}
              activeOpacity={1}
            >
              <View style={styles.quarterInnerBox}>
                <Image source={salesIcon} transition={false} style={styles.quarterIcon} />
              </View>
              <Text style={styles.floatingCheckInTitle}>Promotions</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.QuarterContainer1}
              onPress={onOpenSpinningWheel}
              activeOpacity={1}
            >
              <View style={styles.quarterInnerBox}>
                <Image source={spinWheel} transition={false} style={styles.quarterIcon} />
              </View>
              <Text style={styles.floatingCheckInTitle}>Spin Me</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#a7a7a7",
                width: windowWidth / 5,
                height: windowWidth / 6,
                alignItems: "center",
                borderWidth: 0.1,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                shadowColor: "#f5f5f5",
                shadowRadius: 0.5,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 1,
              }}
              onPress={onCheckInPressed}
              activeOpacity={1}
              disabled={true}
            >
              <View
                style={{
                  marginTop: 0,
                  backgroundColor: "#fff",
                  width: "75%",
                  alignItems: "center",
                  height: "60%",
                  borderRadius: 10,
                }}
              >
                <Image source={checkIn} transition={false} style={styles.quarterIcon} />
              </View>
              <Text style={styles.floatingCheckInTitleOff}>Check In</Text>
            </TouchableOpacity>
          </View>

          {/* The Last Row*/}
          <View style={styles.lastSection}>
            <View style={styles.lastSectionFirstRow}>
              <Text style={styles.lastSectionText}>Hot Pick Today </Text>
              <Image source={hotPickIcon} transition={false} style={styles.lastSectionIcon} />
            </View>
            <View style={styles.lastSectionFlatListRow}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={promoSource}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                  <TouchableOpacity onPress={() => onPromoPressed(item)} activeOpacity={1}>
                    <Card
                      key={item.id + index}
                      style={index === 0 ? styles.firstPromoteCardStyle : styles.promoteCardStyle}
                    >
                      {item.coverPhotos.length > 0 ? (
                        <Image
                          source={{ uri: item.coverPhotos[0] }}
                          style={styles.promoteImage}
                          resizeMode="cover"
                        />
                      ) : (
                        <Image source={noPromoteImage} style={promoteImage} resizeMode="cover" />
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
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
