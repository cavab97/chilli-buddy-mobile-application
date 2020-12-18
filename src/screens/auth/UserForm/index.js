import React, { Component } from "react";
import { Keyboard, Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  CustomIcon,
  ModalSelector,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedBack,
  View,
} from "../../../components/atoms";

import { ImageInfo, InputTextField } from "../../../components/molecules";

import { SignoutButton } from "../../../components/molecules";

import { Colors } from "../../../settings/styles/theme";

import { connect } from "react-redux";
import {
  update,
  readFromDatabase,
  submitToBackend,
} from "../../../marslab-library-react-native/redux/user/action";
import { Actions } from "react-native-router-flux";
import styles from "./styles";

const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      message: null,
      triggerLoading: null,
      emailErrorMessage: null,
      icErrorMessage: null,
      nameErrorMessage: null,
      photo: null,
    };

    //bind functions
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.readFromDatabase();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.submitInfoError.message !== prevProps.submitInfoError.message &&
      this.props.submitInfoError.message
    ) {
      this.setState({
        error: true,
        message: this.props.submitInfoError.message,
        triggerLoading: null,
      });
    }

    if (
      this.props.submitInfoResult.message !== prevProps.submitInfoResult.message &&
      this.props.submitInfoResult.message
    ) {
      this.setState({
        message: this.props.submitInfoResult.message,
        error: false,
        triggerLoading: null,
      });

      setTimeout(() => {
        Actions.Profile();
      }, 2000);
    }
  }

  onRecordChange = ({ key, nestedKey }, value) => {
    let { user } = this.props;
    this.setState({ user });
    if (key && nestedKey) user[key][nestedKey] = value;
    else if (key) user[key] = value;
    this.props.update(user);
  };

  onSelectChange = ({ key, nestedKey }, value) => {
    let { user } = this.props;
    this.setState({ user });
    if (key && nestedKey) user[key][nestedKey] = value;
    else if (key) user[key] = value;
    this.props.update(user);
  };

  onSubmit() {
    const { user } = this.props;
    let valid = true;

    if (
      !emailPattern.test(user.email) &&
      (typeof user.email === "string" ? user.email.length === 0 : user.email === null)
    ) {
      valid = false;
      this.setState({ emailErrorMessage: " (Email format is incorrect)" });
    } else {
      this.setState({ emailErrorMessage: "" });
    }

    if (
      typeof user.displayName === "string"
        ? user.displayName.length === 0 ||
          user.displayName.trim() === "" ||
          user.displayName === null
        : user.displayName === null
    ) {
      valid = false;
      this.setState({ nameErrorMessage: " (Name is required)" });
    } else {
      this.setState({ nameErrorMessage: "" });
    }

    if (valid) {
      this.props.submitToBackend(user, "updateProfile");
      this.setState({ triggerLoading: true, emailErrorMessage: "", nameErrorMessage: "" });
    }
  }

  infoListSection = (title, detail, onChangeText, required) => {
    return (
      <View style={styles.infoDetailSection}>
        <Text style={styles.infoTitleStyle}>
          {title}
          {required && <Text style={{ color: "red", fontFamily: "RobotoRegular" }}> *</Text>}
        </Text>
        <InputTextField
          placeholderText={title}
          placeholderTextColor="#CCCCCC"
          inputStyle={styles.inputTextStyle}
          value={detail}
          onChangeText={onChangeText}
          keyboardType={
            title === "IC Number" ? "numeric" : title === "Email" ? "email-address" : "default"
          }
        />
      </View>
    );
  };

  onChangeImagePressed() {
    Actions.CameraProfile();
  }

  render() {
    const { user, readLoading, readError } = this.props;
    const {
      displayName,
      gender,
      email,
      address,
      identityNumber,
      photoURL,
      //phoneNumber,
    } = user;

    const genderOption = ["Male", "Female"];
    const countriesList = require("../../../assets/address/countries.json");
    const statesList = require("../../../assets/address/Malaysia/states.json");

    address.country = "Malaysia";

    /*  if (this.state.triggerLoading || this.state.message){
            return (
                <Overlay
                    isVisible={this.state.triggerLoading}
                    width="100%"
                    height="100%"
                    overlayBackgroundColor={Colors.PRIMARY}
                    overlayStyle={styles.containerOverlay}
                >
                    <View style={styles.contentContainer}>
                    
                        {this.state.message && (this.state.error === false) &&
                            <View style={styles.contentContainer}>
                                <Icon 
                                    name="ios-checkmark-circle-outline" 
                                    color="white" 
                                    size={70} 
                                />
                                <Text style={styles.subjectText}>
                                    Success
                                </Text>
                                <Text style={styles.messageText}>
                                    You have updated your profile information.
                                </Text>
                            </View>
                        }
                    </View>
                </Overlay>
            );
        } else { */
    return (
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        extraHeight={Platform.OS === "ios" ? 100 : 250}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableWithoutFeedBack onPress={Keyboard.dismiss} accessible={false}>
            <View>
              <View style={styles.ProfileContatiner}>
                {/* <View style={styles.ProfileImageStyle}> */}
                <View>
                  <ImageInfo
                    banner={photoURL ? photoURL : require("../../../assets/DefaultAvatar.jpg")}
                    imageContainer={styles.ProfileImageStyle}
                    imageStyle={styles.image}
                  />
                </View>
                <TouchableOpacity
                  onPress={this.onChangeImagePressed.bind(this)}
                  style={styles.UploadImageButton}
                >
                  <CustomIcon name="camera" color={Colors.PRIMARY} size={14} />
                </TouchableOpacity>
              </View>
              <View style={styles.BodyContatiner}>
                {this.infoListSection(
                  "Name" + (this.state.nameErrorMessage ? this.state.nameErrorMessage : ""),
                  displayName,
                  this.onRecordChange.bind(this, {
                    key: "displayName",
                  }),
                  true
                )}
                {this.infoListSection(
                  "IC Number" + (this.state.icErrorMessage ? this.state.icErrorMessage : ""),
                  identityNumber,
                  this.onRecordChange.bind(this, {
                    key: "identityNumber",
                  })
                )}
                <View style={styles.infoDetailSection}>
                  <Text style={styles.infoTitleStyle}>Gender</Text>
                  <ModalSelector
                    style={styles.genderButtonContainerStyle}
                    data={genderOption}
                    keyExtractor={(item) => item}
                    labelExtractor={(item) => item}
                    onChange={this.onSelectChange.bind(this, {
                      key: "gender",
                    })}
                    selectedKey={gender}
                    initValue="Gender"
                  />
                </View>
                {/* {this.infoListSection(
                                        "Gender", 
                                        gender,
                                        this.onRecordChange.bind(this, {
                                            key: "gender",
                                        }) 
                                    )}  */}
                {this.infoListSection(
                  "Email" + (this.state.emailErrorMessage ? this.state.emailErrorMessage : ""),
                  email,
                  this.onRecordChange.bind(this, {
                    key: "email",
                  }),
                  true
                )}
                {/* {this.infoListSection(
                                        "Contact No.",
                                        phoneNumber,
                                        this.onRecordChange.bind(this, {
                                            key: "phoneNumber",
                                        })
                                    )} */}
                <View>
                  <View style={styles.infoDetailSection}>
                    <Text style={styles.infoTitleStyle}>Address</Text>
                    <InputTextField
                      placeholderText="Line 1"
                      placeholderTextColor="#CCCCCC"
                      inputStyle={styles.inputTextStyle}
                      onChangeText={this.onRecordChange.bind(this, {
                        key: "address",
                        nestedKey: "line1",
                      })}
                      value={address.line1}
                    />
                    <InputTextField
                      placeholderText="Line 2"
                      placeholderTextColor="#CCCCCC"
                      inputStyle={styles.inputTextStyle}
                      onChangeText={this.onRecordChange.bind(this, {
                        key: "address",
                        nestedKey: "line2",
                      })}
                      value={address.line2}
                    />
                    <View style={styles.addressContainer}>
                      <View style={styles.fixContainer}>
                        <InputTextField
                          placeholderText="Postcode"
                          placeholderTextColor="#CCCCCC"
                          inputStyle={styles.inputTextStyle}
                          onChangeText={this.onRecordChange.bind(this, {
                            key: "address",
                            nestedKey: "postcode",
                          })}
                          value={address.postcode}
                          keyboardType="numeric"
                        />
                      </View>
                      <View style={styles.fixContainer}>
                        <ModalSelector
                          style={styles.buttonContainerStyle}
                          data={statesList}
                          keyExtractor={(item) => item}
                          labelExtractor={(item) => item}
                          onChange={this.onSelectChange.bind(this, {
                            key: "address",
                            nestedKey: "state",
                          })}
                          selectedKey={address.state}
                          initValue="State"
                        />
                      </View>
                      <View style={styles.fixContainer}>
                        <Text style={styles.countryStyle}>Malaysia</Text>

                        {/* <ModalSelector
                                                style={styles.buttonContainerStyle}
                                                data={countriesList}
                                                keyExtractor={(item) =>
                                                    item.country
                                                }
                                                labelExtractor={(item) =>
                                                    item.country
                                                }
                                                onChange={(value) =>
                                                    this.onSelectChange(
                                                        {
                                                            key: "address",
                                                            nestedKey: "country",
                                                        },
                                                        value.country
                                                    )
                                                }
                                                selectedKey={address.country}
                                                initValue="Country"
                                            /> */}
                      </View>
                    </View>
                  </View>
                </View>
                {this.state.message && this.state.error === false && (
                  <Text
                    style={{
                      paddingLeft: 20,
                      color: Colors.PRIMARY,
                      paddingBottom: 5,
                      fontFamily: "RobotoRegular",
                    }}
                  >
                    Successful update information
                  </Text>
                )}
                {this.state.message && this.state.error === true && (
                  <Text
                    style={{
                      paddingLeft: 20,
                      color: Colors.PRIMARY,
                      paddingBottom: 5,
                      fontFamily: "RobotoRegular",
                    }}
                  >
                    {this.state.message}
                  </Text>
                )}
                <SignoutButton
                  containerStyle={styles.saveContainerStyle}
                  textStyle={styles.saveTextStyle}
                  onPress={this.onSubmit}
                  loading={this.state.triggerLoading ? true : false}
                  disabled={this.state.triggerLoading ? true : false}
                >
                  Save Changes
                </SignoutButton>
              </View>
            </View>
          </TouchableWithoutFeedBack>
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStatetoprops = (state) => {
  const { user } = state.User;
  const submitInfoResult = state.User.submitResult;
  const submitInfoLoading = state.User.submitLoading;
  const submitInfoError = state.User.submitError;

  return {
    user,
    submitInfoResult,
    submitInfoLoading,
    submitInfoError,
  };
};

export default connect(mapStatetoprops, {
  update,
  readFromDatabase,
  submitToBackend,
})(Index);
