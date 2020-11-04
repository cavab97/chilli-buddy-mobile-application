import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { Alert } from "react-native";
import { PaymentAmount } from "@components/templates";

import styles from "./styles";

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: true,
            value: '',
        };
    }

    componentDidMount() {

    }

    componentWillUnmount(){

    }

    onChangeValue = (text) => {
        this.setState({
            value: text,
        });
    }

    onUnlockPress = () => {
        Actions.pop();
    }

    onNext() {
        let amount = this.state.value.replace("RM", "")
        amount = amount.replace(",", "")

        if (parseFloat(amount) >= parseFloat(this.props.mission.minSpend)){
            Actions.PaymentDetail({
                mission: this.props.mission,
                value: this.state.value,
                routeId: this.props.routeId
            });
        } else {
            Alert.alert(
                "GoGoGain",
                "Your amount spend should be more than minimum spend",
                [
                    { text: "OK" }
                ],
                { 
                    cancelable: true 
                }
            );
            this.setState({
                value: ''
            })
        }
    }

    onClose() {
        Actions.pop();
    }

    render() {
        const { minSpend } = this.props.mission;

        return (
            <PaymentAmount
                payTitle="Pay"
                descriptionTitle="Mission can't be completed if the amount less than "
                buttonTitle="Next"
                currency="RM"
                value={this.state.value}
                minimumSpend={minSpend}
                onChange={this.onChangeValue.bind(this)}
                onNext={this.onNext.bind(this)}
                onUnlockPress={this.onUnlockPress.bind(this)}
            />
        );
    }
}


export default connect(null, { })(index);
