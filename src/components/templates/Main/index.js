import React from "react";
import styles from "./styles";

import {
    FlatList,
    Image,
    ImageBackground,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    VirtualizedList
} from "../../atoms";  

import {
    Card,
    CardSection,
} from "../../molecules";

import { InfoBox } from "@components/organisms/InfoBox";

import {
    SmallCardList,
} from "../../organisms/SmallCardList";

import {
    ImageSwiper
} from "../../organisms/ImageSwiper";

import moment from "moment";
import ContentLoader, { Rect } from 'react-content-loader/native'
import FontAwesome from "react-native-vector-icons/FontAwesome";


export default({
    readFail,
    slider,
    dataSource,
    dataSource2,
    casualImage,
    luxuryImage,
    sectionTitle1,
    sectionTitle2,
    sectionTitle3,
    label1,
    label2,
    unit,
    onPressCard,
    advertisements,
    onPressAdvertisement,
    noImageAdvertisement,
    noImageHeaderSlider,
    readLoadingAdvertisement,
    readLoadingRoute,
    readLoadingRouteTicket,
    readLoadingHeaderImages,
})=> {
    const DATA = []
    const DATA2 = []; 

    const getItem = (data, index) => {
        return {
            key: "routeTicketsOrRoutesLoading" + index
        }
    }

    const getItem2 = (data, index) => {
        return {
            key: "advertisementLoading" + index
        }
    }

    const CardListLoading = ({index}) => {
        return(
            <Card 
                key={"cardLoading" + index} 
                style={ index === 0 ? styles.firstCardStyle : styles.cardStyle}
            >
                <ContentLoader 
                    speed={1}
                    width={400}
                    height={130}
                    backgroundColor= "#d9d9d9"
                >   
                    <Rect x="0" y="0" rx="19" ry="19" width="332" height="130" /> 
                    
                </ContentLoader>
            </Card>
        );
    }

    const LatestNewsLoading = ({index}) =>{
        return (
            <Card
                key = {"advertisementCardLoading" + index}
                style={ index === 0 ? styles.firstNewsCardStyle :  styles.newsCardStyle }
            > 
                <ContentLoader 
                    speed={1}
                    width={400}
                    height={170}
                    backgroundColor= "#d9d9d9"
                >   
                    <Rect x="0" y="0" rx="9" ry="9" width="180" height="110" /> 
                    <Rect x="10" y="120" rx="4" ry="4" width="160" height="20" /> 
                </ContentLoader>
            </Card>
        );
    }

    const JoinNowList = ({index, data}) => {
        return (
            <TouchableOpacity onPress={()=>onPressCard(data.id)} >
                <Card 
                    key={data.id} 
                    style={ index === 0 ? styles.firstCardStyle : styles.cardStyle}
                >
                    <CardSection  style={styles.cardSection}>
                        <Image source={data.type === "Casual" ? casualImage : luxuryImage} style={styles.imageMap} />
                        <View style = {styles.textHolderStyle}>
                            {data.joined == 1 &&
                                <View style={styles.iconStyle}>
                                    <FontAwesome
                                        name='circle'
                                        color='#65FF03'
                                        size={10}
                                    />
                                </View>
                            }
                            <Text style={[styles.cardTitle, {marginBottom: 0}]}>{data.title}</Text>
                            <Text style={styles.cardTitle}>({data.type})</Text>
                            <Text style={styles.cardContent}>{label1}{data.totalMission}</Text>
                            <Text style={styles.cardContent}>{label2}</Text>
                            <Text style={styles.cardContent}>{moment(data.startTime).format("D MMM YYYY")} - {moment(data.endTime).format("D MMM YYYY")}</Text>
                        </View>
                    </CardSection>
                </Card>
            </TouchableOpacity>
        );
    }

    const ChallengesCardList = ({index, data}) => {
        return (
            <TouchableOpacity onPress={()=>onPressCard(data.id)} >
                <Card 
                    key = {data.id} 
                    style={ index === 0 ? styles.firstCardStyle : styles.cardStyle}
                >
                    <CardSection  style={styles.cardSection2}>
                        <ImageBackground
                            source={data.image}
                            imageStyle={styles.imageMap2} 
                            style={styles.imageBackgroundStyle}
                        >
                        <View style = {styles.textHolderStyle2}>
                            <Text style={styles.cardTitle2}>{data.title}</Text>
                            <Text style={styles.routeType}>{data.type}</Text>
                        </View>
                        </ImageBackground>
                        <Text style={styles.bottomTextStyle} >· · · {sectionTitle3} · · ·</Text>
                    </CardSection>
                </Card>
            </TouchableOpacity>
        );
    }
    
    return(
        <ScrollView contentContainerStyle={{flexGrow:1}}>
            <View style={styles.container}>
                {readFail && 
                    <InfoBox
                        title="Memo"
                        message={`Your network connection are not healthy`}
                        titleStyle={styles.infoTitle}
                        messageStyle={styles.infoSubtitle}
                        containerStyle={styles.infoContainer}
                    />
                }
                <View style={styles.subContainer1}>
                    {readLoadingHeaderImages ?
                        <ContentLoader 
                            speed={1}
                            height={250}
                            backgroundColor= "#d9d9d9"
                        >   
                            <Rect x="0" y="0" rx="4" ry="4" width="100%" height="280" /> 
                        </ContentLoader>
                    :
                        <ImageSwiper 
                            style={styles}
                            slider={slider}
                            autoplayTime={5}
                            autoplay={true}
                            noImageSlider={noImageHeaderSlider}
                            condition={slider.length > 0}
                        />
                    }
                </View>

                {readLoadingRoute ? 
                    <View style={styles.subContainer2}>
                        <View>
                            <Text style={styles.sectionTitle}>{sectionTitle1}</Text>
                        </View>
                        <VirtualizedList 
                            horizontal
                            showsHorizontalScrollIndicator = {false}
                            data={DATA}
                            renderItem={({index}) => <CardListLoading index={index}/>}
                            keyExtractor={item => item.key}
                            getItemCount={() => {return 3}}
                            getItem={getItem}
                        />
                    </View>
                :
                    dataSource2.length != 0 ?
                        <View style={styles.subContainer2}>
                            <View>
                                <Text style={styles.sectionTitle}>{sectionTitle1}</Text>
                            </View>
                            <FlatList 
                                horizontal
                                showsHorizontalScrollIndicator = {false}
                                data = {dataSource2}
                                keyExtractor={item => item.id}
                                renderItem={({ item, index }) => <JoinNowList data={item} index={index}/> }
                                scrollEnabled = { dataSource2.length>1 ? true : false}
                            />
                        </View>
                    :
                        <View style={styles.subContainer2}></View>
                }

                {readLoadingRouteTicket ? 
                    null
                :
                    dataSource.length != 0 ?
                        <View style={styles.subContainer4}>
                            <FlatList 
                                horizontal
                                showsHorizontalScrollIndicator = {false}
                                data = {dataSource}
                                keyExtractor={item => item.id}
                                renderItem={({ item, index }) => <ChallengesCardList data={item} index={index}/> }
                                scrollEnabled = { dataSource.length>1 ? true : false}
                            />
                        </View>
                    :
                        <View style={styles.subContainer4}></View>
                }

                
                {readLoadingAdvertisement?
                    <View style={styles.subContainer3}>
                        <View>
                            <Text style={styles.sectionTitle}>{sectionTitle2}</Text>
                        </View>
                        <VirtualizedList 
                            horizontal
                            showsHorizontalScrollIndicator = {false}
                            data={DATA2}
                            renderItem={({index}) => <LatestNewsLoading index={index}/>}
                            keyExtractor={item => item.key}
                            getItemCount={() => {return 3}}
                            getItem={getItem2}
                        />
                    </View>
                :
                    advertisements.length==0? 
                        <View style={styles.subContainer3}></View>
                    :
                        <SmallCardList 
                            title = {sectionTitle2}
                            dataSource = {advertisements}
                            onPress = {onPressAdvertisement}
                            noImage = {noImageAdvertisement}
                            readLoading = {readLoadingAdvertisement}
                            style={styles}
                        />
                }
            </View>
        </ScrollView>
    );
};