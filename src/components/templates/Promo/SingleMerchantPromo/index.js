import React from "react";
import styles from "./styles";

import { Dimensions, Platform, Animated } from "react-native";
// import { GestureHandler } from "expo";
// const { PinchGestureHandler } = GestureHandler;
import GestureHandler, { PinchGestureHandler } from "react-native-gesture-handler";

import {
  View,
  Text,
  ScrollView,
  CustomIcon,
  Modal,
  Carousel,
  TouchableOpacity,
  Image,
} from "@components/atoms";

import moment from "moment";
import ContentLoader, { Rect } from "react-content-loader/native";
// import Image from "react-native-transformable-image";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const SingleMerchantPromo = ({
  dataSource,
  promotionModal,
  noImage,
  onPromoPressedClose,
  onPromoteClick,
  onCarouselPressed,
  onPressedSwipe,
  setSwiperRef,
  isVisible,
  onClose,
  readDataStatus,
}) => {
  const {
    modelBackground,
    adsImageStyle,
    closeButton,
    cross,
    caption,
    dateContainer,
    distanceIndicatorTitle,
  } = styles;

  const closeIcon = require("../../../../assets/chilliBuddyCheckin/closeButton.png");
  const width = Platform.OS === "ios" && Platform.isPad === true ? 460 : 300;

  const startDate = moment(dataSource.startTime).format("DD-MM-YYYY");
  const endDate = moment(dataSource.endTime).format("DD-MM-YYYY");
  // logOutZoomState = (event, gestureState, zoomableViewEventObject) => {
  //   console.log("");
  //   console.log("");
  //   console.log("-------------");
  //   console.log("Event: ", event);
  //   console.log("GestureState: ", gestureState);
  //   console.log("ZoomableEventObject: ", zoomableViewEventObject);
  //   console.log("");
  //   console.log(
  //     `Zoomed from ${zoomableViewEventObject.lastZoomLevel} to  ${zoomableViewEventObject.zoomLevel}`
  //   );
  // };
  // scale = new Animated.Value(1);
  // onZoomEventFunction = Animated.event(
  //   [
  //     {
  //       nativeEvent: { scale: this.scale },
  //     },
  //   ],
  //   {
  //     useNativeDriver: true,
  //   }
  // );

  // onZoomStateChangeFunction = (event) => {
  //   console.log(event.nativeEvent);
  //   if (event.nativeEvent.oldState === GestureHandler.State.ACTIVE) {
  //     Animated.spring(this.scale, {
  //       toValue: 1,
  //       useNativeDriver: true,
  //       bounciness: 1,
  //     }).start();
  //   }
  // };

  return (
    <Modal transparent={true} visible={promotionModal} onBackdropPress={onClose}>
      {readDataStatus ? (
        <ContentLoader speed={1} width={"100%"} height={"100%"} backgroundColor="white">
          <Rect
            x="10"
            y="20"
            rx="10"
            ry="10"
            width={windowWidth - 20}
            height={windowHeight - 110}
          />
        </ContentLoader>
      ) : (
        <View style={modelBackground}>
          <View style={{ width: width }}>
            <Carousel
              ref={setSwiperRef}
              data={dataSource.images}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity onPress={onCarouselPressed}>
                    {dataSource.images.length > 0 ? (
                      // <ImageZoom
                      //   cropWidth={800}
                      //   cropHeight={Dimensions.get("window").height}
                      //   // imageWidth={400}
                      //   // imageHeight={500}
                      //   onClick={onCarouselPressed}
                      //   // minScale={100}
                      // >
                      // <ImageModal
                      //   swipeToDismiss={false}
                      //   resizeMode="cover"
                      //   style={adsImageStyle}
                      //   source={{
                      //     uri: item,
                      //   }}
                      //   onTap={onCarouselPressed}
                      // />
                      // <ReactNativeZoomableView
                      //   maxZoom={1.5}
                      //   minZoom={0.5}
                      //   zoomStep={0.5}
                      //   initialZoom={1}
                      //   bindToBorders={true}
                      //   // onZoomAfter={this.logOutZoomState}
                      //   style={adsImageStyle}
                      // >
                      // <PinchGestureHandler
                      //   onGestureEvent={this.onZoomEventFunction}
                      //   onHandlerStateChange={this.onZoomStateChangeFunction}
                      // >
                      //   <Animated.Image
                      //     // style={{
                      //     //   width: windowWidth,
                      //     //   height: 530,
                      //     //   transform: [{ scale: this.scale }],
                      //     // }}
                      //     style={[styles.adsImageStyle, { transform: [{ scale: this.scale }] }]}
                      //     source={{ uri: item }}
                      //     resizeMode="cover"
                      //   />
                      // </PinchGestureHandler>
                      <Image source={{ uri: item }} resizeMode="cover" style={adsImageStyle} />
                    ) : (
                      <Image source={noImage} style={adsImageStyle} resizeMode={"cover"} />
                    )}
                  </TouchableOpacity>
                );
              }}
              loop={false}
              sliderWidth={width}
              itemWidth={width}
              contentContainerCustomStyle={{ alignItems: "center" }}
            />
            <TouchableOpacity style={closeButton} onPress={onPromoPressedClose} activeOpacity={1}>
              <Image source={closeIcon} style={cross} />
            </TouchableOpacity>
            <View style={dateContainer}>
              <Text style={distanceIndicatorTitle}>
                Valid from {startDate} to {endDate}
              </Text>
            </View>
            {dataSource.images.length > 1 ? <Text style={caption}>slide for more</Text> : <View />}
          </View>
        </View>
      )}
    </Modal>
  );
};

export { SingleMerchantPromo };

{
  /* <ScrollView>
      <View style={posterArea}>
            <Image
                style={poster}
                source={cover}
            /> 
        <ImageSwiper 
            autoplay={false}
            style={styles}
            condition={dataSource.images.length > 0 }
            noImageSlider={noImage}
            slider={dataSource.images}
            //setSwiperRef={setSwiperRef}
            showsButtons={true}
            setSwiperRef={setSwiperRef}
            nextButton={<MaterialCommunityIcons name="chevron-right-circle" size={30} onPress={onPressedSwipe.bind(this, "next")} />}
            prevButton={<MaterialCommunityIcons name="chevron-left-circle" size={30} onPress={onPressedSwipe.bind(this, "back")} />}
        />
        <Carousel
          ref={setSwiperRef}
          data={dataSource.images}
          renderItem={({ item, index }) => {
            return (
              <View key={index} style={subContainer1}>
                {dataSource.images.length > 0 ? (
                  <Image source={{ uri: item }} style={imageTopStyle} resizeMode={"cover"} />
                ) : (
                  <Image
                    source={noImage}
                    style={imageTopStyle}
                    //resizeMode={"cover"}
                  />
                )}
              </View>
            );
          }}
          loop={true}
          sliderWidth={windowWidth}
          itemWidth={windowWidth}
        />
        <MaterialCommunityIcons
          style={promoImageSwapLeft}
          name="chevron-left-circle"
          size={30}
          onPress={onPressedSwipe.bind(this, "back")}
        />
        <MaterialCommunityIcons
          style={promoImageSwapRight}
          name="chevron-right-circle"
          size={30}
          onPress={onPressedSwipe.bind(this, "next")}
        />
      </View>
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
      <TouchableOpacity style={styles.floatingShopButton} onPress={onMerchantPressed}>
        <CustomIcon name="merchant" size={20} color="white" />
        <Text style={styles.floatingShopButtonTitle}>View Shop</Text>
      </TouchableOpacity>
    </ScrollView> */
}
