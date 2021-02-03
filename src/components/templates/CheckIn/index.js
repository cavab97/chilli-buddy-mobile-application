import React from "react";
import { TouchableHighlight, TouchableOpacity, TouchableNativeFeedback } from "react-native";

// import styles from "./styles";
import ContentLoader, { Rect } from "react-content-loader/native";
import moment from "moment";
import { StyleSheet, Dimensions } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { CheckInButton } from "../../molecules";

import styles from "./styles";
// import SkeletonContent from 'react-native-skeleton-content';
import { CheckInModal, CheckInModalError } from "@components/templates";

const widthDimensions = Dimensions.get("window").width;
const heightDimensions = Dimensions.get("window").height;
const { height } = Dimensions.get("window");

import {
  ActivityIndicator,
  Icon as Icon2,
  FlatList,
  Image,
  ModalSelector,
  View,
  Text,
  ScrollView,
} from "@components/atoms";
console.log("widthDimensions" + widthDimensions);
console.log("heightDimensions" + widthDimensions);

import { Card, CardSection } from "@components/molecules";
const calenderEmpty = require("../../../assets/chilliBuddyCheckin/blackColor_background_empty.png");

import Icon from "react-native-vector-icons/FontAwesome";
const sadHeader = "Better luck \n next Time!";
const happyHeader = "Congratulations!";
const happyDesciption = "You have won a";

function Grid({
  data,
  onPressCheckIn,
  submitLoading,
  checkInRecordLength,
  voucher,
  checkInRecordLengths,
  twoOneDays,
  rewardOnceThanOneOption,
}) {
  const img = require("../../../assets/chilliBuddyCheckin/checkin_part_star.png");
  return (
    <View style={styles.viewPanel}>
      <FlatList
        numColumns={4}
        data={data}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            {item.count % 80 != 0 ? (
              item.id % 8 != 0 ? (
                <TouchableNativeFeedback
                  activeOpacity={1}
                  style={styles.touchContainer}
                  onPress={() => onPressCheckIn(item)}
                  disabled={
                    submitLoading
                      ? true
                      : ((item.checked == false || item.checked) &&
                          checkInRecordLength !== item.id) ||
                        voucher
                  }
                >
                  {/* <TouchableOpacity     style={styles.touchContainer}>
                    <Text>hello</Text>
                  </TouchableOpacity> */}
                  <View
                    style={
                      rewardOnceThanOneOption && voucher && item.id > 24
                        ? styles.Checked24
                        : styles.checkInBox
                    }
                  >
                    <Text style={styles.Days}>Day{item.value}</Text>
                    <View
                      style={
                        rewardOnceThanOneOption && voucher && item.id > 24
                          ? styles.checkInBoxWhite24
                          : styles.checkInBoxWhite
                      }
                    ></View>
                    {item.submitLoading == true ? (
                      <ActivityIndicator
                        size="small"
                        color="black"
                        style={styles.smallRedeemImageStarStyle}
                      />
                    ) : item.checked != true ? (
                      <Image
                        source={require("../../../assets/chilliBuddyCheckin/starEmpty.png")}
                        transition={false}
                        style={styles.smallRedeemImageStarStyle}
                      />
                    ) : (
                      <Image
                        source={img}
                        transition={false}
                        style={styles.smallRedeemImageStarStyle}
                      />
                    )}
                  </View>
                </TouchableNativeFeedback>
              ) : item.checked != true ? (
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.touchContainer2}
                  onPress={() => onPressCheckIn(item)}
                  disabled={
                    submitLoading
                      ? true
                      : ((item.checked == false || item.checked) &&
                          checkInRecordLength !== item.id) ||
                        voucher
                  }
                >
                  <View
                    style={
                      rewardOnceThanOneOption && voucher && item.id > 24
                        ? styles.checkInBox224
                        : styles.checkInBox2
                    }
                  >
                    <Text style={styles.Days}>Day{item.value}</Text>
                    <View
                      style={
                        rewardOnceThanOneOption && voucher && item.id > 24
                          ? styles.checkInBoxWhite224
                          : styles.checkInBoxWhite2
                      }
                    >
                      {item.submitLoading == true ? (
                        <ActivityIndicator
                          size="large"
                          color="black"
                          style={styles.redeemImageQuestionStyle}
                        />
                      ) : item.id === 24 || item.id === 32 ? (
                        <Image
                          source={require("../../../assets/chilliBuddyCheckin/checkin_questionMark.png")}
                          transition={false}
                          style={styles.redeemImageQuestionStyle}
                        />
                      ) : (
                        <Image
                          source={require("../../../assets/chilliBuddyCheckin/starEmpty.png")}
                          transition={false}
                          style={styles.redeemImageQuestionStyle}
                        />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.touchContainer2}
                  onPress={() => onPressCheckIn(item)}
                  disabled={
                    !voucher
                      ? (item.checked == false || item.checked) && checkInRecordLength !== item.id
                      : checkInRecordLengths == 28
                      ? voucher && item.id != 32
                      : checkInRecordLengths == 21
                      ? voucher && item.id != 24
                      : (item.checked == false || item.checked) && checkInRecordLength !== item.id
                  }
                >
                  <View style={styles.checkInBoxRed}>
                    <Text style={styles.Days}>Day{item.value}</Text>
                    <View style={styles.checkInBoxWhite2Red}>
                      {item.submitLoading == true ? (
                        <ActivityIndicator
                          size="large"
                          color="black"
                          style={styles.redeemImageQuestionStyle}
                        />
                      ) : item.id === 24 || item.id === 32 ? (
                        <Image
                          source={require("../../../assets/chilliBuddyCheckin/checkIn_part_letter.png")}
                          transition={false}
                          style={styles.redeemImageQuestionStyle}
                        />
                      ) : (
                        <Image source={img} transition={false} style={styles.redeemImageStyle} />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              )
            ) : (
              <View />
            )}
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 25 }}
      />
    </View>
  );
}

