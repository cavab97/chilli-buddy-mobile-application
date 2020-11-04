import React from "react";
import { StyleSheet } from "react-native";

import {
  ActivityIndicator,
  Overlay,
  Text,
  TouchableOpacity,
  WebView,
} from "../../../components/atoms";

import { Colors } from "../../../settings/styles/theme";

const RecaptchaModal = ({
  isVisible,
  buttonHide,
  buttonTitle,
  authDomain,
  onMessage,
  onSendSMS,
  onBackdropPress,
  containerWidth,
  containerHeight,
  onError,
  error
}) => {
  return (
    <Overlay
      isVisible={isVisible}
      width={containerWidth}
      height={containerHeight}
      overlayStyle={styles.modal}
      onBackdropPress={onBackdropPress}
    >
      <WebView
        style={styles.webView}
        source={{
          uri: `https://${authDomain}/authrecaptcha`,
        }}
        onMessage={onMessage}
        renderError={onError}
        onError={onError}
        startInLoadingState
        renderLoading={() => {
          return (
            <ActivityIndicator
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          );
        }}
      />
      {error && <Text style={styles.textFontFamily}>{error}</Text>}

      {buttonHide && (
        <TouchableOpacity style={styles.submitContainer} onPress={onSendSMS}>
          <Text style={styles.text}>{buttonTitle}</Text>
        </TouchableOpacity>
      )}
    </Overlay>
  );
};

const styles = StyleSheet.create({
  webView: {
    height: 200,
    width: 304,
  },
  modal: {
    alignItems: "center",
  },
  submitContainer: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 3,
    width: 292,
    height: 49,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "RobotoRegular"
  },
  textFontFamily: {
    fontFamily: "RobotoRegular",
  }
});

export { RecaptchaModal };
