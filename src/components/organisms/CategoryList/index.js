import React from 'react';

import {
    FlatList, 
    Text,
    TouchableOpacity, 
    View,
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

function Category ({
    title
}) {


    return (
        <TouchableOpacity style={{ 
            width: '40%', 
            height: "100%" 
        }}>
            <Text>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const CategoryList = ({
    categories
}) => {

    return(
        <FlatList
            data={categories}
            renderItem={({ item, index }) => (
                <Category
                    title={item.title}
                    index={index}
                />
            )}
            horizontal={true}
            keyExtractor={(item) => item.id}
        />
    );
};

export { CategoryList }; 