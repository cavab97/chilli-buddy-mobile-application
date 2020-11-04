import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { Rules } from "@components/templates";

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

    render() {

        return (
            <Rules
                ruleTitle="Rules of The Game"
                rulesDescription={this.props.rules}
                termsTitle="Terms And Conditions"
                termsDescription={this.props.terms}
            />
        );
    }
}

export default connect(null, { })(index);
