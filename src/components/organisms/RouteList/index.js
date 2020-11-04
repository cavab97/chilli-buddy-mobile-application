import React from 'react';

import {
    FlatList, 
    Text,
    TouchableOpacity, 
    View
} from "../../atoms";
  
import {
    Card,
    CardLabel, 
    CardSection,
    IconButton, 
} from '../../molecules';

import ContentLoader, { Rect } from 'react-content-loader/native'
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";

const RouteList = ({
    data,
    style,
    subTitle1,
    subTitle2,
    onRouteMapPress,
    readLoading
}) => {
    if(readLoading){
        return(
            <View style={style.container}>
                <Card style={style.card}>
                    <View style={style.rowOne}>
                        <ContentLoader
                            speed={1}
                            width={"100%"}
                            height={40}
                            backgroundColor= "#bfbfbf"
                        >
                            <Rect x="0%" y="8" rx="4" ry="4" width="80%" height="24" />
                        </ContentLoader>
                    </View>
                    <View style={style.line}/>
                    <View style={style.rowTwo}>
                        <ContentLoader
                            speed={1}
                            width={"100%"}
                            height={30}
                            backgroundColor= "#bfbfbf"
                        >
                            <Rect x="0%" y="8" rx="4" ry="4" width="100" height="16" />
                            
                        </ContentLoader>
                    </View>
                </Card>
            </View>
        );
    } 
    else
        return data[0] === undefined ? (
            Platform.OS === "ios" ? (
              <Card style={{ backgroundColor: "transparent", elevation: 0 }}>
                <CardSection style={[styles.emptySection, { elevation: 0 }]}>
                  <Icon name="inbox" size={64} style={styles.emptyIcon} />
                </CardSection>
              </Card>
            ) : (
              <Card style={{ backgroundColor: "transparent", elevation: 0 }}>
                <CardSection style={[styles.emptySection, { elevation: 0 }]}>
                  <Icon name="inbox" size={64} style={styles.emptyIcon} />
                </CardSection>
              </Card>
            )
        ) : (  
            <FlatList
                data={data}
                renderItem={({ item }) =>
                    <TouchableOpacity
                        onPress={() => onRouteMapPress(item)}
                    >
                        <View style={style.container}>
                            <Card style={style.card}>
                                <View style={style.rowOne}>
                                    <Text style={style.areaName}>
                                        {item.title}
                                    </Text>
                                    <IconButton
                                        iconName='md-arrow-forward'
                                        iconColor='#f18a22'
                                        iconSize={26}
                                    />
                                </View>
                                <View style={style.line}/>
                                <View style={style.rowTwo}>
                                    <CardLabel
                                        containerStyle={style.subContainer}
                                        iconStyle={style.icon}
                                        iconName='circle'
                                        iconColor='#65FF03'
                                        iconSize={8}
                                        label={subTitle1}
                                        labelValue={item.ongoingRoutes}
                                    />
                                    <CardLabel
                                        containerStyle={style.subContainer}
                                        iconStyle={style.icon}
                                        iconName='circle'
                                        iconColor='#ff9900'
                                        iconSize={8}
                                        label={subTitle2}
                                        labelValue={item.pendingRoutes}
                                    />
                                </View>
                            </Card>
                        </View>
                    </TouchableOpacity>
                }
                keyExtractor={item => item.id}
            />
    );
};

export { RouteList }; 