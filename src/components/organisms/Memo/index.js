import React from "react";

import {
    Text, 
    View
} from "../../atoms";  

import {    
    Button 
} from "../../atoms";

import styles from "./styles";

const Memo = ({ title = null, messages = null, options = [] }) => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.textFontFamily}>{title}</Text>
            </View>

            <View>
                <Text style={styles.textFontFamily}>{messages}</Text>
            </View>
            <View style={styles.buttonContainer}>
                {options.map((option, index) => {
                    const { text, onPress } = option;
                    return (
                        <Button key={index} title={text} onPress={onPress} />
                    );
                })}
            </View>
        </View>
    );
};

export { Memo };
