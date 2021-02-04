import React from "react";
import styles from "./styles";
import { Text, Overlay, View, Image, ScrollView, ActivityIndicator } from "../../../atoms";
import { TouchableHighlight, TouchableOpacity, TouchableNativeFeedback } from "react-native";
import ContentLoader, { Rect } from "react-content-loader/native";
import { Dimensions, Platform } from "react-native";

import { Colors, Mixins, Typography } from "../../../../settings/styles/theme";
import Icon from "react-native-vector-icons/Ionicons";

import { StyleSheet, Button } from "react-native";
const { height } = Dimensions.get("window");

const CheckInModal = ({
  Header,
  errorMessage,
  isVisible,
  errorStatus,
  errorSubmit,
  onClose,
  happy,
  happyDesciption,
  message,
  rewardOnceThanOneOption,
  onPressCancel,
  timeUps,
  readLoading,
  onPressRedeemNow,
  submitLoading,
  checkInRecordLengths,
  redeemed,
}) => {
  // try {
  //   console.log(message.merchant[0]);
  // } catch (error) {
  //   console.log(error);
  // }

  if (submitLoading) {
    return (
      <Overlay
        isVisible={isVisible}
        width="60%"
        height="50%"
        overlayBackgroundColor={"white"}
        overlayStyle={styles.containerOverlay2}
        onBackdropPress={onClose}
        backdropOpacity={0.3}
      >
        <View style={styles.contentContainer2}>
          {/* <View style={styles.closeIcon2}>
            <TouchableOpacity onPress={onClose}>
              <Image
                source={require("../../../../assets/chilliBuddyCheckin/closeButton.png")}
                style={styles.redeemImageCrossStyle}
              />
            </TouchableOpacity>
          </View> */}

          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="black" style={styles.redeemImageCrossStyle} />

            <View style={styles.desciptionBox2}>
              <Text style={styles.emojiText2}>Loading Submiting</Text>
              {/* <Text style={styles.subjectText2}>{happyDesciption}</Text> */}
            </View>
          </View>
        </View>
      </Overlay>
    );
  } else {
    return (
      <Overlay
        isVisible={isVisible}
        width="65%"
        height={
          Platform.isPad
            ? "65%"
            : !timeUps
            ? checkInRecordLengths == 28
              ? "60%"
              : "70%"
            : Platform.OS === "ios"
            ? "50%"
            : "60%"
        }
        overlayBackgroundColor={"white"}
        overlayStyle={styles.containerOverlay}
        onBackdropPress={onClose}
      >
        <View
          // position="absolute"
          bottom={Platform.OS === "ios" ? 30 : 25}
          left={Platform.isPad ? 230 : Platform.OS === "ios" ? 120 : 115}
          resizeMode="contain"
          fontSize={10}
          shadowColor="#000"
          shadowOpacity={0.22}
          shadowRadius={2.22}
          // zIndex={1}
          style={styles.closeIcon}
          // elevation={5}
        >
          <TouchableOpacity onPress={onClose} activeOpacity={1}>
            <Image
              source={require("../../../../assets/chilliBuddyCheckin/closeButton.png")}
              style={styles.redeemImageCrossStyle}
            />
          </TouchableOpacity>
        </View>

        <Image
          source={require("../../../../assets/chilliBuddyCheckin/chilliHappyFace.png")}
          style={styles.redeemImageChilliStyle}
        />

        <View style={styles.desciptionBox}>
          <Text style={styles.emojiText}>{Header}</Text>
          <Text style={styles.subjectText}>{happyDesciption}</Text>
          <Text style={styles.voucherValue}>{message == null ? 0 : message.amount}</Text>
          <Text style={styles.restaurantText}>
            {/* {message == null
                  ? "hello "
                  : typeof message.merchant[0].businessName == null
                  ? " "
                  : typeof message.merchant[0].businessName} */}
            {/* {message == null
                  ? " "
                  : message.merchant[0] == null
                  ? " "
                  : message.merchant[0].businessName} */}
            {message == null ? " " : message.merchant[0].businessName} Voucher!
          </Text>
        </View>
        {!timeUps ? (
          rewardOnceThanOneOption != true ? (
            <TouchableOpacity style={styles.redeemNowBox} onPress={onPressRedeemNow}>
              <Text style={styles.redeemNowText}>Redeem</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.doubleOption}>
              <TouchableOpacity style={styles.redeemNowBox} onPress={onPressRedeemNow}>
                <Text style={styles.redeemNowText}>Redeem Now</Text>
              </TouchableOpacity>
              <Text style={styles.Or}>Or</Text>
              <TouchableOpacity style={styles.redeemNowBoxSecond} onPress={onPressCancel}>
                <Text style={styles.redeemNowText}>Keep Going </Text>
              </TouchableOpacity>
              <View style={styles.bottomTextBox}>
                <Text style={styles.bottomText}>
                  stand a chance to win an even bigger prize at the end of the month.
                </Text>
              </View>
            </View>
          )
        ) : (
          <View />
        )}

        {/* <Text style={styles.messageText}>{"errorMessage"}</Text> */}

        {/* <TouchableOpacity style={styles.submitContainer}>
            <Text style={styles.text}>{"Back"}</Text>
          </TouchableOpacity> */}
      </Overlay>
    );
  }
};

