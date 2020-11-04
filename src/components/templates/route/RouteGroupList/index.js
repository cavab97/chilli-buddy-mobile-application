import React from "react";

import {
  ScrollView,
  View,
  ImageBackground,
} from "../../../atoms";

import { Header } from "../../../molecules";
import { RouteList } from "../../../organisms/RouteList";

import styles from "./styles";

const RouteGroupList = ({
  title,
  subtitle,
  subtitle2,
  subtitle3,
  data,
  onRouteMapPress,
  onRankingPress,
  readLoading,
  backgroundImage,
}) => {
  return (
    <ImageBackground 
        source={backgroundImage} 
        style={{flex: 1}}
    >
      <ScrollView style={{backgroundColor:'rgba(255,255,255,0.8)'}}>
        <View>
          <Header
            title={title}
            subtitle={subtitle}
            iconName="md-trophy"
            iconColor="#f18a22"
            iconSize={18}
            onPress={onRankingPress}
          />
        </View>
        <View>
          <RouteList
            data={data}
            style={styles}
            subTitle1={subtitle2}
            subTitle2={subtitle3}
            onRouteMapPress={onRouteMapPress}
            readLoading={readLoading}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export { RouteGroupList };
