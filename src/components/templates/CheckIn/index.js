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
} from "@components/atoms";

import { Card, CardSection } from "@components/molecules";
const calenderEmpty = require("../../../assets/chilliBuddyCheckin/blackColor_background_empty.png");

import Icon from "react-native-vector-icons/FontAwesome";

function Grid({ data = [], numColumns, data4 }) {
  return (
    <FlatList
      numColumns={3}
      data={data}
      renderItem={({ item, index }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.dayStyle}>{item.value}</Text>
          <TouchableOpacity>
            <Image
              source={require("../../../assets/chilliBuddyCheckin/small_blackColor_background_empty.png")}
              style={styles.logoImage}
            />
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

const CheckIn = ({ data, onPressCheckIn, submitLoading, data4 }) => {
  return (
    <View style={styles.CheckinContainer}>
      <View>
        <Text style={{ fontSize: 28, fontWeight: "bold" }}>Check-In</Text>
        <Text>Stand the chance to win a random a random prize by checking ion ev </Text>
      </View>
      <Grid data={data} data4={data4} />
      <View style={styles.buttonStyles}>
        <SignoutButton
          style={styles.checkinButton}
          onPress={onPressCheckIn}
          loading={submitLoading}
        >
          Check in
        </SignoutButton>
      </View> 
    </View>
  );
};

export { CheckIn };
