import React from "react";

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
    >
      {condition ? (
        slider.map((data, index) => {
          return (
            <TouchableOpacity key={index} activeOpacity={0.6} onPress={onPressImage}>
              {/* <View key={index} style={style.subContainer1}> */}
              <Image source={{ uri: data }} style={style.imageTopStyle} resizeMode={resizeMode} />
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
