import React from "react";
import styles from "./styles";
import { Platform, Dimensions } from "react-native";
import { Actions } from "react-native-router-flux";

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
} from "../../atoms";

import { Card, CardSection } from "../../molecules";

import { InfoBox } from "@components/organisms/InfoBox";

import { SmallCardList } from "../../organisms/SmallCardList";

import { ImageSwiper } from "../../organisms/ImageSwiper";

import moment from "moment";
import ContentLoader, { Rect } from "react-content-loader/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { CustomIcon } from "@components/atoms/index";
import Constants from "expo-constants";

export default ({
  readFail,
  slider,
  dataSource,
  dataSource2,
  casualImage,
  luxuryImage,
  sectionTitle1,
  sectionTitle2,
  sectionTitle3,
  label1,
  label2,
  unit,
  onPressCard,
  onPressImage, //Constant for clicking image advertisement
  advertisements,
  onPressAdvertisement,
  noImageAdvertisement,
  noImageHeaderSlider,
  readLoadingAdvertisement,
  readLoadingCategoryList,
  readLoadingRouteTicket,
  readLoadingHeaderImages,
  onCloseAdvertisementModal,
  isAdvertisementModelShow,
  randomAdPic,
  getShopId,
  onPressPopUp,
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

  const AdvertisementPopUp = () => {
    return (
      <Modal animationType="fade" transparent={true} visible={isAdvertisementModelShow}>
        <View style={styles.modelBackground}>
          <View style={styles.adsImageContainer}>
            <TouchableOpacity onPress={() => onPressPopUp(getShopId)}>
              <Image
                source={{ uri: randomAdPic }}
                style={styles.adsImageStyle}
                //resizeMode="contain"
              />
              <TouchableOpacity style={styles.closeButton} onPress={onCloseAdvertisementModal}>
                <FontAwesome name="close" size={30} color="#D60000" />
              </TouchableOpacity>
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

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
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

        {readLoadingCategoryList ? (
          <View style={styles.subContainer2}>
            <View>
              <Text style={styles.sectionTitle}> {sectionTitle1} </Text>
            </View>
            <VirtualizedList
              vertical
              showsHorizontalScrollIndicator={false}
              data={DATA}
              renderItem={({ index }) => <CardListLoading index={index} />}
              keyExtractor={(item) => item.key}
              getItemCount={() => {
                return 6;
              }}
              getItem={getItem}
            />
          </View>
        ) : dataSource2.length != 0 ? (
          <View style={styles.subContainer2}>
            <AdvertisementPopUp />
            <View>
              <Text style={styles.sectionTitle}> {sectionTitle1} </Text>
            </View>
            <FlatList
              vertical
              showsHorizontalScrollIndicator={false}
              data={dataSource2}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => <CategoriesList data={item} index={index} />}
              scrollEnabled={dataSource2.length > 1 ? true : false}
            />
            <View style={{ height: 25 }} />
          </View>
        ) : (
          <View style={styles.subContainer2}></View>
        )}
      </View>
    </ScrollView>
  );
};
