import React from "react";
import styles from "./styles";

import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  View,
  Text,
} from "@components/atoms";

import { NotFoundFooter, CardSection } from "@components/molecules";

import { CustomNavBar } from "@components/organisms/CustomNavBar";
import { SwipeableModal } from "@components/organisms/SwipeableModal";
import { SingleMerchantPromo } from "../SingleMerchantPromo";

function Item({ 
  picture = [], 
  onPress, 
  onBookmarkPressed, 
  gotBookmark, 
  distance,
  name, 
  shopName 
}) {
  const { 
    image, 
    detail, 
    title, 
    subtitle, 
    bookmarkIcon 
  } = styles;

  let cover = "";
  if (picture.length === 0) cover = require("@assets/images/404NotFound800x533.jpg");
  else cover = { uri: picture[0] };

  const distanceIcon = require("../../../../assets/icons/distance.png");
  const emptyHeartIcon = require("../../../../assets/icons/emptyHeart.png");
  const filledHeartIcon = require("../../../../assets/icons/filledHeart.png");

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.cardContainer}>
        <View style={styles.leftCardContainer}>
          <CardSection style={styles.imageContainer}>
            <Image 
              style={image} 
              resizeMode="cover" 
              source={cover} 
            />
          </CardSection>
        </View>
        <View style={styles.rightCardContainer}>
          <CardSection style={styles.textContainer}>
            <Text 
              style={title} 
              numberOfLines={2}
            >
              {name}
            </Text>
          </CardSection>
          <View>
            <CardSection style={styles.textContainer}>
              <Text 
                style={subtitle} 
                numberOfLines={1}
              >
                {shopName}
              </Text>
            </CardSection>
            <CardSection style={styles.descriptionContainer}>
              <Image 
                source={distanceIcon} 
                style={styles.distanceIcon} 
              />
              <Text style={detail}>
                Just {+(Math.round(distance + "e+2") + "e-2")}km away
              </Text>
              <View style={bookmarkIcon}>
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

const PromoList = ({
  loading,
  readBookmark,
  submitLoading,
  dataSource,
  toggleBookmark,
  categories,
  tags,
  selectedCategory,
  handleRefresh,
  onCarouselPressed,
  onPromoPressed,
  onCategoryChange,
  onTagChange,
  onBookmarkPressed,
  onBackPressed,
  bookmark,
  tagModal,
  categoryModal,
  onCategoryPressed,
  onTagPressed,
  promotion,
  promotionModal,
  onPromoPressedClose,
}) => {
  
  const emptyHeartIcon = require("../../../../assets/icons/emptyHeartRed.png");
  const filledHeartIcon = require("../../../../assets/icons/filledHeart.png");

  return (
    <View style={{ flex: 1 /*height: 100%*/ }}>
      <CustomNavBar 
        textOne="Category" 
        textTwo="Tags" 
        onPressBack={onBackPressed} 
        onPressButton1={onCategoryPressed}
        onPressButton2={onTagPressed}
        selectedButton1={categoryModal}
        selectedButton2={tagModal}
      />

      <SwipeableModal
        modalVisible={categoryModal}
        dataSource={categories}
        modalTitle="Category"
        type='category'
        full={false}
        onSwipeComplete={onCategoryPressed}
        onBackDropPressed={onCategoryPressed}
      />

      <SwipeableModal
        modalVisible={tagModal}
        dataSource={tags}
        modalTitle="Tags"
        type='tag'
        full={false}
        onSwipeComplete={onTagPressed}
        onBackDropPressed={onTagPressed}
      />

      <SingleMerchantPromo
        promotionModal={promotionModal}
        dataSource={promotion}
        onCarouselPressed={onCarouselPressed}
        onPromoPressedClose={onPromoPressedClose}
      />

      <View style={styles.promoTitleContainer}>
        <Text style={styles.pageTitle}>
          Promotions
        </Text>

        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={toggleBookmark}>
            <Image
              source={bookmark ? filledHeartIcon : emptyHeartIcon}
              style={styles.emptyHeartIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    
      <FlatList
        data={dataSource}
        renderItem={({ item, index }) => (
          <Item
            onPress={() => onPromoPressed(item)}
            onBookmarkPressed={() => onBookmarkPressed(item)}
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
        ListFooterComponent={dataSource.length === 0 && <NotFoundFooter message="No promotion found"/>}
        style={styles.flatList}
      />
    </View>
  );
};

export { PromoList };

  {/* <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginBottom: 8,
        }}
      >
        <ModalSelector
          onChange={onCategoryChange.bind(this)}
          data={categories}
          initValue="Select Categories"
          style={styles.categoriesButton}
          selectStyle={styles.categoriesSelect}
          selectTextStyle={styles.modalSelectTextStyle}
          optionTextStyle={styles.modalOptionTextStyle}
          keyExtractor={(item) => item.id}
          labelExtractor={(item) => item.title}
        />

        <ModalSelector
          data={selectedCategory.tags}
          keyExtractor={(item) => item}
          labelExtractor={(item) =>
            tags.filter((tag) => tag.id === item).map(({ title }) => title)[0]
          }
          onChange={onTagChange.bind(this)}
          selectStyle={styles.categoriesSelect}
          selectTextStyle={styles.modalSelectTextStyle}
          optionTextStyle={styles.modalOptionTextStyle}
          style={{
            justifyContent: "center",
            borderWidth: 1.2,
            marginRight: 5,
            marginTop: 13,
            backgroundColor: "#D60000",
            borderColor: "#D60000",
            borderRadius: 3,
          }}
        >
          <Icon name="filter" size={20} style={styles.tagsButton} />
        </ModalSelector>
      </View> */}

