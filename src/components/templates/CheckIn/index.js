import React from "react";

// import styles from "./styles";
import { StyleSheet, Dimensions } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { CheckInButton } from "../../molecules";

import styles from "./styles";
import { SignoutButton } from "../../../components/molecules";

import {
  ActivityIndicator,
  Icon as Icon2,
  FlatList,
  Image,
  ModalSelector,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from "@components/atoms";

import { Card, CardSection } from "@components/molecules";
const calenderEmpty = require("../../../assets/chilliBuddyCheckin/blackColor_background_empty.png");

import Icon from "react-native-vector-icons/FontAwesome";

function Grid({ data = [], onPressCheckIn }) {
  return (
    <View style={styles.viewPanel}>
      <FlatList
        numColumns={4}
        data={data}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            {item.count % 80 != 0 ? (
              item.id % 8 != 0 ? (
                <TouchableOpacity
                  style={styles.touchContainer}
                  onPress={() => onPressCheckIn(item)}
                >
                  <View style={styles.checkInBox}>
                    <Text style={styles.Days}>Day{item.value}</Text>
                    <View style={styles.checkInBoxWhite}></View>
                    {item.checked != true ? (
                      <View />
                    ) : (
                      <Image
                        source={require("../../../assets/chilliBuddyCheckin/checkin_part_star.png")}
                        style={styles.smallRedeemImageStarStyle}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              ) : item.checked != true ? (
                <TouchableOpacity
                  style={styles.touchContainer2}
                  onPress={() => onPressCheckIn()}
                >
                  <View style={styles.checkInBox2}>
                    <Text style={styles.Days}>Day{item.value}</Text>
                    <View style={styles.checkInBoxWhite2}>
                      {item.id === 24 || item.id === 32 ? (
                        <Image
                          source={require("../../../assets/chilliBuddyCheckin/checkin_questionMark.png")}
                          style={styles.redeemImageQuestionStyle}
                        />
                      ) : (
                        // <Image
                        //   source={require("../../../assets/chilliBuddyCheckin/checkin_part_star.png")}
                        //   style={styles.redeemImageStyle}
                        // />
                        <View />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.touchContainer2}
                  onPress={() => onPressCheckIn(item.id)}
                >
                  <View style={styles.checkInBoxRed}>
                    <Text style={styles.Days}>Day{item.value}</Text>
                    <View style={styles.checkInBoxWhite2Red}>
                      {item.id === 24 || item.id === 32 ? (
                        <Image
                          source={require("../../../assets/chilliBuddyCheckin/checkIn_part_letter.png")}
                          style={styles.redeemImageQuestionStyle}
                        />
                      ) : (
                        <Image
                          source={require("../../../assets/chilliBuddyCheckin/checkin_part_star.png")}
                          style={styles.redeemImageStyle}
                        />
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
      />
    </View>
  );
}

const CheckIn = ({ data, onPressCheckIn, submitLoading }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.CheckinContainer}>
        <View style={styles.CheckInTextContainer}>
          <Text style={styles.checkInTitle}>Check-In</Text>
          <Text style={styles.checkInSubTitle}>
            Stand the chance to win a random a random prize by checking in everyday!{" "}
          </Text>
          <Text style={styles.checkInSubRefreshing}>Refresh in:</Text>
        </View>
        <Grid data={data} onPressCheckIn={onPressCheckIn} />
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
};

export { CheckIn };
