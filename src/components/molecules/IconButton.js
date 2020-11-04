import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from "../atoms";

import Icon from "react-native-vector-icons/Ionicons";

const IconButton = ({
  title,
  subtitle,
  lineIconName,
  iconName,
  iconColor,
  iconSize,
  iconContainer,
  titleStyle,
  onPress,
  loading
}) => {

  return iconContainer ? (
    <TouchableOpacity onPress={onPress} style={iconContainer} disabled={loading}>
{/*       <View style={iconContainer}> */}
            {lineIconName && <Icon name={lineIconName} color={iconColor} size={iconSize}/>}
            {iconName && <Icon name={iconName} color={iconColor} size={iconSize} />}
            {title && <Text style={titleStyle}>{title}</Text>}
            {subtitle && <Text style={titleStyle}>{subtitle}</Text>}

{/*       </View> */}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={onPress}>
      <Icon name={iconName} color={iconColor} size={iconSize} />
      {title && <Text>{title}</Text>}
    </TouchableOpacity>
  );
};

const styles = {};

export { IconButton };
