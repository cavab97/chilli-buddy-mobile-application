import React from "react";

import {
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
} from "../../atoms";  

import {
    Card,
} from "../../molecules";

const SmallCardList = ({
    title,
    dataSource,
    onPress,
    noImage,
    style
})=>{

    let arrangeDataSource = dataSource.sort((a, b) => {
        return new Date(b.createAt) - new Date(a.createAt);
    });

    const CardList = ({item, index}) =>{

        if(item.deleted_at === null){
            return(
                <TouchableOpacity onPress={()=>onPress(item.id)} >
                    <Card 
                        key={item.id}
                        style={ index === 0 ? style.firstNewsCardStyle : style.newsCardStyle }
                    >
                        {item.coverPic !== "" ? 
                            <Image source={{uri:item.coverPic}} style={style.newsImage} resizeMode = "cover" />
                        : 
                            <Image source={noImage} style={style.newsNoImage}/>
                        }
                        <Text numberOfLines={2} style={style.newsTitleTextStyle}>{item.title}</Text>
                    </Card>
                </TouchableOpacity>
            ); 
        }else{
            return null
        }
    }


    return(
        <View style={style.subContainer3}>
            <View>
                <Text style={style.sectionTitle}>{title}</Text>
            </View>
            <View>
                <FlatList 
                    horizontal
                    showsHorizontalScrollIndicator = {false}
                    data = {arrangeDataSource}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => <CardList item={item} index={index}/> }
                    scrollEnabled = { arrangeDataSource.length>1 ? true : false}
                /> 
            </View>
        </View>
    );
};
               
export { SmallCardList };