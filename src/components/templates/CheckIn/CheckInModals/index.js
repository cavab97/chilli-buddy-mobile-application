import React from "react";
import styles from "./styles";
import { Text, Overlay, View, Image } from "../../../atoms";
import { TouchableHighlight, TouchableOpacity, TouchableNativeFeedback } from "react-native";

import { Colors, Mixins, Typography } from "../../../../settings/styles/theme";
import Icon from "react-native-vector-icons/Ionicons";

import { StyleSheet, Button } from "react-native";

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
}) => {
  return (
    <Overlay
      isVisible={isVisible}
      width="65%"
      height="70%"
      overlayBackgroundColor={"white"}
      overlayStyle={styles.containerOverlay}
    >
      <View style={styles.contentContainer}>
        <View style={styles.closeIcon}>
          <TouchableOpacity onPress={onClose}>
            <Image
              source={require("../../../../assets/chilliBuddyCheckin/closeButton.png")}
              style={styles.redeemImageCrossStyle}
            />
          </TouchableOpacity>
        </View>

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
            <Text style={styles.voucherValue}>{message == null ? " " : message.amount}</Text>
            <Text style={styles.restaurantText}>
              {message == null ? " " : message.merchant[0].businessName + " "} Voucher!
            </Text>
          </View>
          {rewardOnceThanOneOption != true ? (
            <TouchableOpacity style={styles.redeemNowBox}>
              <Text style={styles.redeemNowText}>Redeem</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.doubleOption}>
              <TouchableOpacity style={styles.redeemNowBox}>
                <Text style={styles.redeemNowText}>Redeem Now</Text>
              </TouchableOpacity>
              <Text style={styles.Or}>Or</Text>
              <TouchableOpacity style={styles.redeemNowBoxSecond}>
                <Text style={styles.redeemNowText}>Keep Going </Text>
              </TouchableOpacity>
              <View style={styles.bottomTextBox}>
                <Text style={styles.bottomText}>
                  stand a chance to win an even bigger prize at the end of the month.
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* <Text style={styles.messageText}>{"errorMessage"}</Text> */}
      </View>
      {/* <TouchableOpacity style={styles.submitContainer}>
        <Text style={styles.text}>{"Back"}</Text>
      </TouchableOpacity> */}
    </Overlay>
  );
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
}) => {
  return (
    <Overlay
      isVisible={isVisible}
      width="60%"
      height="50%"
      overlayBackgroundColor={"white"}
      overlayStyle={styles.containerOverlay}
    >
      <View style={styles.contentContainer}>
        <View style={styles.closeIcon}>
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
};
export { CheckInModal, CheckInModalError };
