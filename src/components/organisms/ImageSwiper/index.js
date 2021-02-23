import React from "react";
import styles from "./styles";
import { Image, Swiper, View, TouchableOpacity } from "../../atoms";

const ImageSwiper = ({
  style,
  slider,
  autoplayTime,
  autoplay,
  noImageSlider,
  condition,
  showsButtons = false,
  resizeMode = "cover",
  setSwiperRef,
  nextButton,
  prevButton,
  onPressImage,
  index = 0,
}) => {
  return (
    <Swiper
      autoplay={autoplay}
      autoplayTimeout={autoplayTime}
      activeDot={<View style={style.actionDotStyle} />}
      dot={<View style={style.dotStyle} />}
      paginationStyle={style.paginationStyle}
      index={index}
      ref={setSwiperRef}
      showsButtons={showsButtons}
      nextButton={nextButton}
      prevButton={prevButton}
      showsPagination={true}
      // containerStyle={styles.container}
      // removeClippedSubviews={false}
      // showsHorizontalScrollIndicator={true}
      // style={styles.wrapper}
    >
      {condition ? (
        slider.map((data, index) => {
          return (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={onPressImage.bind(this, index)}
              key={data.shopId}
              // style={style.subContainer1}
            >
              {/* <View style={style.subContainer1}> */}
              <Image
                source={{ uri: data.imageUri }}
                resizeMode={resizeMode}
                style={style.imageTopStyle}
              />
              {/* </View> */}
            </TouchableOpacity>
          );
        })
      ) : (
        <View style={style.subContainer1}>
          <Image source={noImageSlider} style={style.imageTopStyle} resizeMode={resizeMode} />
        </View>
      )}
    </Swiper>
  );
};

export { ImageSwiper };
