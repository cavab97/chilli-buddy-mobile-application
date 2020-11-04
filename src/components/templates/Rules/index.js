import React from "react";
import styles from "./styles";

import {
    ScrollView, 
    Text,
    View
} from "../../atoms";

const Rules = ({
    ruleTitle,
    rulesDescription,
    termsTitle,
    termsDescription
})=> {
    return(
        <ScrollView style={styles.container}>
            <Text style={styles.ruleTitle}>{ruleTitle}</Text>
            <Text>{rulesDescription}</Text>
            {termsTitle &&
                <View style={styles.termContainer}>
                    <Text style={styles.termTitle}>{termsTitle}</Text>
                    <Text>{termsDescription}</Text>
                </View>
            }
        </ScrollView>
    );
};

export { Rules };