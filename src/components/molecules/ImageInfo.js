import React from 'react';

import {
    Image,
    View,
    Text
} from "../atoms";

const ImageInfo = ({
    banner,
    imageContainer,
    imageStyle,
    title,
    subtitle,
    title2,
    subtitle2Part2,
    textStyle,
    textStyle2,
    subtitle2Part1,
    subtitle2Part3,
    onPress
}) => {
    if(banner && typeof banner !== "number"){
        banner = { uri: banner }
    }
    return (
        <View>
            <View style={imageContainer}>
                <Image
                    style= {imageStyle}
                    resizeMode={"contain"}
                    source={banner} 
                />
            </View>
            {title &&
                <View>
                    <Text style={textStyle}>
                        {title}{subtitle}
                    </Text>
                    <Text style={textStyle2}>
                        {title2}{subtitle2Part1} {subtitle2Part2}{subtitle2Part3}
                    </Text>
                </View>
            }
        </View>
    );
};

const styles = {

};

export { ImageInfo };