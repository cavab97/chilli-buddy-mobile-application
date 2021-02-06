import React from 'react';

import {
    FlatList, 
    Text,
    TouchableOpacity, 
    View,
} from "../../atoms";

import ContentLoader, { Rect } from 'react-content-loader/native'
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";

function Category ({
    title
}) {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#ecf0f1',
            padding: 8,
            alignItems:"center"
          }}>
            <TouchableOpacity style={{
                height: 150,
                width: 100,
                borderRadius: 30,
                backgroundColor:"white",
                elevation:10,
                padding:10
            }}>
                <View
                    style={{
                        height: 80,
                        width: 80,
                        borderRadius: 30,
                        backgroundColor:"black",
                        elevation:10,
                        padding:15
                    }}
                >
                    <Text style={{marginTop: 150}}>
                        {title}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
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
            horizontal
            keyExtractor={(item) => item.id}
        />
    );
};

export { CategoryList }; 