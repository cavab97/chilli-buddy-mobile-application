import React from "react";
import styles from "./styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

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

import { CustomNavBar } from "@components/organisms/CustomNavBar";
import moment from "moment";

function Item({ 
  picture = [], 
  onPress, 
  onBookmarkPressed, 
  gotBookmark, 
  distance,
  name,
  shopName,
}) {
  const { image, detail, title, subtitle } = styles;

  let cover = "";
  if (picture.length === 0) cover = require("@assets/images/404NotFound800x533.jpg");
  else cover = { uri: picture[0] };

  const distanceIcon = require("../../../../assets/icons/distance.png");
  const emptyHeartIcon = require("../../../../assets/icons/emptyHeart.png");
  const filledHeartIcon = require("../../../../assets/icons/filledHeart.png");

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.cardContainer}>
        <View style={{ width: "35%" }}>
          <CardSection style={styles.imageContainer}>
            <Image 
              style={image} 
              resizeMode="cover" 
              source={cover} 
            />
          </CardSection>
        </View>
        <View style={{ width: "65%", height: 100 }}>
          <CardSection style={styles.textContainer}>
            <Text style={title}>
              {name}
            </Text>
          </CardSection>
          {/* <CardSection style={styles.textContainer}>
            <Text style={subtitle}>
              Valid from {date} to {date}
            </Text>
          </CardSection> */}
          <CardSection style={styles.textContainer}>
            <Text style={subtitle}>
              {shopName}  
            </Text>
          </CardSection>
        <CardSection style={styles.descriptionContainer}>
          {/* <Text style={detail}>
            {category}
          </Text> */}
          {/* <MaterialCommunityIcons
            name="checkbox-blank-circle"
            size={5}
            color="#979797"
            style={{ marginHorizontal: 8 }}
          /> */}
          <Image 
            source={distanceIcon} 
            style={styles.distanceIcon}
          />
          <Text style={detail}>
            Just {+(Math.round(distance + "e+2") + "e-2")} Km away
          </Text>
          <View style={{ position: 'absolute', right: 5, bottom:0 }}>
            <TouchableOpacity 

              onPress={onBookmarkPressed}
            >
              {gotBookmark ? (
                <Image 
                  source={filledHeartIcon} 
                  style={styles.favouriteIcon}
                />
              ) : (
                <Image 
                  source={emptyHeartIcon} 
                  style={styles.favouriteIcon}
                />
              )}
            </TouchableOpacity> 
          </View>
        </CardSection>

       {/*  <TouchableOpacity style={styles.bookmark} onPress={onBookmarkPressed}>
          {gotBookmark ? (
            <View
              style={{
                borderRadius: 100,
                borderWidth: 0,
                borderColor: "#ffd30f",
                backgroundColor: "#ffd30f",
              }}
            >
              <Icon2
                size={50}
                iconStyle={{ borderWidth: 0 }}
                containerStyle={{ justifyContent: "center" }}
                name={"stars"}
                color="#d60000"
              />
            </View>
          ) : (
            <View
              style={{
                borderRadius: 100,
                backgroundColor: "#ffffff",
              }}
            >
              <Icon2
                size={50}
                iconStyle={{ borderWidth: 0 }}
                containerStyle={{ justifyContent: "center" }}
                name={"stars"}
                color="#d60000"
              />
            </View>
          )}
        </TouchableOpacity> */}
        {/* )} */}
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
  renderFooter,
  onMerchantPressed,
  onCategoryChange,
  onTagChange,
  onBookmarkPressed,
  onBackPressed,
  bookmark
}) => {

  const emptyHeartIcon = require("../../../../assets/icons/emptyHeartRed.png");
  const filledHeartIcon = require("../../../../assets/icons/filledHeart.png");

  return (
    <View style={{ flex: 1 /*height: 100%*/ }}>
      <CustomNavBar
        textOne="Category"
        textTwo="Tags"
        onPressBack={onBackPressed}
      />

      <View style={styles.promoTitleContainer}>
        <Text style={styles.pageTitle}>
          Promotions
        </Text>

        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={toggleBookmark}
          >
            <Image 
              source={bookmark ? filledHeartIcon : emptyHeartIcon} 
              style={styles.emptyHeartIcon}
            />
          </TouchableOpacity>

        </View>
      </View>
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

      <FlatList
        data={dataSource}
        renderItem={({ item, index }) => (
          <Item
            onPress={() => onMerchantPressed(item)}
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
        //ListFooterComponent={renderFooter({ empty: dataSource.length === 0 ? true : false })}
        style={styles.flatList}
      />
    </View>
  );
};

export { PromoList };
