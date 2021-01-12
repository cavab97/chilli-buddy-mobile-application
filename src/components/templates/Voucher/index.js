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

function Voucher({
  picture = [],
  onPress,
  onBookmarkPressed,
  gotBookmark,
  readBookmark,
  submitLoading,
  index,
  distance,
}) {
  const { image, card, columnOneText, columnOne, columnTwo } = styles;

  let cover = "";
  if (picture.length === 0) cover = require("@assets/images/404NotFound800x533.jpg");
  else cover = { uri: picture[0] };
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={{ width: "95%" }}>
        <CardSection style={card}>
            <View style={columnOne}>
                <Text style={columnOneText}>
                    Free Shipping
                </Text>
            </View>
            <View style={columnTwo}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                    RM 15 Min. Spend
                </Text>
                <Text>
                   Valid until 31/01/2021
                </Text>
            </View>
        </CardSection>
        {/* <View style={styles.floatingDistanceIndicator}>
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
        </TouchableOpacity> */}
      </Card>
    </TouchableOpacity>
  );
}

const VoucherList = ({
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
    <View style={{ height: "100%" }}>
      {readLoading ? (
        <View />
      ) : (
        <FlatList
          data={dataSource}
          renderItem={({ item, index }) => (
            <Voucher
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

export { VoucherList };
