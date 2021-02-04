import React from "react";
import styles from "./styles";
import { Platform, Dimensions, Animated } from "react-native";
import { Actions } from "react-native-router-flux";
//import Video  from "react-native-video";
import { Video } from "expo-av";
import VideoPlayer from "expo-video-player";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ImageInfo } from "../../molecules";

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
  SearchBar,
} from "../../atoms";

import { Card, CardSection } from "../../molecules";

import { InfoBox } from "@components/organisms/InfoBox";

import { SmallCardList } from "../../organisms/SmallCardList";

import { ImageSwiper } from "../../organisms/ImageSwiper";
import { SpinningWheel } from "../../organisms/SpinningWheel";

import ContentLoader, { Rect } from "react-content-loader/native";
import Icon from "react-native-vector-icons/Ionicons";
import { CustomIcon } from "@components/atoms/index";
import Constants from "expo-constants";

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
  user,
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

  const AdvertisementPopUp = (url) => {
    return type === "image" ? (
      <Modal animationType="fade" transparent={true} visible={isAdvertisementModelShow}>
        <View style={styles.modelBackground}>
          <View style={styles.adsImageContainer}>
            <TouchableOpacity onPress={() => onPressPopUp(getShopId)}>
              <Image
                source={{ uri: randomAdPic }}
                style={styles.adsImageStyle}
                //resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={onCloseAdvertisementModal}>
              <MaterialCommunityIcons name="close-circle" size={40} color="#D60000" />
            </TouchableOpacity>
          </View>
        </View>
        <View></View>
      </Modal>
    ) : type === "video" ? (
      <Modal animationType="fade" transparent={true} visible={isAdvertisementModelShow}>
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
            <TouchableOpacity style={styles.closeButton} onPress={onCloseAdvertisementModal}>
              <MaterialCommunityIcons name="close-circle" size={40} color="#D60000" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    ) : (
      <View />
    );
  };

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
            <TouchableOpacity style={styles.closeButton} onPress={onClosePopUp}>
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
  const { displayName, email, phoneNumber, photoURL } = user;

  const wheelImage = require("../../../assets/categoryWheel.png");
  const resultImage = require("../../../assets/categoryResult.png");

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
        //refresh main page function
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

          <View style={styles.firstSection}>
            {/* Column 1*/}
            <View>
              {/* Row1 for Name*/}
              <View>
                {/* Name from firebase*/}
                <Text>Hi,Darren </Text>
              </View>
              {/* Row2 for Good Morning*/}
              <View>
                {/* Follow condition by Time*/}
                <Text>Good Morning.</Text>
              </View>
            </View>
            {/* Column 1*/}
            <View>
              {/* Row1 for Profile Button*/}

              <TouchableOpacity style={styles.avatarContainer}>
                <ImageInfo
                  banner={photoURL ? photoURL : require("../../../assets/DefaultAvatar.jpg")}
                  imageContainer={styles.profileImageStyle}
                  imageStyle={styles.image}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* The Second screen Row */}
          <View>
            <SearchBar placeholder="Type Here..." />
          </View>

          {/* The Third screen Row */}
          <View>
            {/* The Slider*/}
            {/* ImageSwiper */}
            <View style={styles.subContainer1}>
              {readLoadingHeaderImages ? (
                <ContentLoader speed={1} height={250} backgroundColor="#d9d9d9">
                  <Rect x="0" y="0" rx="4" ry="4" width="100%" height="280" />
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
            {readLoadingHeaderImages ? (
              <View />
            ) : randomAdPic !== undefined ? (
              <AdvertisementPopUp />
            ) : (
              <View />
            )}

            {openModal ? <PressHeaderToPopUp url={popUpImage} /> : <View />}

            <SpinningWheel
              spinningWheelModal={spinningWheelModal}
              randomCategory={randomCategory}
              spinStatus={spinStatus}
              onPressRandomCategory={onPressRandomCategory}
              wheelRotation={wheelRotation}
              onCloseSpinningWheelModal={onCloseSpinningWheelModal}
              fadeWheel={fadeWheel}
              spinningWheel={spinningWheel}
            />
          </View>
          {/* The quarter screen Row */}
          <View style={styles.quarterSection}>
            <TouchableOpacity style={styles.QuarterContainer1} onPress={onShopsPressed}>
              <Icon name="ios-checkmark-circle-outline" color="white" size={25} />
              <Text style={styles.floatingCheckInTitle}>Shops</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.QuarterContainer2} onPress={onPromotionsPressed}>
              <Icon name="ios-checkmark-circle-outline" color="white" size={25} />
              <Text style={styles.floatingCheckInTitle}>Promotions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.QuarterContainer3} onPress={onOpenSpinningWheelModal}>
              <Icon name="ios-checkmark-circle-outline" color="white" size={25} />
              <Text style={styles.floatingCheckInTitle}>Spin Me</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.QuarterContainer4} onPress={onCheckInPressed}>
              <Icon name="ios-checkmark-circle-outline" color="white" size={25} />
              <Text style={styles.floatingCheckInTitle}>Check In</Text>
            </TouchableOpacity>
          </View>

          {/* The Last Row*/}
          <View>
            <Text>Hot Pick Today</Text>

            {/* <FlatList></FlatList> */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
