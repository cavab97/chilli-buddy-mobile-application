import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { Keyboard, Alert, Platform } from "react-native";
import { api } from "../../../settings";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedBack,
  View
} from "../../../components/atoms";

import {
  TACTextInput,
} from "../../../components/molecules";

import styles from "./styles";
//import { RecaptchaModal } from "../LogIn/recaptcha";
import { SuccessfulModal } from "./successful";

import {
  update,
  loginTACConfirmation,
  loginWithPhoneNumber,
  modalControl,
} from "../../../marslab-library-react-native/redux/auth/actions";

import clone from "clone";

const { authDomain } = api.firebaseConfig;

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clock: null,
      countdown: 15,
    };
  }

  componentDidMount() {
    this.state.clock = setInterval(() => {
      if (this.state.countdown > 0) {
        this.setState({ countdown: this.state.countdown - 1 });
      }
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.countdown === 0) {
      clearInterval(this.state.clock);
    }

    if (
      prevProps.loginDetails.confirmationResult.verificationId !==
        this.props.loginDetails.confirmationResult.verificationId &&
      this.props.loginDetails.confirmationResult.verificationId
    ) {
      clearInterval(this.state.clock);
    }
  }

  onRecordChange = (key, value) => {
    let { loginDetails } = clone(this.props);
    if (key) loginDetails[key] = value;

    this.props.update(loginDetails);
  };

  onLoginBack = () => {
    let { loginDetails } = clone(this.props);

    loginDetails.tac = "";
    loginDetails.confirmationResult.verificationId = null;

    this.props.update(loginDetails);

    Actions.pop();
  };

  onLoginButtonPress(tac) {
    const { loginTACConfirmation } = this.props;
    loginTACConfirmation({ tac });
  }

  onSendSMS = ({ phoneNumber, recaptchaToken }) => {
    const { loginWithPhoneNumber } = this.props;
    try {
      loginWithPhoneNumber({ phoneNumber, recaptchaToken });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { loginDetails, error } = this.props;
    const { phoneNumber, recaptchaToken, tac } = loginDetails;

    return (
      <ImageBackground
        source={require("../../../../assets/Login.jpg")}
        style={styles.container}
      >
        <TouchableWithoutFeedBack onPress={Keyboard.dismiss} accessible={false}>
         {/* < KeyboardAvoidingView
            //behavior={Platform.OS === "ios" ? "padding" : null}
            behavior="padding"
            style={styles.container2}
            keyboardVerticalOffset={Platform.OS === "ios" ? -300 : -300}
            enabled
          > */}
          <KeyboardAwareScrollView
                style={styles.container2}
                showsVerticalScrollIndicator = {false}
                enableOnAndroid={true} 
                keyboardShouldPersistTaps='handled'
                extraScrollHeight={Platform.OS === 'ios' ? 0 : 100} 
                /*  behavior={Platform.OS === "ios" ? "padding" : "height"}
                //behavior="position"
                //behavior="padding"
                style={{flex:1}}
                keyboardVerticalOffset={Platform.OS === "ios" ? 100 : -700}
                enabled */
            >
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.containerpart1}>
                <Image
                  source={require("../../../assets/gogogain/login_logo.png")}
                  style={styles.logoImage}
                />
              </View>
              <View style={styles.containerpart2}>
                <Text style={styles.subTitle}>
                  Enter the 6 digit code we sent you via phone number to
                  continue
                </Text>
              </View>
              <View style={styles.containerpart3}>
                <TACTextInput
                  value={tac}
                  textStyle={{color: "#fff", fontSize: 25}}
                  onChange={this.onRecordChange.bind(this, "tac")}
                />
              </View>
              {/* {this.state.countdown > 0 && (
                <View style={styles.containerpart4}>
                  <Text style={styles.countDownText}>code expired in: </Text>
                  <Text style={styles.countDownTime}>
                    {this.state.countdown === 60
                      ? "01:00"
                      : this.state.countdown / 10 >= 1
                      ? "00:" + this.state.countdown
                      : "00:0" + this.state.countdown}
                  </Text>
                </View>
              )}
              {this.state.countdown === 0 && (
                <View style={styles.containerpart4}>
                  <TouchableOpacity
                    onPress={()=>this.onSendSMS({phoneNumber, recaptchaToken})}
                  >
                    <Text style={styles.resendTAC}>Resend TAC</Text>
                  </TouchableOpacity>
                </View>
              )} */}
              {error && <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  {error.message}
                </Text>
              </View>}

              <View style={styles.containerpart5}>
                <TouchableOpacity
                  style={styles.submitContainer}
                  onPress={this.onLoginBack.bind(this)}
                >
                  <Text style={[styles.submitText]}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.submitContainer}
                  onPress={this.onLoginButtonPress.bind(this, tac)}
                >
                  <Text style={[styles.submitText]}>Verify</Text>
                </TouchableOpacity>
              </View>

              <View>
                <SuccessfulModal />
              </View>
            </ScrollView>
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
  loginTACConfirmation,
  loginWithPhoneNumber,
  modalControl,
})(index);
