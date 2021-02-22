import React from "react";
import styles from "./styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
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
        <View style={styles.floatingDistanceIndicator}>
          <MaterialCommunityIcons name="map-marker-distance" color="white" size={20} />
          <Text style={styles.distanceIndicatorTitle}>
            {
              +(distance != undefined
                ? Math.round(distance + "e+2") + "e-2"
                : Math.round(calculatedDistance + "e+2") + "e-2")
            }
            KM Away
          </Text>
        </View>
        <TouchableOpacity style={styles.bookmark} onPress={onBookmarkPressed}>
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
        </TouchableOpacity>
      </Card>
    </TouchableOpacity>
  );
}

const BookmarkList = ({
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
  readLoading,
}) => {
  return (
    <View style={{ flex: 1 }}>
  
      {readLoading ? (
        <View />
      ) : (
        <FlatList
          data={dataSource}
          renderItem={({ item, index }) => (
            <Item
              onPress={() => onMerchantPressed(item)}
              onBookmarkPressed={() => onBookmarkPressed(item)}
              name={item.promotion.displayTitle}
              picture={item.promotion.coverPhotos}
              distance={item.distance}
              gotBookmark={item.isBookmark}
              index={index}
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
      )}
    </View>
  );
};

export { BookmarkList };
