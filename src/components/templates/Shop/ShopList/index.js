import React from "react";
import { RefreshControl } from "react-native";
import styles from "./styles";

import {
  FlatList,
  Image,
  ModalSelector,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "@components/atoms";

import { NotFoundFooter, CardSection } from "@components/molecules";

import { CategoryList } from "@components/organisms/CategoryList";

import FavouriteIcon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function Item({
  name,
  shopID,
  logo,
  picture = [],
  address,
  category,
  distance,
  endDate,
  index,
  onPress,
  isPromote,
  onFavouritePress,
  isFavourite,
  item,
}) {
  const { image, title, detail, profile } = styles;
  let cover = "";
  if (picture.length === 0) cover = require("../../../../assets/images/404NotFound800x533.jpeg");
  else cover = { uri: picture[0] };

  let icon = "";
  if (logo.length === 0) icon = require("../../../../assets/logo.png");
  else icon = { uri: logo[0] };

  const distanceIcon = require("../../../../assets/icons/distance.png");
  const emptyHeartIcon = require("../../../../assets/icons/emptyHeart.png");
  const filledHeartIcon = require("../../../../assets/icons/filledHeart.png");
  const promotionTag = require("../../../../assets/chilliBuddy2.0Icon/chilliBuddyMainScreenIconV2/promotions.png");

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.cardContainer}>
        <CardSection style={styles.imageContainer}>
          <Image style={image} resizeMode="cover" source={cover} />
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
              {isFavourite ? (
                <Image source={filledHeartIcon} style={styles.favouriteIcon} />
              ) : (
                <Image source={emptyHeartIcon} style={styles.favouriteIcon} />
              )}
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

const ShopList = ({
  handleRefresh,
  handleLoadMore,
  filterData,
  renderFooter,
  onMerchantPressed,
  onFavouritePressed,
  onCategoryChange,
  onTagChange,
  state,
  shopData,
  selectedCategory,
  toggleFavourite,
  favourite,
  tags,
  loading,
  isPromote,
  displayCategory,
  readLoading,
  categories,
  returnSpecificCategory,
  scrollToItem,
  flatListRef,
  returnFlatlistMyRef,
}) => {
  const filterIcon = require("../../../../assets/icons/filter.png");
  const emptyHeartIcon = require("../../../../assets/icons/emptyHeartRed.png");
  const filledHeartIcon = require("../../../../assets/icons/filledHeart.png");

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.shopContainer}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={handleRefresh} />}
    >
      <View style={styles.shopTitleContainer}>
        <Text style={styles.pageTitle}>Shops</Text>

        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={toggleFavourite}>
            <Image
              source={favourite ? filledHeartIcon : emptyHeartIcon}
              style={styles.emptyHeartIcon}
            />
          </TouchableOpacity>

          <ModalSelector
            data={tags}
            keyExtractor={(item) => item.id}
            labelExtractor={(item) =>
              tags.filter((tag) => tag.id === item.id).map(({ title }) => title)[0]
            }
            onChange={onTagChange.bind(this)}
            selectStyle={styles.categoriesSelect}
            selectTextStyle={styles.modalSelectTextStyle}
            optionTextStyle={styles.modalOptionTextStyle}
          >
            <Image source={filterIcon} style={styles.filterIcon} />
          </ModalSelector>
        </View>
      </View>

      <View style={styles.categoryTitleContainer}>
        <Text style={styles.categoryTitle}>Category</Text>
      </View>

      <View style={{ paddingLeft: 15 }}>
        <CategoryList
          categories={categories}
          onCategoryChange={onCategoryChange}
          selectedCategory={selectedCategory}
          returnSpecificCategory={returnSpecificCategory}
          scrollToItem={scrollToItem}
          flatListRef={flatListRef}
          returnFlatlistMyRef={returnFlatlistMyRef}
        />
      </View>

      <FlatList
        data={shopData}
        renderItem={({ item, index }) => (
          <Item
            onPress={() => onMerchantPressed(item)}
            onFavouritePress={() => onFavouritePressed(item)}
            name={item.displayTitle}
            item={item}
            logo={item.logo}
            picture={item.images}
            address={item.address}
            category={item.category}
            distance={item.distance}
            shopID={item.id}
            index={index}
            isFavourite={item.isFavourite}
            isPromote={item.isPromote}
          />
        )}
        keyExtractor={(item) => item.id}
        onRefresh={handleRefresh}
        refreshing={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={shopData.length === 0 && <NotFoundFooter message="No shop found" />}
        style={styles.flatList}
        extraData={state}
      />
    </ScrollView>
  );
};

export { ShopList };
