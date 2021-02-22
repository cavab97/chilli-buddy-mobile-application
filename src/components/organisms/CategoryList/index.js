import React from 'react';

import {
    FlatList, 
    Text,
    TouchableOpacity, 
    View,
    Image
} from "../../atoms";

import ContentLoader, { Rect } from 'react-content-loader/native'
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";

function Category ({
    id,
    title,
    onCategoryChange,
    selectedCategory
}) {
    let icon;

    let categoryTitle = title.split(" ");
    let arrangedCategoryTitle = '';

    if (categoryTitle.length > 0 ) {
        for(let i=0; i<categoryTitle.length; i++) {
            arrangedCategoryTitle += categoryTitle[i] + '\n';
        }
    }

    switch (title) {
        case "Chinese 中餐":
            icon = require("../../../assets/categories/chinese.png")
            break;
        case "Western 西餐":
            icon = require("../../../assets/categories/western.png")
            break;
        case "Cafe 咖啡馆":
            icon = require("../../../assets/categories/cafe.png")
            break;
        case "China 中国菜":
            icon = require("../../../assets/categories/china.png")
            break;
        case "Japanese 日本餐":
            icon = require("../../../assets/categories/japanese.png")
            break;
        case "Korean 韩国餐":
            icon = require("../../../assets/categories/korean.png")
            break;
        case "Thai 泰国餐":
            icon = require("../../../assets/categories/thai.png")
            break;
        case "Bistro 小酒馆":
            icon = require("../../../assets/categories/bistro.png")
            break;
        case "Steamboat 火锅":
            icon = require("../../../assets/categories/steamboat.png")
            break;
        case "Local Cuisine 本地美食":
            icon = require("../../../assets/categories/local.png")
            break;
        case "Beverage 饮料":
            icon = require("../../../assets/categories/beverage.png")
            break;
        case "Food Truck 餐车":
            icon = require("../../../assets/categories/foodTruck.png")
            break;
        case "Special Cuisine 特色美食":
            icon = require("../../../assets/categories/specialCuisine.png")
            break;
        default:
            icon = require("../../../assets/chilliBuddyCheckin/noMerchant.png")
            break;
      }

    return (
        <TouchableOpacity 
            style={selectedCategory === id ? styles.cardSelected : styles.card}
            onPress={() => onCategoryChange(id)}
        >
            <View style={styles.iconContainer}>
                <Image 
                    source={icon} 
                    style={styles.icon}
                />
            </View>
            <View >
                <Text 
                    style={selectedCategory === id ? styles.titleSelected : styles.title}
                    numberOfLines={3}
                >
                    {arrangedCategoryTitle}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const CategoryList = ({
    categories,
    onCategoryChange,
    selectedCategory
}) => {

    

    return(
        <FlatList
            data={categories}
            renderItem={({ item, index }) => (
                <Category
                    id={item.id}
                    title={item.title}
                    index={index}
                    onCategoryChange={onCategoryChange}
                    selectedCategory={selectedCategory}
                />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
        />
    );
};

export { CategoryList }; 