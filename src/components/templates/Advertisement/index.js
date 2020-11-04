import React from "react";
import styles from "./styles";
import { Colors } from '../../../settings/styles/theme';

import {
    ScrollView,
    Text,
    View
} from "../../atoms";  

import {
    ImageSwiper
} from "../../organisms/ImageSwiper";
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from "moment";
import ContentLoader, { Rect } from 'react-content-loader/native'
import { Dimensions } from "react-native";

const Advertisement = ({
    dataSource,
    noImage,
    title1,
    title2,
    title3,
    readLoading
}) => {
    const advertisementImage = []
    const { height } = Dimensions.get("window");

    for(let i=0; i<dataSource[0].subImage.length; i++){
        if(dataSource[0].subImage[i] != ""){
            advertisementImage.push(dataSource[0].subImage[i])
        }
    }

    return (
        readLoading?
            <View>
                <ContentLoader 
                    speed={1}
                    height={height}
                    backgroundColor= "#d9d9d9"
                >   
                    <Rect x="0" y="0" rx="4" ry="4" width="100%" height="250" />
                    <Rect x="25" y="270" rx="4" ry="4" width="50%" height="30" /> 
                    <Rect x="25" y="320" rx="4" ry="4" width="85%" height="24" />
                    <Rect x="25" y="350" rx="4" ry="4" width="85%" height="24" />
                    <Rect x="25" y="380" rx="4" ry="4" width="85%" height="24" />
                    <Rect x="25" y="420" rx="4" ry="4" width="30%" height="18" />
                    <Rect x="25" y="450" rx="4" ry="4" width="30%" height="18" />
                     
                </ContentLoader>
            </View>
        :
            <ScrollView style={{flex: 1}} >
                <View style={styles.subContainer1}>
                    <ImageSwiper 
                        autoplay={true}
                        autoplayTime={7}
                        style={styles}
                        condition={advertisementImage.length > 0 }
                        noImageSlider={noImage}
                        slider={advertisementImage}
                    />
                </View>

                <View style={{flex: 1}}>
                    <View style={styles.subContainer2}>
                        <Text style={styles.title}>{dataSource[0].title}</Text>
                    </View>
                </View>

                <View style={[styles.subContainer2, {flexDirection: 'row',}]}>
                    <Icon name="calendar-check-o" size={25} color={Colors.PRIMARY} />
                    <Text style={styles.iconText}>
                        {title1}{moment(dataSource[0].startDate).format("D MMMM YYYY")}
                    </Text>
                </View>

                <View style={[styles.subContainer2, {flexDirection: 'row',}]}>
                    <Icon name="calendar-times-o" size={25} color={Colors.PRIMARY} />
                    <Text style={styles.iconText}>
                        {title2}{moment(dataSource[0].endDate).format("D MMMM YYYY")} 
                    </Text>
                </View>

                {dataSource[0].merchantDesc !== "" &&
                    <View style={styles.subContainer2}>
                        <Text style={styles.subTitle}>Merchant Description</Text>
                        <Text style={styles.subContent}>{dataSource[0].merchantDesc}</Text>
                    </View>
                } 

                {dataSource[0].description !== "" &&
                    <View style={styles.subContainer2}>
                        <Text style={styles.subTitle}>Description</Text>
                        <Text style={styles.subContent}>{dataSource[0].description}</Text>
                    </View>
                }   

                {dataSource[0].termAndCon !== "" &&
                <View style={styles.subContainer2}>
                    <Text style={styles.subTitle}>{title3}</Text>
                    <Text style={styles.subContent}>{dataSource[0].termAndCon}</Text>
                </View>
                }
        </ScrollView>
    );
};

export { Advertisement };