import React from "react";
import styles from "./styles";
import { Text, Overlay, TouchableOpacity, View, Image } from "../../../atoms";
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
          <TouchableOpacity
            onPress={onClose}
          >
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

          <Text style={styles.subjectText}>{Header}</Text>
          <Text style={styles.subjectText}>{happyDesciption}</Text>
        </View>

        {/* <Text style={styles.messageText}>{"errorMessage"}</Text> */}
      </View>
      {/* <TouchableOpacity style={styles.submitContainer}>
        <Text style={styles.text}>{"Back"}</Text>
      </TouchableOpacity> */}
    </Overlay>
  );
};
export { CheckInModal };
