import React from "react";
import styles from "./styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import {
  ActivityIndicator,
  FlatList,
  Image,
  ModalSelector,
  TouchableOpacity,
  View,
  Text,
} from "@components/atoms";

import { Card, CardSection } from "@components/molecules";

import Icon from "react-native-vector-icons/FontAwesome";

function Item({
  picture = [],
  onPress,
  onBookmarkPressed,
  gotBookmark,
  readBookmark,
  submitLoading,
  index,
  distance,
}) {
  const { image } = styles;

  let cover = "";
  if (picture.length === 0) cover = require("@assets/images/404NotFound800x533.jpg");
  else cover = { uri: picture[0] };
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={{ width: "98%" }}>
        <CardSection
          style={{
            borderBottomWidth: 0,
          }}
        >
          <Image style={image} resizeMode="cover" source={cover} />
        </CardSection>
        {readBookmark || submitLoading ? (
          // <ActivityIndicator style={styles.bookmark} />
          <TouchableOpacity style={styles.bookmark}>
            {gotBookmark[index] ? (
              <FontAwesome name="bookmark" size={40} color="#D60000" />
            ) : (
              <FontAwesome name="bookmark-o" size={40} color="#D60000" />
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.bookmark} onPress={onBookmarkPressed}>
            {gotBookmark[index] ? (
              <FontAwesome name="bookmark" size={40} color="#D60000" />
            ) : (
              <FontAwesome name="bookmark-o" size={40} color="#D60000" />
            )}
          </TouchableOpacity>
        )}
      </Card>
    </TouchableOpacity>
  );
}

const BookmarkList = ({
  loading,
  readBookmark,
  submitLoading,
  dataSource,
  categories,
  tags,
  selectedCategory,
  handleRefresh,
  renderFooter,
  onMerchantPressed,
  onCategoryChange,
  onTagChange,
  onBookmarkPressed,
  gotBookmark,
  bookmarkClick,
}) => {
  return (
    <View style={{ height: "100%" }}>
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
            onBookmarkPressed={() => onBookmarkPressed(item.promotion)}
            name={item.promotion.displayTitle}
            picture={item.promotion.coverPhotos}
            distance={item.distance}
            promoID={item.promotion.id}
            bookmarkID={item.bookmark}
            gotBookmark={gotBookmark}
            index={index}
            bookmarkClick={bookmarkClick}
            readBookmark={readBookmark}
            submitLoading={submitLoading}
          />
        )}
        keyExtractor={(item) => item.id}
        onRefresh={handleRefresh}
        refreshing={false}
        ListFooterComponent={renderFooter({ empty: dataSource.length === 0 ? true : false })}
        style={styles.flatList}
      />
    </View>
  );
};

export { BookmarkList };
