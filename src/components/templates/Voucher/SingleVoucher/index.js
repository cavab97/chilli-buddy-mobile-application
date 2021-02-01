import React from "react";
import styles from "./styles";
import moment from "moment";

import { Dimensions, Linking } from "react-native";

import { View, Image, Text, ScrollView, FlatList, TouchableOpacity } from "@components/atoms";

import { Card, CardSection } from "@components/molecules";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
// const facebook = require("../../../../assets/icons/facebook.png");      //social media icon
// const instagram = require("../../../../assets/icons/instagram.png");
// const whatsapp = require("../../../../assets/icons/whatsapp.png");

const SingleVoucher = ({
  icon,
  tnc,
  viewHeight, //distance calculated from single merchant view
  find_dimensions = () => {},
  onRedeemPress,
  title,
  noImage,
  image,
  SalesPoint,
  merchantName,
  expiredDate,
  description,
  status,
  OpenCamPress,
  OnInvalidPress,
  startDate,
  endDate,
  readLoading,
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

  let cover;

  if (image === null) {
    cover = require("../../../../assets/chilliBuddyCheckin/noMerchant.png");
  } else {
    cover = { uri: image };
  }

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
          {/* <View style={titleBox}>
            <Text style={titleStyle}>{title}</Text>
          </View> */}

          <View style={styles.detailsBox}>
            {/* valid row */}
            <View style={styles.FirstRow}>
              {/* col */}
              <View style={styles.col}>
                <Text style={styles.textLabel}>Valid from</Text>
              </View>
              {/* col */}
              <View style={styles.col2}>
                <Text style={styles.col2Text}>
                  {startDate == "AnyTime" || endDate == "AnyTime"
                    ? "Valid anytime."
                    : moment(startDate).format("DD/MM/YYYY")}{" - "}
                  {moment(endDate).format("DD/MM/YYYY")}
                  {}
                </Text>
              </View>
            </View>

            {/* description row */}
            <View style={styles.FirstRow}>
              {/* col */}
              <View style={styles.col}>
                <Text style={styles.textLabel}>Description</Text>
              </View>
              {/* col */}
              <View style={styles.col2}>
                <Text style={styles.col2Text}>{description}</Text>
              </View>
            </View>

            {/* term and condition row */}
            <View style={styles.FirstRow}>
              {/* col */}
              <View style={styles.col}>
                <Text style={styles.textLabel}>Terms & Condition</Text>
              </View>
              {/* col */}
              <View style={styles.col2}>
                <Text style={styles.col2Text}>{tnc}</Text>
              </View>
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
            <Image source={noImage} style={styles.logoImage} resizeMode="cover" />
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
              <Text style={columnTwoText}>{!readLoading ? merchantName : " "}</Text>
              <Text style={styles.columnTwoSubText}>{SalesPoint} Discount</Text>
            </View>
            {
              /* status ? ( */
              <TouchableOpacity style={styles.qrContainer} onPress={OpenCamPress}>
                <Image
                  source={require("../../../../assets/chilliBuddyCheckin/QR_Scan_Icon.png")}
                  style={styles.qrLogo}
                />
              </TouchableOpacity>
              /* ) : (
              <TouchableOpacity style={styles.qrContainer} onPress={OnInvalidPress}>
                <Image
                  source={require("../../../../assets/chilliBuddyCheckin/QR_Scan_Icon.png")}
                  style={styles.qrLogo}
                />
              </TouchableOpacity>
            )} */

              /* <View>
              {status ? (
                <Text style={statusActiveText}> Active</Text>
              ) : (
                <Text style={statusDeactiveText}>Deactive</Text>
              )}
            </View> */
            }

            {/* <Text>{description}</Text> */}
          </View>
        </CardSection>
      </Card>
      {/* {status ? (
        <View style={styles.RedeemButtonStyle}>
          <RedeeemButton onPress={OpenCamPress}>Redeem Now</RedeeemButton>
        </View>
      ) : (
        <View style={styles.RedeemInvalidButtonStyle}>
          <RedeeemButton onPress={OnInvalidPress}>Redeemed</RedeeemButton>
        </View>
      )} */}
    </View>
  );
};

export { SingleVoucher };
