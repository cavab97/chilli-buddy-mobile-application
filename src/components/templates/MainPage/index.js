import React from "react";
import styles from "./styles";
import { Platform, Dimensions, Animated } from "react-native";
import { Actions } from "react-native-router-flux";
//import Video  from "react-native-video";
import { Video } from "expo-av";
import VideoPlayer from "expo-video-player";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
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
} from "../../atoms";

import { Card, CardSection } from "../../molecules";

import { InfoBox } from "@components/organisms/InfoBox";

import { SmallCardList } from "../../organisms/SmallCardList";

import { ImageSwiper } from "../../organisms/ImageSwiper";

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
  checkIn,
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
      {/* The First screen Row */}
      <View>
        {/* Column 1*/}
        <View>
          {/* Row1 for Name*/}
          <View></View>
          {/* Row2 for Good Morning*/}
          <View></View>
        </View>
        {/* Column 1*/}
        <View>
          {/* Row1 for Profile Button*/}
          <View></View>
        </View>
      </View>

      {/* The Second screen Row */}
      <View>
        {/* The Slider*/}
        {/* ImageSwiper */}
      </View>
      {/* The Third screen Row */}
      <View>
        <View>
          <Text>Shops</Text>
        </View>
        <View>
          <Text>Promotions</Text>
        </View>
        <View>
          <Text>Spin Me</Text>
        </View>
        <View>
          <Text>Check-In</Text>
        </View>
      </View>

      {/* The Last Row*/}
      <View>
        <Text>Hot Pick Today</Text>

        <FlatList></FlatList>
      </View>
    </View>
  );
};
