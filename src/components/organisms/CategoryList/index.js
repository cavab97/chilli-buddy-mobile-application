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
                <Text style={selectedCategory === id ? styles.titleSelected : styles.title}>
                    {title}
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