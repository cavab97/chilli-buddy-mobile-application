import React, { Component } from "react";
import { connect } from "react-redux";

import { Splash } from "../../../components/templates/system/Splash";
import styles from "./styles";

class index extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Splash
                source={require("../../../assets/images/splash.png")}
            />
        );
    }
}

const mapStateToProps = state => {
    return {};
};

export default connect(mapStateToProps, {})(index);
