import React from "react";
import styles from "./styles";
import { Dimensions } from "react-native";

import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  View,
  Text,
} from "@components/atoms";

import { NotFoundFooter, CardSection } from "@components/molecules";
import ContentLoader, { Rect } from "react-content-loader/native";

import { CustomNavBar } from "@components/organisms/CustomNavBar";
import { SwipeableModal } from "@components/organisms/SwipeableModal";
import { SingleMerchantPromo } from "../SingleMerchantPromo";
import Icon from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const windowWidth = Dimensions.get("window").width;

function Item({
  picture = [],
  onPress,
  onBookmarkPressed,
  gotBookmark,
  distance,
  name,
  shopName,
  category,
}) {
  const { image, detail, title, subtitle, bookmarkIcon } = styles;

  let cover = "";
  if (picture.length === 0) cover = require("@assets/images/404NotFound800x533.jpeg");
  else cover = { uri: picture[0] };

  const distanceIcon = require("../../../../assets/icons/distance.png");
  const emptyHeartIcon = require("../../../../assets/icons/emptyHeart.png");
  const filledHeartIcon = require("../../../../assets/icons/filledHeart.png");

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.cardContainer}>
        <View style={styles.leftCardContainer}>
          <CardSection style={styles.imageContainer}>
            <Image style={image} resizeMode="cover" source={cover} />
          </CardSection>
        </View>
        <View style={styles.rightCardContainer}>
          <CardSection style={styles.textContainer}>
            <Text style={title} numberOfLines={2}>
              {name}
            </Text>
          </CardSection>
          <View>
            <CardSection style={styles.textContainer}>
              <Text style={subtitle} numberOfLines={1}>
                {shopName}
              </Text>
            </CardSection>
            <CardSection style={styles.descriptionContainer}>
              {/* <Text style={detail}>{category}</Text>
              <MaterialCommunityIcons
                name="checkbox-blank-circle"
                size={5}
                color="#979797"
                style={{ marginHorizontal: 8 }}
              /> */}
              <Image source={distanceIcon} style={styles.distanceIcon} />
              <Text style={detail}>Just {+(Math.round(distance + "e+2") + "e-2")}km away</Text>
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
  allCategory,
  allTag,
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
  selectedTag,
  onCategoryRemove,
}) => {
  const emptyHeartIcon = require("../../../../assets/icons/emptyHeartRed.png");
  const filledHeartIcon = require("../../../../assets/icons/filledHeart.png");

  let selectedCategoryTitle = allCategory.filter((category) => category.id === selectedCategory);
  selectedCategoryTitle = selectedCategoryTitle.length > 0 ? selectedCategoryTitle[0].title : "";

  let selectedTagTitle = allTag.filter((tag) => tag.id === selectedTag);
  selectedTagTitle = selectedTagTitle.length > 0 ? selectedTagTitle[0].title : "";

  let categoryType = "category";
  let tagType = "tag";
  // console.log(loading);
  // if (loading) {
  //   return (
  //     <View>
  //       <CustomNavBar
  //         textOne="Category"
  //         textTwo="Tags"
  //         onPressBack={onBackPressed}
  //         onPressButton1={onCategoryPressed}
  //         onPressButton2={onTagPressed}
  //         selectedButton1={categoryModal}
  //         selectedButton2={tagModal}
  //       />
  //       <ContentLoader speed={1} width={"100%"} height={"100%"} backgroundColor="#d9d9d9">
  //         <Rect x="20" y="105" rx="10" ry="10" width="30%" height="50" />
  //         <Rect x={windowWidth / 1.3} y="105" rx="10" ry="10" width="15%" height="50" />

  //         {/* <Rect x={windowWidth / 1.3} y="65" rx="10" ry="10" width="70" height="30" />
  //       <Rect x={windowWidth / 1.8} y="65" rx="10" ry="10" width="70" height="30" /> */}

  //         {/* <Rect x="20" y="130" rx="20" ry="20" width="20%" height="100" />
  //       <Rect x="110" y="130" rx="20" ry="20" width="20%" height="100" />
  //       <Rect x="200" y="130" rx="20" ry="20" width="20%" height="100" />
  //       <Rect x="290" y="130" rx="20" ry="20" width="20%" height="100" /> */}

  //         <Rect x="20" y="190" rx="10" ry="10" width="30%" height="110" />
  //         <Rect x="160" y="190" rx="10" ry="10" width="50%" height="15" />
  //         <Rect x="160" y="220" rx="10" ry="10" width="30%" height="15" />
  //         <Rect x="160" y="250" rx="10" ry="10" width="30%" height="15" />
  //         <Rect x="160" y="280" rx="10" ry="10" width="50%" height="15" />

  //         <Rect x="20" y="310" rx="10" ry="10" width="30%" height="110" />

  //         <Rect x="160" y="310" rx="10" ry="10" width="50%" height="15" />
  //         <Rect x="160" y="340" rx="10" ry="10" width="30%" height="15" />
  //         <Rect x="160" y="370" rx="10" ry="10" width="30%" height="15" />
  //         <Rect x="160" y="400" rx="10" ry="10" width="50%" height="15" />

  //         <Rect x="20" y="430" rx="10" ry="10" width="30%" height="110" />

  //         <Rect x="160" y="430" rx="10" ry="10" width="50%" height="15" />
  //         <Rect x="160" y="460" rx="10" ry="10" width="30%" height="15" />
  //         <Rect x="160" y="490" rx="10" ry="10" width="30%" height="15" />
  //         <Rect x="160" y="520" rx="10" ry="10" width="50%" height="15" />

  //         <Rect x="20" y="550" rx="10" ry="10" width="30%" height="110" />

  //         <Rect x="160" y="550" rx="10" ry="10" width="50%" height="15" />
  //         <Rect x="160" y="580" rx="10" ry="10" width="30%" height="15" />
  //         <Rect x="160" y="610" rx="10" ry="10" width="30%" height="15" />
  //         <Rect x="160" y="640" rx="10" ry="10" width="50%" height="15" />

  //         <Rect x="20" y="670" rx="10" ry="10" width="30%" height="110" />

  //         <Rect x="160" y="670" rx="10" ry="10" width="50%" height="15" />
  //         <Rect x="160" y="700" rx="10" ry="10" width="30%" height="15" />
  //         <Rect x="160" y="730" rx="10" ry="10" width="30%" height="15" />
  //       </ContentLoader>
  //     </View>
  //   );
  // } else
  return (
    <View style={{ flex: 1 }}>
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
        type="category"
        full={false}
        onSwipeComplete={onCategoryPressed}
        onBackDropPressed={onCategoryPressed}
        selectedCategory={selectedCategory}
        onPress={onCategoryChange}
      />

      <SwipeableModal
        modalVisible={tagModal}
        dataSource={tags}
        modalTitle="Tags"
        type="tag"
        full={false}
        onSwipeComplete={onTagPressed}
        selectedTag={selectedTag}
        onPress={onTagChange}
        selectedCategory={selectedTag}
        onBackDropPressed={onTagPressed}
      />

      <SingleMerchantPromo
        promotionModal={promotionModal}
        dataSource={promotion}
        onCarouselPressed={onCarouselPressed}
        onPromoPressedClose={onPromoPressedClose}
      />

      <View style={styles.promoTitleContainer}>
        <Text style={styles.pageTitle}>Promotions</Text>

        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={toggleBookmark}>
            <Image
              source={bookmark ? filledHeartIcon : emptyHeartIcon}
              style={styles.emptyHeartIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      {selectedCategory && (
        <View style={styles.categoryContainer}>
          <View style={styles.button} key={selectedCategory}>
            <Text style={styles.iconButton}>{selectedCategoryTitle}</Text>
            <TouchableOpacity onPress={() => onCategoryRemove(categoryType)}>
              <Icon name="close" size={16} color="#909090" />
            </TouchableOpacity>
          </View>
          {selectedTag && (
            <View style={styles.button} key={selectedTag}>
              <Text style={styles.iconButton}>{selectedTagTitle}</Text>
              <TouchableOpacity onPress={() => onCategoryRemove(tagType)}>
                <Icon name="close" size={16} color="#909090" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

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
            category={item.category}
          />
        )}
        keyExtractor={(item) => item.id}
        onRefresh={handleRefresh}
        refreshing={loading}
        ListFooterComponent={
          dataSource.length === 0 && !loading ? (
            <NotFoundFooter message="No promotion found" />
          ) : (
            <View style={{ paddingBottom: 40 }} />
          )
        }
        style={styles.flatList}
      />
    </View>
  );
};

export { PromoList };

{
  /* <View
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
      </View> */
}
