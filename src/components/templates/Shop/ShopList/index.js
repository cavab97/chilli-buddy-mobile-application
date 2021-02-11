import React from "react";
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

import { Card, CardSection } from "@components/molecules";

import { CategoryList } from "@components/organisms/CategoryList";

import FavouriteIcon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/FontAwesome";
import Label, { Orientation } from "react-native-label";

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
  if (picture.length === 0) cover = require("../../../../assets/images/404NotFound800x533.jpg");
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

        <TouchableOpacity style={profile}>
          {isPromote === true && <Image source={promotionTag} style={styles.promotionWrapper} />}
        </TouchableOpacity>
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
  props,
  isPromote,
  displayCategory,
  categories,
}) => {
  const filterIcon = require("../../../../assets/icons/filter.png");
  const emptyHeartIcon = require("../../../../assets/icons/emptyHeartRed.png");

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.shopContainer}>
      <View style={styles.shopTitleContainer}>
        <Text style={styles.pageTitle}>Shops</Text>

        <View style={styles.iconContainer}>
          <Image source={emptyHeartIcon} style={styles.emptyHeartIcon} />

          <ModalSelector
            data={state.selectedCategory.tags}
            keyExtractor={(item) => item}
            labelExtractor={(item) =>
              state.tags.filter((tag) => tag.id === item).map(({ title }) => title)[0]
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
        <CategoryList categories={categories} />
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
        refreshing={state.isRefreshing}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        //ListFooterComponent={renderFooter({ empty: state.data.length === 0 ? true : false })}
        style={styles.flatList}
        extraData={state}
      />
    </ScrollView>
  );
};

export { ShopList };
