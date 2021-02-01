import React from "react";
import styles from "./styles";
import { Text, Overlay, TouchableOpacity, View } from "../../../atoms";
import { Colors, Mixins, Typography } from "../../../../settings/styles/theme";
import Icon from "react-native-vector-icons/Ionicons";

import { StyleSheet, Button } from "react-native";

const SingleVoucherErrorModal = ({ errorHeader, errorMessage, errorStatus, errorSubmit }) => {
  return (
    <Overlay
      isVisible={errorStatus}
      width="60%"
      height="35%"
      overlayBackgroundColor={Colors.PRIMARY}
      overlayStyle={styles.containerOverlay}
    >
      <View style={styles.contentContainer}>
        <Icon name="ios-close-circle-outline" color="white" size={70} />
        <Text style={styles.subjectText}>{errorHeader}</Text>
        <Text style={styles.messageText}>{errorMessage}</Text>
      </View>
      <TouchableOpacity style={styles.submitContainer} onPress={errorSubmit}>
        <Text style={styles.text}>{"Back"}</Text>
      </TouchableOpacity>
    </Overlay>
  );
};
export { SingleVoucherErrorModal };
