import React from "react";
import styles from "./styles";
import { Text, Overlay, View, Image } from "../../../atoms";
import { TouchableHighlight, TouchableOpacity, TouchableNativeFeedback } from "react-native";
import ContentLoader, { Rect } from "react-content-loader/native";
import { Dimensions } from "react-native";

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
}) => {
  // try {
  //   console.log(message.merchant[0]);
  // } catch (error) {
  //   console.log(error);
  // }
  if (readLoading) {
    return (
      <ScrollView>
        <View style={styles.container}>
          <ContentLoader speed={1} width={"100%"} height={height} backgroundColor="#d9d9d9">
            <Rect x="60%" y="0" rx="5" ry="5" width="40%" height="20" />
            <Rect x="0" y="40" rx="5" ry="5" width="100%" height="200" />
            <Rect x="0" y="250" rx="5" ry="5" width="50%" height="20" />
            <Rect x="0" y="275" rx="5" ry="5" width="50%" height="20" />
            <Rect x="0" y="320" rx="5" ry="5" width="100%" height={height} />
          </ContentLoader>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <Overlay
        isVisible={isVisible}
        width="65%"
        height={!timeUps ? "70%" : "50%"}
        overlayBackgroundColor={"white"}
        overlayStyle={styles.containerOverlay}
      >
        <View style={styles.contentContainer}>
          {!timeUps ? (
            <View
              position="absolute"
              bottom={Platform.OS === "ios" ? 430 : 390}
              right={-54}
              resizeMode="contain"
              fontSize={10}
              shadowColor="#000"
              shadowOpacity={0.22}
              shadowRadius={2.22}
              zIndex={1}
              style={styles.closeIcon}
            >
              <TouchableOpacity onPress={onClose}>
                <Image
                  source={require("../../../../assets/chilliBuddyCheckin/closeButton.png")}
                  style={styles.redeemImageCrossStyle}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View
              position="absolute"
              bottom={Platform.OS === "ios" ? 320 : 200}
              right={-54}
              resizeMode="contain"
              fontSize={10}
              shadowColor="#000"
              shadowOpacity={0.22}
              shadowRadius={2.22}
              zIndex={1}
              style={styles.closeIcon}
            >
              <TouchableOpacity onPress={onClose}>
                <Image
                  source={require("../../../../assets/chilliBuddyCheckin/closeButton.png")}
                  style={styles.redeemImageCrossStyle}
                />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.imageAnime}>
            {happy != true ? (
              <Image
                source={require("../../../../assets/chilliBuddyCheckin/chilliSadFace.png")}
                style={styles.redeemImageChilliStyle}
              />
            ) : (
              <Image
                source={require("../../../../assets/chilliBuddyCheckin/chilliHappyFace.png")}
                style={styles.redeemImageChilliStyle}
              />
            )}
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
                {message == null ? " " : message.merchant[0].businessName}
                Voucher!
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
          </View>

          {/* <Text style={styles.messageText}>{"errorMessage"}</Text> */}
        </View>
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
}) => {
  if (readLoading) {
    return (
      <ScrollView>
        <View style={styles.container}>
          <ContentLoader speed={1} width={"100%"} height={height} backgroundColor="#d9d9d9">
            <Rect x="60%" y="0" rx="5" ry="5" width="40%" height="20" />
            <Rect x="0" y="40" rx="5" ry="5" width="100%" height="200" />
            <Rect x="0" y="250" rx="5" ry="5" width="50%" height="20" />
            <Rect x="0" y="275" rx="5" ry="5" width="50%" height="20" />
            <Rect x="0" y="320" rx="5" ry="5" width="100%" height={height} />
          </ContentLoader>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <Overlay
        isVisible={isVisible}
        width="60%"
        height="50%"
        overlayBackgroundColor={"white"}
        overlayStyle={styles.containerOverlay}
      >
        <View style={styles.contentContainer2}>
          <View style={styles.closeIcon2}>
            <TouchableOpacity onPress={onClose}>
              <Image
                source={require("../../../../assets/chilliBuddyCheckin/closeButton.png")}
                style={styles.redeemImageCrossStyle}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.imageAnime2}>
            <Image
              source={require("../../../../assets/chilliBuddyCheckin/chilliSadFace.png")}
              style={styles.redeemImageChilliStyle2}
            />

            <View style={styles.desciptionBox2}>
              <Text style={styles.emojiText2}>{Header}</Text>
              <Text style={styles.subjectText2}>{happyDesciption}</Text>
            </View>
          </View>

          {/* <Text style={styles.messageText}>{"errorMessage"}</Text> */}
        </View>
        {/* <TouchableOpacity style={styles.submitContainer}>
        <Text style={styles.text}>{"Back"}</Text>
      </TouchableOpacity> */}
      </Overlay>
    );
  }
};
export { CheckInModal, CheckInModalError };
