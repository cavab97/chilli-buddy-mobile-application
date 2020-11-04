import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { PaymentMethod } from "@components/templates";

import styles from "./styles";

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {

    }

    componentWillUnmount(){

    }

    onPayByCash() {
        Actions.CameraReceipt({
            mission: this.props.mission,
            value: this.props.value,
            routeId: this.props.routeId
        });
    }

    render() {
        const { value } = this.props
        const { displayTitle } = this.props.mission.shop
        const { minSpend } = this.props.mission

        return (
            <PaymentMethod
                payingToTitle="Paying to"
                minimumSpendTitle="Min. Pay"
                yourAmountTitle="Your Amount"
                paymentMethodTitle="Payment Method"
                payByCashTitle="Pay and Upload Receipt"
                currency="RM"
                comingSoonTitle="Coming Soon"
                payByOnlineTitle="Pay By Online"
                payByEWalletTitle="Pay By E-Wallet"
                shopName={displayTitle}
                minimumSpend={minSpend}
                amountPaid={value}
                onPayByCash={this.onPayByCash.bind(this)}
            />
        );
    }
}

export default connect(null, { })(index);