const CheckIn = ({
  data,
  onPressCheckIn,
  submitLoading,
  happy,
  isVisible,
  rewardOnceThanOneOption,
  readLoading,
  checkInRecordLength,
  onCLose,
  message,
  checkInRecordLengths,
  messageSuccess,
  catchCondition,
  checkInData,
  onPressCancel,
  time,
  onPressRedeemNow,
  redeemed,
  readInitialLoading,
}) => {
  // console.log(redeemed);
  if (readInitialLoading) {
    return (
      <View>
        <View style={styles.container}>
          <ContentLoader speed={1} width={"100%"} height={height} backgroundColor="#d9d9d9">
            <Rect x="0" y="0" rx="5" ry="5" width="40%" height="40" />
            <Rect x="0" y="50" rx="5" ry="5" width="100%" height="20" />
            <Rect x="0" y="75" rx="5" ry="5" width="100%" height="20" />
            <Rect x="0" y="115" rx="5" ry="5" width="35%" height="20" />
            {/*square*/}
            <Rect x="0" y="145" rx="5" ry="5" width="20%" height="70" />
            <Rect x="70" y="145" rx="5" ry="5" width="20%" height="70" />
            <Rect x="140" y="145" rx="5" ry="5" width="20%" height="70" />
            <Rect x="210" y="145" rx="5" ry="5" width="35%" height="145" />

            <Rect x="0" y="220" rx="5" ry="5" width="20%" height="70" />
            <Rect x="70" y="220" rx="5" ry="5" width="20%" height="70" />
            <Rect x="140" y="220" rx="5" ry="5" width="20%" height="70" />

            <Rect x="0" y="300" rx="5" ry="5" width="20%" height="70" />
            <Rect x="70" y="300" rx="5" ry="5" width="20%" height="70" />
            <Rect x="140" y="300" rx="5" ry="5" width="20%" height="70" />
            <Rect x="210" y="300" rx="5" ry="5" width="35%" height="145" />

            <Rect x="0" y="375" rx="5" ry="5" width="20%" height="70" />
            <Rect x="70" y="375" rx="5" ry="5" width="20%" height="70" />
            <Rect x="140" y="375" rx="5" ry="5" width="20%" height="70" />

            <Rect x="0" y="455" rx="5" ry="5" width="20%" height="70" />
            <Rect x="70" y="455" rx="5" ry="5" width="20%" height="70" />
            <Rect x="140" y="455" rx="5" ry="5" width="20%" height="70" />
            <Rect x="210" y="455" rx="5" ry="5" width="35%" height="145" />

            <Rect x="0" y="530" rx="5" ry="5" width="20%" height="70" />
            <Rect x="70" y="530" rx="5" ry="5" width="20%" height="70" />
            <Rect x="140" y="530" rx="5" ry="5" width="20%" height="70" />

            <Rect x="0" y="610" rx="5" ry="5" width="20%" height="70" />
            <Rect x="70" y="610" rx="5" ry="5" width="20%" height="70" />
            <Rect x="140" y="610" rx="5" ry="5" width="20%" height="70" />
            <Rect x="210" y="610" rx="5" ry="5" width="35%" height="145" />

            <Rect x="0" y="685" rx="5" ry="5" width="20%" height="70" />
            <Rect x="70" y="685" rx="5" ry="5" width="20%" height="70" />
            <Rect x="140" y="685" rx="5" ry="5" width="20%" height="70" />
          </ContentLoader>
        </View>
      </View>
    );
  } else {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        {happy == true ? (
          rewardOnceThanOneOption == false ? (
            <CheckInModal
              Header={happyHeader}
              happy={happy}
              isVisible={isVisible}
              onClose={onCLose}
              message={messageSuccess}
              rewardOnceThanOneOption={rewardOnceThanOneOption}
              onPressCancel={onPressCancel}
              timeUps={!redeemed ? catchCondition : redeemed}
              readLoading={readLoading}
              onPressRedeemNow={onPressRedeemNow}
              redeemed={redeemed}
              submitLoading={submitLoading}
              checkInRecordLengths={checkInRecordLengths}
            />
          ) : (
            <CheckInModal
              Header={happyHeader}
              happyDesciption={happyDesciption}
              happy={happy}
              isVisible={isVisible}
              onClose={onCLose}
              rewardOnceThanOneOption={rewardOnceThanOneOption}
              message={messageSuccess}
              onPressCancel={onPressCancel}
              timeUps={!redeemed ? catchCondition : redeemed || catchCondition}
              readLoading={readLoading}
              onPressRedeemNow={onPressRedeemNow}
              redeemed={redeemed}
              submitLoading={submitLoading}
              checkInRecordLengths={checkInRecordLengths}
            />
          )
        ) : (
          <CheckInModalError
            Header={message == null ? sadHeader : message}
            isVisible={isVisible}
            onClose={onCLose}
            message={message}
            readLoading={readLoading}
            submitLoading={submitLoading}
          />
        )}
        {/* {(console.log("catchCondition"), console.log(catchCondition))} */}

        <View style={styles.CheckinContainer}>
          <View style={styles.CheckInTextContainer}>
            <Text style={styles.checkInTitle}>Check-In</Text>
            <Text style={styles.checkInSubTitle}>
              Stand the chance to win a random prize by checking in everyday!
            </Text>
            <Text style={styles.checkInSubRefreshing}>Refresh in: {time}</Text>
          </View>
          <Grid
            data={data}
            onPressCheckIn={onPressCheckIn}
            submitLoading={submitLoading}
            checkInRecordLength={checkInRecordLength}
            voucher={happy}
            checkInRecordLengths={checkInRecordLengths}
            twoOneDays={catchCondition}
            rewardOnceThanOneOption={rewardOnceThanOneOption}
          />
          {/* <View style={styles.buttonStyles}>
            <SignoutButton
              style={styles.checkinButton}
              onPress={onPressCheckIn}
              loading={submitLoading}
            >
              Check in
            </SignoutButton>
          </View> */}
        </View>
      </ScrollView>
    );
  }
};

export { CheckIn };
