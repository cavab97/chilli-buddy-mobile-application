import React from "react";

import {
  Icon,
  Text,
  TouchableOpacity,
  View
} from "../../atoms";

import {
  ImageInfo
} from "../../molecules";

import { Nav, Tab } from "../../../components/molecules";

import styles from "./styles";

import { Colors } from "@settings/styles/theme/index";
import Notification from "./Notification";
import MyRanking from "./MyRanking";
import MyAccount from "./MyAccount";

const UserProfile = ({
  user,
  photo,
  logOutLoading,
  onEventPress,
  onHelpPress,
  onEditProfilePress,
  onSettingsPress,
  isRefreshing,
  refreshHandler,
  onTabChange,
  page,
  notificationDataSource,
  onNotificationPress,
  rewardDataSource,
  onRewardPress,
  onSignoutPress,
  readLoadingNotification,
  readLoadingReward,
}) => {
  const { displayName, email, phoneNumber, photoURL } = user;
  return (
    <View style={styles.scroll}>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <ImageInfo
            banner={photoURL ? photoURL : require('../../../assets/DefaultAvatar.jpg')}
            imageContainer={styles.profileImageStyle}
            imageStyle={styles.image}
          />
        </View>
        <View>
          {!displayName && 
            <View>
              <TouchableOpacity
                style={styles.editProfileTextContainer}
                onPress={() => onEditProfilePress()}
              >
                <Text style={styles.editProfileText}>UPDATE PROFILE NOW</Text>
              </TouchableOpacity>
            </View>}
          
            {displayName && <View style={styles.textContainer1}>
              <Text style={styles.userTitle}>{displayName}</Text>
              <Icon
                size={10}
                iconStyle={[styles.userInfomationIcon, { borderWidth: 0 }]}
                containerStyle={{ justifyContent: "center" }}
                // name={isUserVerified ? "verified" : "unverified"}
                name={"verified"}
                type="octicon"
                color={styles.userInfomationIcon.borderColor}
              />

              <TouchableOpacity 
                onPress={() => onEditProfilePress()}
                style={styles.pencilIconTouchableOpacityStyle}
              >
                <Icon
                  size={25}
                  iconStyle={[styles.userEditIcon, { borderWidth: 0,  }]}
                  containerStyle={{ justifyContent: "center" }}
                  // name={isUserVerified ? "verified" : "unverified"}
                  name={"mode-edit"}
                  type="materialicons"
                  color={styles.userEditIcon.borderColor}
                />
              </TouchableOpacity>
            </View>
          }

          <View style={styles.textContainer2}>
            <Text style={styles.userDesc}>{phoneNumber}</Text>
          </View>

          <View style={styles.textContainer3}>
            <Text style={styles.userDesc}>{email}</Text>
          </View>
        </View>

        <View style={styles.multitabContainer}>
          <Nav
            selected={page}
            onTabChange={onTabChange}
            activeColor={Colors.PRIMARY}
            unActiveColor={Colors.GRAY}
            fontSize={13}
            iconSize={22}
          >
            <Tab
              name="notification"
              label="NOTIFICATION"
              fontStyle={styles.navFontStyle}
              style={styles.tabStyle}
            />
            <Tab
              name="user"
              label="MY ACCOUNT"
              fontStyle={styles.navFontStyle}
              style={styles.tabStyle}
            />
            <Tab
              name="ranking"
              label="MY RANKING"
              fontStyle={styles.navFontStyle}
              style={styles.tabStyle}
            />
          </Nav>
        </View>
      </View>
      <View
        style={{
          flexGrow: 1,
          justifyContent: "flex-end",
        }}
      >
        {page === 0 ? (
          <Notification
            dataSource={notificationDataSource}
            onPress={onNotificationPress}
            readLoading={readLoadingNotification}
          />
        ) : page === 1 ? (
          <MyAccount onPress={onRewardPress} onSignoutPress={onSignoutPress} logOutLoading={logOutLoading} />
        ) : (
          <MyRanking 
            dataSource={rewardDataSource} 
            onPress={onRewardPress}
            readLoadingReward={readLoadingReward}
           />
        )}
      </View>
    </View>
  );
};

export { UserProfile };
