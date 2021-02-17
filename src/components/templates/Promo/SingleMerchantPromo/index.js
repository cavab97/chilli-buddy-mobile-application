import React from "react";
import styles from "./styles";

import { Dimensions, Platform } from "react-native";

import {
  View,
  Image,
  Text,
  ScrollView,
  CustomIcon,
  Modal,
  Carousel,
  TouchableOpacity,
} from "@components/atoms";


import moment from "moment";

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
  onClose
}) => {
  const {
    modelBackground,
    adsImageStyle,
    closeButton,
    cross,
    caption,
    dateContainer,
    distanceIndicatorTitle
  } = styles;

  const closeIcon = require("../../../../assets/chilliBuddyCheckin/closeButton.png");
  const width = Platform.OS === "ios" && Platform.isPad === true ? 460 : 300;

  const startDate = moment(dataSource.startTime).format('DD-MM-YYYY')
  const endDate = moment(dataSource.endTime).format('DD-MM-YYYY')

  return (
    <Modal
      transparent={true}
      visible={promotionModal}
      onBackdropPress={onClose}
    >
      <View style={modelBackground}>
        <View style={{ width: width }}>
              <Carousel
                ref={setSwiperRef}
                data={dataSource.images}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity onPress={onCarouselPressed}>
                      {dataSource.images.length > 0 ? (
                        <Image 
                          source={{ uri: item }} 
                          style={adsImageStyle} 
                          resizeMode={"cover"} 
                        />
                      ) : (
                        <Image
                          source={noImage}
                          style={adsImageStyle}
                          //resizeMode={"cover"}
                        />
                      )}
                    </TouchableOpacity>
                  );
                }}
                loop={true}
                sliderWidth={width}
                itemWidth={width}
                contentContainerCustomStyle={{ alignItems: 'center' }}
              />
            <TouchableOpacity
              style={closeButton}
              onPress={onPromoPressedClose}
              activeOpacity={1}
            >
              <Image
                source={closeIcon}
                style={cross}
              />
            </TouchableOpacity>
            <View style={dateContainer}>
              <Text style={distanceIndicatorTitle}>  
                Valid from {startDate} to {endDate}
              </Text>
            </View>
            <Text style={caption}>
              slide for more
            </Text>
        </View>
        
      </View>
    </Modal> 
  );
};

export { SingleMerchantPromo };


{/* <ScrollView>
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
    </ScrollView> */}
