import React from "react";
import styles from "./styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { CustomNavBar } from "@components/organisms/CustomNavBar";
import Modal from "react-native-modal";

import { Platform } from "react-native";

import {
  ActivityIndicator,
  Icon as Icon2,
  FlatList,
  Image,
  ModalSelector,
  TouchableOpacity,
  View,
  Text,
} from "@components/atoms";

import { Card, CardSection } from "@components/molecules";
import { SingleMerchantPromo } from "../Promo/SingleMerchantPromo";

import Icon from "react-native-vector-icons/FontAwesome";
import { NotFoundFooter } from "@components/molecules/index";
import ContentLoader, { Rect } from "react-content-loader/native";

function ShopItem({
  name,
  logo,
  picture = [],
  category,
  distance,
  onPress,
  isPromote,
  onFavouritePress,
  isFavourite,
}) {
  const { shopImage, title, detail, profile } = styles;
  let cover = "";
  if (picture.length === 0) cover = require("../../../assets/images/404NotFound800x533.jpeg");
  else cover = { uri: picture[0] };

  let icon = "";
  if (logo.length === 0) icon = require("../../../assets/logo.png");
  else icon = { uri: logo[0] };

  const distanceIcon = require("../../../assets/icons/distance.png");
  const emptyHeartIcon = require("../../../assets/icons/emptyHeart.png");
  const filledHeartIcon = require("../../../assets/icons/filledHeart.png");
  const promotionTag = require("../../../assets/chilliBuddy2.0Icon/chilliBuddyMainScreenIconV2/promotions.png");

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.shopCardContainer}>
        <CardSection style={styles.imageContainer}>
          <Image style={shopImage} resizeMode="cover" source={cover} />
        </CardSection>

        <CardSection style={styles.textContainer}>
          <Text style={title}>{name}</Text>
        </CardSection>

        <CardSection style={styles.descriptionContainer}>
          <Text style={detail}>{category}</Text>
          <MaterialCommunityIcons
            name="checkbox-blank-circle"
            size={5}
            color="#979797"
            style={{ marginHorizontal: 8 }}
          />
          <Image source={distanceIcon} style={styles.distanceIcon} />
          <Text style={detail}>Just {+(Math.round(distance + "e+2") + "e-2")} Km away</Text>
          <View style={{ position: "absolute", right: 5, bottom: 0 }}>
            <TouchableOpacity onPress={onFavouritePress}>
              <Image
                source={isFavourite ? filledHeartIcon : emptyHeartIcon}
                style={styles.favouriteIcon}
              />
            </TouchableOpacity>
          </View>
        </CardSection>

        <TouchableOpacity style={profile}>
          {isPromote === true && <Image source={promotionTag} style={styles.promotionWrapper} />}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

