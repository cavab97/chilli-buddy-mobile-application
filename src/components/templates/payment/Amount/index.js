import React from "react";
import styles from "./styles";
import { Keyboard } from "react-native";

import {
    Button,
    KeyboardAvoidingView,
    Text,
    TextInputMask,
    TouchableWithoutFeedBack,
    View
} from "../../../atoms";

import {
    IconButton
} from "../../../molecules"

const PaymentAmount = ({
   payTitle,
   descriptionTitle,
   buttonTitle,
   currency,
   onChange,
   onUnlockPress,
   value,
   onNext,
   minimumSpend
})=> {
 
    return(
        <KeyboardAvoidingView style={styles.container}>
            <TouchableWithoutFeedBack 
                onPress={Keyboard.dismiss} 
                accessible={false}
            >
                <View style={styles.overlayContainer}>
                    <IconButton
                        onPress={onUnlockPress}
                        iconName="ios-close"
                        iconColor="white"
                        iconSize={48}
                        iconContainer={styles.closeButton}
                    />
                    <View style={styles.payContainer}>
                        <Text style={styles.payTitle}>
                            {payTitle}
                        </Text>
                    </View>
                    <Text style={styles.descriptionTitle}>
                        {descriptionTitle}
                        <Text style={styles.amount}>
                            {currency}{minimumSpend}
                        </Text>
                    </Text>
                    <View style={styles.inputContainer}>
                        <TextInputMask
                            type={'money'}
                            options={{
                                precision: 2,
                                separator: '.',
                                delimiter: ',',
                                unit: 'RM',
                                suffixUnit: ''
                            }}
                            value={value}
                            onChangeText={onChange}
                            style={styles.amountInput}
                        />
                        <Button
                            title={buttonTitle}
                            buttonStyle={styles.button}
                            titleStyle={styles.buttonText}
                            onPress={onNext}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedBack>
        </KeyboardAvoidingView>
    );
};

export { PaymentAmount };