const CheckInModalError = ({
  Header,
  errorMessage,
  isVisible,
  errorStatus,
  errorSubmit,
  onClose,
  happy,
  happyDesciption,
  message,
  rewardOnceThanOneOption,
  readLoading,
  submitLoading,
}) => {
  if (submitLoading) {
    return (
      <Overlay
        isVisible={isVisible}
        width="60%"
        height={Platform.isPad ? "60%" : "50%"}
        overlayBackgroundColor={"white"}
        overlayStyle={styles.containerOverlay2}
        onBackdropPress={onClose}
      >
        {/* <View style={styles.closeIcon2}>
            <TouchableOpacity onPress={onClose}>
              <Image
                source={require("../../../../assets/chilliBuddyCheckin/closeButton.png")}
                style={styles.redeemImageCrossStyle}
              />
            </TouchableOpacity>
          </View> */}

        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color="black" style={styles.redeemImageCrossStyle} />

          <View style={styles.desciptionBox2}>
            <Text style={styles.subjectText2}>Loading Submiting</Text>
            {/* <Text style={styles.emojiText2}>hello</Text> */}

            {/* <Text style={styles.subjectText2}>{happyDesciption}</Text> */}
          </View>
        </View>
      </Overlay>
    );
  } else {
    return (
      <Overlay
        isVisible={isVisible}
        width={Platform.isPad ? "50%" : "60%"}
        height={Platform.isPad ? "50%" : Platform.OS === "ios" ? "35%" : "43%"}
        overlayBackgroundColor={"white"}
        overlayStyle={styles.containerOverlay2}
        onBackdropPress={onClose}
      >
        <View style={styles.closeIcon2}>
          <TouchableOpacity onPress={onClose} activeOpacity={1}>
            <Image
              source={require("../../../../assets/chilliBuddyCheckin/closeButton.png")}
              style={styles.redeemImageCrossStyle}
            />
          </TouchableOpacity>
        </View>
        {/* <View style={styles.contentContainer2}> */}
        {/* <View style={styles.imageAnime2}> */}
        <Image
          source={require("../../../../assets/chilliBuddyCheckin/chilliSadFace.png")}
          style={styles.redeemImageChilliStyle2}
        />

        <View style={styles.desciptionBox2}>
          <Text style={styles.emojiText2}>{Header}</Text>
          <Text style={styles.subjectText2}>{happyDesciption}</Text>
        </View>
        {/* </View> */}

        {/* <Text style={styles.messageText}>{"errorMessage"}</Text> */}
        {/* </View> */}
        {/* <TouchableOpacity style={styles.submitContainer}>
        <Text style={styles.text}>{"Back"}</Text>
      </TouchableOpacity> */}
      </Overlay>
    );
  }
};
export { CheckInModal, CheckInModalError };