function PromotionItem({
  picture = [],
  onPress,
  onBookmarkPressed,
  gotBookmark,
  readBookmark,
  submitLoading,
  index,
  distance,
  name,
  shopName,
}) {
  const { image } = styles;
  let cover = "";
  if (picture.length === 0) cover = require("@assets/images/404NotFound800x533.jpeg");
  else cover = { uri: picture[0] };

  const distanceIcon = require("../../../assets/icons/distance.png");
  const emptyHeartIcon = require("../../../assets/icons/emptyHeart.png");
  const filledHeartIcon = require("../../../assets/icons/filledHeart.png");

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1}>
      <View style={styles.cardContainer}>
        <View style={{ width: "37%" }}>
          <CardSection style={styles.imageContainer}>
            <Image style={image} resizeMode="cover" source={cover} />
          </CardSection>
        </View>
        <View
          style={{
            width: "63%",
            height: Platform.isPad ? 200 : 95,
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            paddingBottom: 10,
            paddingLeft: Platform.isPad ? 0 : 7,
          }}
        >
          <CardSection style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={2}>
              {name}
            </Text>
          </CardSection>
          <View>
            <CardSection style={styles.textContainer}>
              <Text style={styles.subtitle} numberOfLines={1}>
                {shopName}
              </Text>
            </CardSection>
            <CardSection style={styles.descriptionContainer}>
              <Image source={distanceIcon} style={styles.distanceIcon} />
              <Text style={styles.detail}>
                Just {+(Math.round(distance + "e+2") + "e-2")}km away
              </Text>
              <View style={styles.bookmarkIcon}>
                <TouchableOpacity onPress={onBookmarkPressed}>
                  <Image
                    source={gotBookmark ? filledHeartIcon : emptyHeartIcon}
                    style={styles.favouriteIcon}
                  />
                </TouchableOpacity>
              </View>
            </CardSection>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const FavouriteList = ({
  readBookmark,
  submitLoading,
  dataSource,
  handleRefresh,
  onMerchantPressed,
  onBookmarkPressed,
  loading,
  readLoading,
  onBackPressed,
  toggleBookmark,
  bookmark,
  onShopsPressed,
  selectedTab,
  promotionModal,
  promotion,
  onCarouselPressed,
  onPromoPressedClose,
  onPromoPressed,
  onFavouritePressed,
  onToggleTab,
  shopData,
}) => {
  if (readLoading) {
    return (
      <View>
        <CustomNavBar onPressBack={onBackPressed} />

        <ContentLoader speed={1} width={"100%"} height={"100%"} backgroundColor="#d9d9d9">
          <Rect x="20" y="15" rx="10" ry="10" width={Platform.isPad ? "95%" : "90%"} height="175" />
          <Rect
            x="20"
            y="215"
            rx="10"
            ry="10"
            width={Platform.isPad ? "95%" : "90%"}
            height="175"
          />
          <Rect
            x="20"
            y="415"
            rx="10"
            ry="10"
            width={Platform.isPad ? "95%" : "90%"}
            height="175"
          />
          <Rect
            x="20"
            y="615"
            rx="10"
            ry="10"
            width={Platform.isPad ? "95%" : "90%"}
            height="175"
          />
        </ContentLoader>
      </View>
    );
  } else
    return (
      <View style={{ flex: 1 /*height: 100%*/ }}>
        <CustomNavBar
          textOne="Shops"
          textTwo="Promotions"
          onPressBack={onBackPressed}
          onPressButton1={onToggleTab}
          onPressButton2={onToggleTab}
          selectedButton1={!selectedTab}
          selectedButton2={selectedTab}
        />

        <SingleMerchantPromo
          promotionModal={promotionModal}
          dataSource={promotion}
          onCarouselPressed={onCarouselPressed}
          onPromoPressedClose={onPromoPressedClose}
        />

        <View style={styles.promoTitleContainer}>
          <Text style={styles.pageTitle}>Favourite</Text>
        </View>

        <Text style={styles.topSubText}>{!selectedTab ? "Shops" : "Promotions"}</Text>

        {!selectedTab ? (
          <FlatList
            data={shopData}
            renderItem={({ item, index }) => (
              <ShopItem
                onPress={() => onMerchantPressed(item)}
                onFavouritePress={() => onFavouritePressed(item)}
                name={item.displayTitle}
                logo={item.logo}
                picture={item.images}
                address={item.address}
                category={item.category}
                distance={item.distance}
                index={index}
                isFavourite={item.isFavourite}
                isPromote={item.isPromote}
              />
            )}
            keyExtractor={(item) => item.id}
            onRefresh={handleRefresh}
            refreshing={readLoading}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              shopData.length === 0 ? (
                <NotFoundFooter message="No favourite shops found" />
              ) : (
                <View style={{ paddingBottom: 30 }} />
              )
            }
            style={styles.flatList}
          />
        ) : (
          <FlatList
            data={dataSource}
            renderItem={({ item, index }) => (
              <PromotionItem
                onPress={() => onPromoPressed(item)}
                onBookmarkPressed={() => onBookmarkPressed(item)}
                name={item.promotion.title}
                picture={item.promotion.coverPhotos}
                distance={item.distance}
                promoID={item.id}
                shopName={item.promotion.shop.displayTitle}
                gotBookmark={item.isBookmark} //{gotBookmark}
                index={index}
                readBookmark={readBookmark}
                submitLoading={submitLoading}
              />
            )}
            keyExtractor={(item) => item.id}
            onRefresh={handleRefresh}
            refreshing={false}
            ListFooterComponent={
              dataSource.length === 0 && <NotFoundFooter message="No favourite promotions found" />
            }
            style={styles.flatList}
          />
        )}
      </View>
    );
};

export { FavouriteList };
