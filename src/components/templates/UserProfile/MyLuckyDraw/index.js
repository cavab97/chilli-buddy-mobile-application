import React, { Component } from "react";

import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  VirtualizedList
} from "../../../atoms";

import styles from "./styles";

import ContentLoader, { Rect } from 'react-content-loader/native';

const DATA = [];

const LoadingListItem = () => {
  return (
    <View style={styles.listSectionStyle}>
      <View style={styles.routeSectionStyle}>
        <ContentLoader
          speed={1}
          width={"100%"}
          height={40}
          backgroundColor= "#d9d9d9"
        >
          <Rect x="0" y="4%" rx="4" ry="4" width="40%" height="16"/>
          <Rect x="0" y="56%" rx="4" ry="4" width="50%" height="18"/>
        </ContentLoader>
      </View>
      <View style={[styles.innerSectionStyle, styles.priceSectionStyle]}>
        <Text style={styles.titleColumnStyle}>PRIZE</Text>
        <ContentLoader
          speed={1}
          width={"100%"}
          height={30}
          backgroundColor= "#d9d9d9"
        >
          <Rect x="15%" y="20%" rx="4" ry="4" width="80%" height="20"/>
        </ContentLoader>
      </View>
    </View>
  );
};

const RewardListItem = ({ item, onPress = () => {} }) => {
  const { obtained, title, event } = item;
  const obtainedDate = obtained.at.format("DD MMM YYYY");

  let eventTitle = "Lucky Draw"
  if(event && event.title){
    eventTitle = event.title
  }

return (
  <TouchableOpacity onPress={() => onPress(item)}>
      <View style={styles.listSectionStyle}>
        <View style={styles.routeSectionStyle}>
          <Text style={styles.titleRouteStyle}>{eventTitle}</Text>
          <Text style={styles.dateRouteStyle}>{obtainedDate}</Text>
        </View>
        <View style={[styles.innerSectionStyle, styles.priceSectionStyle]}>
          <Text style={styles.titleColumnStyle}>PRIZE</Text>
          <Text style={styles.priceTextStyle}>{title}</Text>
        </View>
      </View>
  </TouchableOpacity>
);
};

export class MyLuckyDraw extends Component {
  getItem = (data, index) => {
    return {
      key: "luckyDrawLoading" + index,
    }
  }

  render() {
    const { readLoading, dataSource, onPress = () => {} } = this.props;

    if(readLoading){
      return(
        <VirtualizedList
          data={DATA}
          renderItem={() => {
            return (
              <LoadingListItem />
            );
          }}
          initialNumToRender={1}
          keyExtractor={item => item.key}
          getItemCount={() => {return 1}}
          getItem={this.getItem.bind(this)}
        />
      );
    }else{
      return (
        <FlatList
          data={dataSource}
          renderItem={({ item }) => (
            <RewardListItem item={item} onPress={()=>onPress(item)} />
          )}
          keyExtractor={(item) => item.id}
        />
      );
    }
  }
}

export default MyLuckyDraw;
