import React from 'react';
import {
    Text,
    View
} from "../atoms";

import FontAwesome from "react-native-vector-icons/FontAwesome";

const CardLabel = ({
    label,
    labelValue,
    labelValue2,
    labelValue3,
    iconName,
    iconColor,
    iconSize,
    containerStyle,
    iconStyle,
    textStyle
}) => {
    return (
        textStyle ?
        <View style={containerStyle}>
            <Text>
                {label}
            </Text>
            <Text style={textStyle}>
                {labelValue}{labelValue2}{labelValue3}
            </Text>    
        </View>
        : 
        <View style={containerStyle}>
            {iconName ? 
                <View style={iconStyle}>
                    <FontAwesome
                        name={iconName}
                        color={iconColor}
                        size={iconSize}
                    />
                </View>
            :
                null
            }
            {label &&
                <Text style={styles.textFontFamily}>
                    {label}{labelValue}
                </Text> 
            }   
        </View>
    );
};

const styles = {
    textFontFamily: {
        fontFamily: "RobotoRegular",
    }
};

export { CardLabel };