import React from "react";
import styles from "./styles";

import {
    Button,
    Text,
    View,
    ScrollView
} from "../../../atoms";

import {
    Card,
} from "../../../molecules";

const PaymentMethod = ({
    payingToTitle,
    minimumSpendTitle,
    yourAmountTitle,
    paymentMethodTitle,
    payByCashTitle,
    onPayByCash,
    shopName,
    minimumSpend,
    amountPaid,
    currency,
    comingSoonTitle,
    payByOnlineTitle,
    payByEWalletTitle,
})=> {
    return(
        <ScrollView>
            <View style={styles.container}>
                <Card style={styles.card}>
                    <View style={styles.mainContainer}>
                        <Text style={styles.textFontFamaily}>
                            {payingToTitle}
                        </Text>
                        <Text style={styles.value}>
                            {shopName}
                        </Text>
                    </View>
                    <View style={styles.line}/>
                    <View style={styles.row}>
                        <View>
                            <Text style={styles.textFontFamaily}>
                                {minimumSpendTitle}
                            </Text>
                            <Text style={styles.value}>
                                {currency}{minimumSpend.toFixed(2)}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.textFontFamaily}>
                                {yourAmountTitle}
                            </Text>
                            <Text style={styles.value}>
                                {amountPaid}
                            </Text>
                        </View>
                    </View>
                </Card>
                <View>
                    <Text style={styles.title}>
                        {paymentMethodTitle}
                    </Text>
                    <Button
                        title={payByCashTitle}
                        buttonStyle={styles.button}
                        titleStyle={styles.buttonText}
                        onPress={onPayByCash}
                    />
                    <Text style={[styles.title, {fontWeight: 'normal'}]}>
                        {comingSoonTitle}
                    </Text>
                    <Button
                        title={payByOnlineTitle}
                        buttonStyle={styles.buttonDisabled}
                        titleStyle={styles.buttonText}
                        disabled={true}
                    />
                    <Button
                        title={payByEWalletTitle}
                        buttonStyle={styles.buttonDisabled}
                        titleStyle={styles.buttonText}
                        disabled={true}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

export { PaymentMethod };