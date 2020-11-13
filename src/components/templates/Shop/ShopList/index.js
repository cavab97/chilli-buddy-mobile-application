import React from "react";
import styles from "./styles";

import { FlatList, Image, ModalSelector, Text, TouchableOpacity, View } from "@components/atoms";

import { Card, CardSection } from "@components/molecules";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/FontAwesome";
import Label, { Orientation } from "react-native-label";

function Item({
  name,
  shopID,
  logo,
  picture = [],
  address,
  subscribers,
  distance,
  endDate,
  index,
  onPress,
  onSubscribePress,
  subscribed,
  isPromote,
}) {
  const { image, title, detail, subscribe, profile } = styles;

  let cover = "";
  if (picture.length === 0) cover = require("../../../../assets/images/404NotFound800x533.jpg");
  else cover = { uri: picture[0] };

  let icon = "";
  if (logo.length === 0) icon = require("../../../../assets/logo.png");
  else icon = { uri: logo[0] };

  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={{ width: "98%" }}>
        {/* <Label
          orientation={Orientation.TOP_RIGHT}
          title="Promotion"
          color="#D60000"
          distance={70}
          extent={0}
          style={isPromote ? { fontSize: 13 } : { display: "none" }}
        > */}
        <CardSection
          style={{
            borderBottomWidth: 0,
          }}
        >
          <Image style={image} resizeMode="cover" source={cover} />
        </CardSection>
        <CardSection
          style={{
            paddingHorizontal: 15,
            borderBottomWidth: 0,
          }}
        >
          <Text style={title}>{name}</Text>
        </CardSection>
        <CardSection
          style={{
            paddingHorizontal: 15,
            borderBottomWidth: 0,
          }}
        >
          <MaterialCommunityIcons name="map-marker-distance" size={16} />
          <Text style={detail}>Just {+(Math.round(distance + "e+2") + "e-2")} Km away</Text>
        </CardSection>

        <CardSection
          style={{
            paddingHorizontal: 15,
            borderBottomWidth: 0,
            marginBottom: 10,
          }}
        >
          <Icon name="location-arrow" size={16} />
          <Text style={detail}>
            {address.line1} {address.line2}
          </Text>
        </CardSection>
        {/* <TouchableOpacity
            style={subscribe}
            onPress={() => onSubscribePress(subscribed, shopID, index)}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "bold"
              }}
            >
              {subscribed ? "Unsubscribe" : "Subscribe"}
            </Text>
          </TouchableOpacity> */}
        <TouchableOpacity style={profile}>
          <Image
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              backgroundColor: "#D60000",
            }}
            source={icon}
          />
          {isPromote === true && (
            <View style={styles.promotionTagView}>
              <Text style={styles.promotionTag}>Promotion</Text>
            </View>
          )}
        </TouchableOpacity>
        {/* </Label> */}
      </Card>
    </TouchableOpacity>
  );
}

const ShopList = ({
  handleRefresh,
  handleLoadMore,
  filterData,
  renderFooter,
  onMerchantPressed,
  onSubscribePressed,
  onCategoryChange,
  onTagChange,
  state,
  props,
  isPromote,
  displayCategory,
}) => {
  return (
    <View style={{ height: "100%" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginBottom: 8,
        }}
      >
        <ModalSelector
          onChange={onCategoryChange.bind(this)}
          data={state.categories}
          initValue="Select Categories"
          style={styles.categoriesButton}
          selectStyle={styles.categoriesSelect}
          selectTextStyle={styles.modalSelectTextStyle}
          optionTextStyle={styles.modalOptionTextStyle}
          keyExtractor={(item) => item.id}
          labelExtractor={(item) => item.title}
          selectedKey={displayCategory}
        />

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
          style={{
            justifyContent: "center",
            borderWidth: 1.2,
            marginRight: 5,
            marginTop: 11,
            backgroundColor: "#D60000",
            borderColor: "#D60000",
            borderRadius: 3,
          }}
        >
          <Icon name="filter" size={20} style={styles.tagsButton} />
        </ModalSelector>
      </View>

      <FlatList
        data={state.data}
        renderItem={({ item, index }) => (
          <Item
            onPress={() => onMerchantPressed(item)}
            onSubscribePress={onSubscribePressed}
            name={item.displayTitle}
            logo={item.logo}
            picture={item.images}
            address={item.address}
            subscribers={item.subscribers}
            subscribed={item.subscribed}
            distance={item.distance}
            shopID={item.id}
            index={index}
            isPromote={item.isPromote}
          />
        )}
        keyExtractor={(item) => item.id}
        onRefresh={handleRefresh}
        refreshing={state.isRefreshing}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter({ empty: state.data.length === 0 ? true : false })}
        style={styles.flatList}
        extraData={state}
      />
    </View>
  );
};

export { ShopList };
