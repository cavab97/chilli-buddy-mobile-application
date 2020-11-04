import React from "react";

import {
  Text,
  View
} from "../../atoms";

import styles from "./styles";

const InfoBox = ({ title = null, message = null, containerStyle ={}, titleStyle = {}, messageStyle = {} }) => {
  return (
    <View style={{...styles.container, ...containerStyle}}>
      {title && <Text style={{...styles.title, ...titleStyle}}>{title}</Text>}
      {message && <Text style={{...styles.subtitle, ...messageStyle}}>{message}</Text>}
    </View>
  );
};

export { InfoBox };
