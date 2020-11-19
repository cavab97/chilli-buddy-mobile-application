import React from "react";
import styles from "./styles";

import { Dimensions } from "react-native";

import {
  View,
  Image,
  Text,
  ScrollView,
  CustomIcon,
  FlatList,
  Carousel,
  TouchableOpacity,
} from "@components/atoms";

import { ImageSwiper } from "../../../../components/organisms/ImageSwiper";

import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../../../../settings/styles/theme";
import moment from "moment";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const SingleMerchantPromo = ({
  dataSource,
  promotions,
  noImage,
  noPromoteImage,
  onPromoteClick,
  onMerchantPressed,
  onPressedSwipe,
  setSwiperRef,
}) => {
  const {
    posterArea,
    poster,
    imageTopStyle,
    subContainer1,
    promoImageSwapLeft,
    promoImageSwapRight,
  } = styles;

  return (
    <ScrollView>
      <View style={posterArea}>
        {/* <Image
                style={poster}
                source={cover}
            /> */}
        {/* <ImageSwiper 
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
        /> */}
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
        <Text style={{ color: "white" }}> 5KM Away</Text>
      </View>
      <TouchableOpacity style={styles.floatingShopButton} onPress={onMerchantPressed}>
        <CustomIcon name="merchant" size={20} color="white" />
        <Text style={styles.floatingShopButtonTitle}>View Shop</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export { SingleMerchantPromo };
