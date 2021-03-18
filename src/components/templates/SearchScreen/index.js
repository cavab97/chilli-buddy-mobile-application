import React from "react";
import styles from "./styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { CustomNavBar } from "@components/organisms/CustomNavBar";
import Modal from "react-native-modal";

import { Platform, Dimensions } from "react-native";

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
// import { Card, CardSection, SearchBar } from "../../molecules";

import { Card, CardSection, SearchBar, SearchFlatList } from "@components/molecules";
import { SingleMerchantPromo } from "../Promo/SingleMerchantPromo";
import ContentLoader, { Rect } from "react-content-loader/native";

import Icon from "react-native-vector-icons/FontAwesome";
import { NotFoundFooter } from "@components/molecules/index";
const windowWidth = Dimensions.get("window").width;

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
    <TouchableOpacity onPress={onPress} activeOpacity={1}>
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
            <TouchableOpacity onPress={onFavouritePress} activeOpacity={1}>
              <Image
                source={isFavourite ? filledHeartIcon : emptyHeartIcon}
                style={styles.favouriteIcon}
              />
            </TouchableOpacity>
          </View>
        </CardSection>

        <View style={profile}>
          {isPromote === true && <Image source={promotionTag} style={styles.promotionWrapper} />}
        </View>
      </View>
    </TouchableOpacity>
  );
}

function PromotionItem({
  picture = [],
  onPress,
  onPromoFavouritePressed,
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
            height: 100,
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
                <TouchableOpacity onPress={onPromoFavouritePressed} activeOpacity={1}>
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

const SearchScreen = ({
  readBookmark,
  submitLoading,
  dataSource,
  handleRefresh,
  onMerchantPressed,
  onPromoFavouritePressed,
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
  searchButtonClick,
  searchButtonClickPromo,
  searchFilterFunction,
  mainScreenMessage,
  dataSearch,
  handleInputFocus,
  isFocused,
  historySearchStore,
  specificMarkPress,
  removeAllPress,
  selectHistory,
}) => {
  return (
    <View style={{ flex: 1 /*height: 100%*/ }} keyboardShouldPersistTaps={"always"}>
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
      {/* <View style={styles.promoTitleContainer}>
        <Text style={styles.pageTitle}>Favourite</Text>
      </View> */}
      {/* <Text style={styles.topSubText}>{!selectedTab ? "Shops" : "Promotions"}</Text> */}
      <View style={styles.SecondSection}>
        <SearchBar
          placeholder={"Search"}
          searchFilterFunction={searchFilterFunction}
          searchButtonClick={!selectedTab ? searchButtonClick : searchButtonClickPromo}
          mainScreenMessageBoolean={mainScreenMessage}
          loading={loading}
          dataSearch={dataSearch}
          readLoading={readLoading}
          handleInputFocus={handleInputFocus}
        />
      </View>
      <View style={{ marginHorizontal: 20 }}>
        {/* {
          (console.log("isFocused"),
          console.log(isFocused),
          console.log("shopData.length === 0"),
          console.log(shopData.length === 0),
          console.log("readLoading"),
          console.log(readLoading),
          console.log("loading"),
          console.log(loading),
          console.log("dataSource.length === 0"),
          console.log(dataSource.length === 0))
        } */}
        {(isFocused && shopData.length === 0 && !readLoading && !loading && !selectedTab) ||
        (isFocused && dataSource.length === 0 && !readLoading && !loading && selectedTab) ? (
          <SearchFlatList
            historySearchStore={historySearchStore}
            specificMarkPress={specificMarkPress}
            removeAllPress={removeAllPress}
            selectHistory={selectHistory}
          />
        ) : (
          <View />
        )}
      </View>
      {readLoading || loading ? (
        <View>
          <ContentLoader speed={1} width={"100%"} height={"100%"} backgroundColor="#d9d9d9">
            {/* <Rect x={windowWidth / 1.2} y="15" rx="10" ry="10" width="35" height="40" />
            <Rect x={windowWidth / 1.4} y="15" rx="10" ry="10" width="35" height="40" /> */}
            {/* 
            <Rect x="20" y="130" rx="20" ry="20" width="20%" height="100" />
            <Rect x="110" y="130" rx="20" ry="20" width="20%" height="100" />
            <Rect x="200" y="130" rx="20" ry="20" width="20%" height="100" />
            <Rect x="290" y="130" rx="20" ry="20" width="20%" height="100" /> */}

            <Rect x="20" y="15" rx="10" ry="10" width="90%" height="175" />
            <Rect x="20" y="215" rx="10" ry="10" width="90%" height="175" />
            <Rect x="20" y="415" rx="10" ry="10" width="90%" height="175" />
          </ContentLoader>
        </View>
      ) : !selectedTab ? (
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
              <NotFoundFooter message="No shops found" />
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
              onPromoFavouritePressed={() => onPromoFavouritePressed(item)}
              name={item.title}
              picture={item.coverPhotos}
              distance={item.distance}
              promoID={item.id}
              shopName={item.shop.displayTitle}
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
            dataSource.length === 0 && <NotFoundFooter message="No promotions found" />
          }
          style={styles.flatList}
        />
      )}
    </View>
  );
};

export { SearchScreen };
