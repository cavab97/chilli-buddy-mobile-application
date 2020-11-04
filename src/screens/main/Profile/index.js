import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { logout } from "../../../marslab-library-react-native/redux/auth/actions";
import {
    listenFromDatabase as notificationListener,
    removeListenerFromDatabase as removeNotificationListener,
} from "../../../marslab-library-react-native/redux/notification/action";

import {
    listenToOwnRewards as ownRewardsListener,
    removeListenerFromOwnRewards as removeOwnRewardsListener,
} from "@redux/reward/action";

import onLogOut from "../../../marslab-library-react-native/routes/onLogOut";

import { UserProfile } from "@components/templates";
import { notificationHandler } from "@settings/notification";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            page: 1,
            logOutLoading: false,
        };

        this._onTabChange = this._onTabChange.bind(this);
    }

    componentDidMount() {
        this.props.notificationListener();
        this.props.ownRewardsListener();
    }

    componentWillUnmount() {
        this.props.removeNotificationListener();
        this.props.removeOwnRewardsListener();
    }

    onSignoutPress = () => {
        console.log("logout");
        
        this.setState({logOutLoading: true});
        onLogOut().then(() => {
            this.props.logout();
        });
    };

    componentWillUnmount() {
        this.props.removeNotificationListener();
        this.props.removeOwnRewardsListener();
    }

    onNotificationPress(notification) {
        notification = { origin: "selected", ...notification };
        notificationHandler(notification);
    }

    onRewardPress(reward) {
        const rewardId = reward.id;
        Actions.RedeemPage({ rewardId });
    }

    onHelpPress() {
        //Actions.Help();
    }

    onEditProfilePress() {
        Actions.EditProfile();
    }

    onSettingsPress() {
        Actions.Settings();
    }

    handleRefresh() {}

    _onTabChange(tabIndex) {
        this.setState({ page: tabIndex });
    }

    render() {
        let {
            user,
            notifications,
            ownRewards,
            photo,
            readLoadingNotification,
            readLoadingReward,
        } = this.props;

        return (
            <UserProfile
                user={user}
                photo={photo}
                logOutLoading={this.state.logOutLoading}
                //onEventPress={this.onEventPress.bind(this)}
                onHelpPress={this.onHelpPress.bind(this)}
                onEditProfilePress={this.onEditProfilePress.bind(this)}
                onSettingsPress={this.onSettingsPress.bind(this)}
                isRefreshing={this.state.isRefreshing}
                refreshHandler={this.handleRefresh.bind(this)}
                onTabChange={this._onTabChange}
                page={this.state.page}
                notificationDataSource={notifications}
                onNotificationPress={this.onNotificationPress.bind(this)}
                readLoadingNotification={readLoadingNotification}
                rewardDataSource={ownRewards}
                onRewardPress={this.onRewardPress.bind(this)}
                onSignoutPress={this.onSignoutPress.bind(this)}
                readLoadingReward={readLoadingReward}
            />
        );
    }
}

const mapStateToProps = (state) => {
    const user = state.Auth.user;

    const photo = state.User.user.photoURL;
    const notifications = state.Notification.notifications;
    const ownRewards = state.Reward.ownRewards;

    const readLoadingNotification = state.Notification.readLoading;
    const readLoadingReward = state.Reward.readOwnRewardsLoading;

    return {
        user,
        notifications,
        photo,
        ownRewards,
        readLoadingNotification,
        readLoadingReward,
    };
};

export default connect(mapStateToProps, {
    logout,
    notificationListener,
    removeNotificationListener,
    ownRewardsListener,
    removeOwnRewardsListener,
})(Profile);
