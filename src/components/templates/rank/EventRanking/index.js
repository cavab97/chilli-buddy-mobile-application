import React from "react";
import styles from "./styles";

import {
    FlatList,
    Icon,
    Text,
    TouchableOpacity,
    View
} from "../../../atoms";

import ContentLoader, { Rect } from 'react-content-loader/native'

import { Colors } from "../../../../settings/styles/theme";

const EventRanking = ({
   data,
   routeTitle,
   routeEndedTitle,
   eventTitle,
   luckyTitle,
   drawTitle,
   onEventPress,
   onRoutePress = () =>{},
   readLoading
})=> {            

    return(
        <View style={styles.container}>
            {readLoading?
                <View style={styles.loadingStyle}>
                    <ContentLoader
                        speed={1}
                        width={"100%"}
                        height={81}
                        backgroundColor= "#d9d9d9"
                    >
                        <Rect x="5%" y="30" rx="4" ry="4" width="20" height="20" />
                        <Rect x="15%" y="20" rx="4" ry="4" width="30%" height="16" />
                        <Rect x="75%" y="20" rx="4" ry="4" width="20%" height="16" />
                        <Rect x="15%" y="45" rx="4" ry="4" width="15%" height="16" />
                        <Rect x="75%" y="45" rx="4" ry="4" width="20%" height="16" />
                    </ContentLoader>
                    <View style={styles.line} />
                </View>
                    
            :
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => (
                        <View>
                            <TouchableOpacity 
                                onPress={()=> onRoutePress(item)}
                                style={styles.row}
                                key={item.key}
                            >
                                <Text style={styles.index}>
                                    {index + 1}
                                </Text>
                                <View style={styles.imageContainer}>
                                    {/* <ImageInfo
                                        banner={item.images[0]}
                                        imageContainer={styles.image}
                                        imageStyle={styles.imageFrame}
                                    /> */}
                                </View>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.title}>
                                        {item.title}
                                    </Text>
                                    <Text style={styles.textFontFamily}>
                                        {item.type}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styles.subtitle}>
                                        {routeEndedTitle}
                                    </Text>
                                    <Text style={styles.index}>
                                        {item.ended.at? item.ended.at.format("DD MMM YYYY"): item.endTime.format("DD MMM YYYY") }
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.line} />
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                    style={styles.flatListStyle}
                />
            }
                            

            
            <TouchableOpacity
                style={[
                styles.eventButtonStyle,
                styles.eventButtonPosition,
                {
                    backgroundColor: Colors.PRIMARY
                },
                ]}
            >
                <Icon
                    name="calendar-check-o"
                    type="font-awesome"
                    color={Colors.WHITE}
                    size={18}
                />
                <Text style={[styles.eventTextStyle, {color: Colors.WHITE},]}>
                    {eventTitle}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                styles.eventButtonStyle,
                styles.luckyButtonPosition,
                {
                    backgroundColor: Colors.WHITE
                },
                ]}
                onPress={onEventPress}
            >
                <Icon
                    name="calendar-check-o"
                    type="font-awesome"
                    color={Colors.GRAY_MEDIUM}
                    size={18}
                />
                <Text style={[styles.eventTextStyle, {color: Colors.GRAY_MEDIUM},]}>
                    {luckyTitle} {drawTitle}
                </Text>
            </TouchableOpacity>
            {/* <View style={styles.buttonContainer}> */}
               {/*  <IconButton
                    iconName="ios-calendar"
                    iconSize={25}
                    iconColor="white"
                    iconContainer={styles.iconActiveButtonContainer}
                    title={eventTitle}
                    titleStyle={styles.iconActiveText}
                /> */}
                {/* <IconButton
                    iconName="ios-calendar"
                    iconSize={25}
                    iconColor="#ccc"
                    iconContainer={styles.iconButtonContainer}
                    title={luckyTitle}
                    subtitle={drawTitle}
                    titleStyle={styles.iconText}
                    onPress={onEventPress}
                />
            </View> */}
        </View>
    );
};

export { EventRanking };