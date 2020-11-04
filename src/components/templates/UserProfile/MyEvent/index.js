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

const RewardListItem = ({ item, onPress = () => {} }) => {
  const { obtained, rank, title, route } = item;
  const obtainedDate = obtained.at.format("DD MMM YYYY");

  let routeTitle = "route"
  if(route && route.title){
    routeTitle = route.title
  }

  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View style={styles.listSectionStyle}>
        <View style={styles.routeSectionStyle}>
          <Text style={styles.titleRouteStyle}>{routeTitle}</Text>
          <Text style={styles.dateRouteStyle}>{obtainedDate}</Text>
        </View>
        <View style={[styles.innerSectionStyle, styles.rankSectionStyle]}>
          <Text style={styles.titleColumnStyle}>RANK</Text>
          <Text style={styles.rankTextStyle}>{rank}</Text>
        </View>
        <View style={[styles.innerSectionStyle, styles.priceSectionStyle]}>
          <Text style={styles.titleColumnStyle}>PRIZE</Text>
          <Text style={styles.priceTextStyle}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

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
          <Rect x="0" y="4%" rx="4" ry="4" width="60%" height="16"/>
          <Rect x="0" y="56%" rx="4" ry="4" width="70%" height="18"/>
        </ContentLoader>
      </View>
      <View style={[styles.innerSectionStyle, styles.rankSectionStyle]}>
        <Text style={styles.titleColumnStyle}>RANK</Text>
        <ContentLoader
          speed={1}
          width={"100%"}
          height={30}
          backgroundColor= "#d9d9d9"
        >
          <Rect x="25%" y="20%" rx="4" ry="4" width="50%" height="20"/>
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


export class MyEvent extends Component {  
  getItem = (data, index) => {
    return {
      key: "eventRankingLoading" + index,
    }
  }

  render() {
    const { readLoading, dataSource, onPress = () => {} } = this.props;

    if(readLoading){
      return(
        <VirtualizedList
          data={DATA}
          renderItem={(data) => {
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

export default MyEvent;
