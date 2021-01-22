import React from "react";
import styles from "./styles";

import { Dimensions, Linking } from "react-native";

import { View, Image, Text, ScrollView, FlatList } from "@components/atoms";

import { Card, CardSection } from "@components/molecules";

import { Collapsible } from "@components/organisms/Collapsible";

import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../../../../settings/styles/theme";
import moment from "moment";
import { RedeeemButton } from "@components/molecules/RedeemButton";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
// const facebook = require("../../../../assets/icons/facebook.png");      //social media icon
// const instagram = require("../../../../assets/icons/instagram.png");
// const whatsapp = require("../../../../assets/icons/whatsapp.png");

const SingleVoucher = ({
  icon,
  renderTermAndCondition,
  viewHeight, //distance calculated from single merchant view
  find_dimensions = () => {},
  onRedeemPress,
  title,
  noImage,
  SalesPoint,
  merchantName,
  expiredDate,
  description,
  status,
  OpenCamPress,
  OnInvalidPress,
}) => {
  const {
    detailArea,
    titleStyle,
    subIconDetailMain,
    setRow,
    subContainer1,
    imageTopStyle,
    posterArea,
    card,
    columnOne,
    columnTwo,
    columnThree,
    columnTwoText,
    cardContainer,
    logoImage,
    titleBox,
    statusActiveText,
    statusDeactiveText,
  } = styles;

  return (
    <View>
      <View style={posterArea}>
        <View style={subContainer1}>
          {false ? (
            <Image source={{ uri: item }} style={imageTopStyle} resizeMode={"cover"} />
          ) : (
            <Image source={noImage} style={imageTopStyle} resizeMode={"cover"} />
          )}
        </View>
      </View>
      <ScrollView scrollIndicatorInsets={{ right: 0.4 }} style={{ height: "70%" }}>
        <View style={detailArea}>
          <View style={titleBox}>
            <Text style={titleStyle}>{title}</Text>
          </View>

          <View>
            <View style={setRow}>
              <Ionicons style={{}} name="md-calendar" size={26} color={Colors.PRIMARY} />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  fontFamily: "RobotoRegular",
                  marginLeft: 10.5,
                  //marginRight: 10.5,
                  marginTop: 3,
                  color: Colors.PRIMARY,
                  marginBottom: 5,
                }}
              >
                Valid from
              </Text>
            </View>
            <View>
              <Text>11/1/2021-15/2/2021</Text>
            </View>
            <View style={setRow}>
              <Ionicons style={{}} name="ios-document" size={26} color={Colors.PRIMARY} />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  fontFamily: "RobotoRegular",
                  marginLeft: 10.5,
                  //marginRight: 10.5,
                  marginTop: 3,
                  color: Colors.PRIMARY,
                  marginBottom: 5,
                }}
              >
                Description
              </Text>
            </View>
            <View>
              <Text>This is my description for the voucher</Text>
            </View>
            <View style={setRow}>
              <Ionicons style={{}} name="ios-document" size={26} color={Colors.PRIMARY} />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  fontFamily: "RobotoRegular",
                  marginLeft: 10.5,
                  //marginRight: 10.5,
                  marginTop: 3,
                  color: Colors.PRIMARY,
                  marginBottom: 5,
                }}
              >
                Terms and Condition
              </Text>
            </View>
            <View>
              <Text>1. This is my description for the voucher</Text>
              <Text>2. This is my description for the voucher</Text>
              <Text>3. This is my description for the voucher</Text>
              <Text>4. This is my description for the voucher</Text>
              <Text>5. This is my description for the voucher</Text>
              <Text>1. This is my description for the voucher</Text>
              <Text>2. This is my description for the voucher</Text>
              <Text>3. This is my description for the voucher</Text>
              <Text>4. This is my description for the voucher</Text>
              <Text>5. This is my description for the voucher</Text>
              <Text>1. This is my description for the voucher</Text>
              <Text>2. This is my description for the voucher</Text>
              <Text>3. This is my description for the voucher</Text>
              <Text>4. This is my description for the voucher</Text>
              <Text>5. This is my description for the voucher</Text>
              <Text>1. This is my description for the voucher</Text>
              <Text>2. This is my description for the voucher</Text>
              <Text>3. This is my description for the voucher</Text>
              <Text>4. This is my description for the voucher</Text>
              <Text>5. This is my description for the voucher</Text>
            </View>
            {/* <View style={setRow}>
                <Ionicons
                  style={subIconDetailMain}
                  name="ios-pin"
                  size={26}
                  color={Colors.PRIMARY}
                />
              </View> */}
          </View>
        </View>
      </ScrollView>
      <Card style={cardContainer}>
        <CardSection style={card}>
          <View style={columnOne}>
            <Image
              source={require("../../../../assets/gogogain/loginIcon.png")}
              style={styles.logoImage}
            />
          </View>
          <View style={columnTwo}>
            {/* <Text style={{ fontWeight: "bold", fontSize: 18, top: 40 }}>{SalesPoint}</Text> */}
            {/* <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  fontFamily: "RobotoRegular",
                  marginLeft: 0,
                  //marginRight: 10.5,
                  color: Colors.PRIMARY,
                  marginBottom: 0,
                }}
              >
                {}
              </Text> */}

            <View style={columnThree}>
              <Text style={columnTwoText}>{merchantName}</Text>
            </View>

            <View>
              {status ? (
                <Text style={statusActiveText}> Active</Text>
              ) : (
                <Text style={statusDeactiveText}>Deactive</Text>
              )}
            </View>

            <Text>{description}</Text>
          </View>
        </CardSection>
      </Card>
      {status ? (
        <View style={styles.RedeemButtonStyle}>
          <RedeeemButton onPress={OpenCamPress}>Redeem Now</RedeeemButton>
        </View>
      ) : (
        <View style={styles.RedeemInvalidButtonStyle}>
          <RedeeemButton onPress={OnInvalidPress}>Redeemed</RedeeemButton>
        </View>
      )}
    </View>
  );
};

export { SingleVoucher };
