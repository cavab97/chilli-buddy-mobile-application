import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { api } from "../../../settings";
import { RecaptchaModal } from "./recaptcha";
import { Keyboard, Alert, Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import countryCode from "../../../assets/countryCode/countryCodes";
const { authDomain } = api.firebaseConfig;

import {
  ActivityIndicator,
  Image,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedBack,
  Text,
  View,
} from "../../../components/atoms";

import {
  update,
  loginWithPhoneNumber,
  modalControl,
} from "../../../marslab-library-react-native/redux/auth/actions";

import styles from "./styles";

import clone from "clone";
import { LoginTextField } from "../../../components/molecules";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invalidPhoneNumber: false,
      areaCode: "+60",
      sending: false,
      errorMessage: null,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.loginDetails.confirmationResult.verificationId !==
        this.props.loginDetails.confirmationResult.verificationId &&
      this.props.loginDetails.confirmationResult.verificationId
    ) {
      this.setState({ sending: false });
      Actions.jump("loginTAC");
    }
  }

  onRecordChange = (key, value) => {
    let { loginDetails } = clone(this.props);
    if (key) loginDetails[key] = value;

    this.props.update(loginDetails);
  };

  modalHandle = ({ key, data = null }) => {
    if (key === "open") {
      const recaptchaToken = null;
      this.onRecordChange("recaptchaToken", recaptchaToken);

      if (/^[0-9]{9,10}$/.test(data)) {
        this.setState({ invalidPhoneNumber: false });
      } else {
        this.setState({ invalidPhoneNumber: true });
        return;
      }
    }

    this.props.modalControl();
  };

  onSendSMS = ({ phoneNumber, recaptchaToken }) => {
    this.setState({ sending: true });
    const { loginWithPhoneNumber } = this.props;
    phoneNumber = this.state.areaCode + phoneNumber;

    try {
      loginWithPhoneNumber({ phoneNumber, recaptchaToken });
      this.modalHandle({ key: "close" });
    } catch (error) {
      console.log(error);
    }
  };

  onRecaptchaError() {
    Alert.alert(
      "Network Error",
      "There might be some problem loading the content because of network unstable",
      [{ text: "OK" }],
      { cancelable: true }
    );
  }

  onChangeAreaCode = (value) => {
    this.setState({ areaCode: value.dial_code });
  };

  render() {
    const { loginDetails, loading, modalVisible, error } = this.props;
    const { phoneNumber, recaptchaToken } = loginDetails;

    return (
      <ImageBackground source={require("../../../../assets/Login.jpg")} style={styles.container}>
        <TouchableWithoutFeedBack onPress={Keyboard.dismiss} accessible={false}>
          {/* <KeyboardAvoidingView
            behavior="position"
            style={{ flex: 1, justifyContent: "center" }}
            keyboardVerticalOffset={Platform.OS === "ios" ? -300 : -300}
            enabled
          > */}
          <KeyboardAwareScrollView
            style={{ flex: 1, width: "100%" }}
            showsVerticalScrollIndicator={false}
            enableOnAndroid={true}
            keyboardShouldPersistTaps="handled"
            extraScrollHeight={Platform.OS === "ios" ? 0 : 100}
            /*  behavior={Platform.OS === "ios" ? "padding" : "height"}
                //behavior="position"
                //behavior="padding"
                style={{flex:1}}
                keyboardVerticalOffset={Platform.OS === "ios" ? 100 : -700}
                enabled */
          >
            <View style={styles.innerContainer}>
              <View style={styles.containerpart1}>
                <Image
                  source={require("../../../assets/gogogain/loginIcon.png")}
                  style={styles.logoImage}
                />
              </View>
              <View style={styles.containerpart2}>
                <LoginTextField
                  onChangeText={this.onRecordChange.bind(this, "phoneNumber")}
                  value={phoneNumber}
                  style={styles.inputContainerStyle}
                  inputStyle={styles.inputStyle}
                  placeholderText="ENTER PHONE NUMBER"
                  placeholderTextColor="rgba(255,255,255, 0.5)"
                  countryCode={countryCode}
                  onChangeAreaCode={this.onChangeAreaCode.bind(this)}
                />
                {this.state.invalidPhoneNumber && (
                  <Text style={styles.errorText}>* Invalid Phone format. eg: +601X XXX XXXX</Text>
                )}

                <TouchableOpacity
                  style={styles.loginContainer}
                  onPress={this.modalHandle.bind(this, {
                    key: "open",
                    data: phoneNumber,
                  })}
                >
                  <ActivityIndicator animating={this.state.sending && error.message} />
                  <Text style={[styles.loginText]}>Login</Text>
                </TouchableOpacity>
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </View>

              <RecaptchaModal
                isVisible={modalVisible}
                containerWidth={304}
                containerHeight={510}
                authDomain={authDomain}
                onMessage={(event) => {
                  const recaptchaToken = event.nativeEvent.data;
                  this.onRecordChange("recaptchaToken", recaptchaToken);
                }}
                onError={this.onRecaptchaError.bind(this)}
                error={this.state.errorMessage}
                buttonTitle="Request TAC"
                buttonHide={recaptchaToken ? true : false}
                onSendSMS={() =>
                  this.onSendSMS({
                    phoneNumber,
                    recaptchaToken,
                  })
                }
                onBackdropPress={this.modalHandle.bind(this, { key: "close" })}
              />
            </View>
          </KeyboardAwareScrollView>
        </TouchableWithoutFeedBack>
      </ImageBackground>
    );
  }
}

const mapStateToProps = ({ Auth }) => {
  const { loginDetails, loading, error, modalVisible } = Auth;

  return { loginDetails, loading, error, modalVisible };
};

export default connect(mapStateToProps, {
  update,
  loginWithPhoneNumber,
  modalControl,
})(index);
