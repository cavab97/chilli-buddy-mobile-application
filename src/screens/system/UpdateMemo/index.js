import React, { Component } from "react";
import { connect } from "react-redux";

import { openLink } from "../../../marslab-library-react-native/utils/common";

import { UpdateMemo } from "../../../components/templates";
import styles from "./styles";

class index extends Component {
    constructor(props) {
        super(props);
    }

    onUpdatePress = (storeUrl) => {
        openLink(storeUrl)
    }

    render() {
        const {
            updateNeeded,
            forceUpdate,
            android,
            ios,
            OS,
            appVersion
        } = this.props;
        let latestVersion = "0.0.0";
        let latestVersionDescription = null;
        let storeUrl = null;

        switch (OS) {
            case "ios":
                latestVersion = ios.latestVersion;
                latestVersionDescription = ios.latestVersionDescription;
                storeUrl = ios.appstoreUrl;
                break;
            case "android":
                latestVersion = android.latestVersion;
                latestVersionDescription = android.latestVersionDescription;
                storeUrl = android.playstoreUrl;
                break;
        }

        return (
            <UpdateMemo
                messages={latestVersionDescription}
                options={[
                    {
                        text: "UPDATE NOW",
                        onPress: () => this.onUpdatePress(storeUrl)
                    }
                ]}
            />
        );
    }
}

const mapStateToProps = state => {
    const {
        updateNeeded,
        forceUpdate,
        android,
        ios,
        OS,
        appVersion
    } = state.system;
    return { updateNeeded, forceUpdate, android, ios, OS, appVersion };
};

export default connect(mapStateToProps, {})(index);
