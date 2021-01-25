import React from "react";
import styles from "./styles";
import { Text, Overlay, TouchableOpacity, View, Image } from "../../../atoms";
import { Colors, Mixins, Typography } from "../../../../settings/styles/theme";
import Icon from "react-native-vector-icons/Ionicons";

import { StyleSheet, Button } from "react-native";

const CheckInModal = ({ errorHeader, errorMessage, errorStatus, errorSubmit }) => {
  return (
    <Overlay
      isVisible={true}
      width="60%"
      height="50%"
      overlayBackgroundColor={"white"}
      overlayStyle={styles.containerOverlay}
    >
      <View style={styles.contentContainer}>
        <View style={styles.closeIcon}>
          <Image
            source={require("../../../../assets/chilliBuddyCheckin/closeButton.png")}
            style={styles.redeemImageQuestionStyle}
          />
        </View>

        <Text style={styles.subjectText}>{"errorHeader"}</Text>
        <Text style={styles.messageText}>{"errorMessage"}</Text>
      </View>
      {/* <TouchableOpacity style={styles.submitContainer}>
        <Text style={styles.text}>{"Back"}</Text>
      </TouchableOpacity> */}
    </Overlay>
  );
};
export { CheckInModal };
