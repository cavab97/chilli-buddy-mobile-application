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

function Grid({ data = [], numColumns }) {
  return (
    <FlatList
      numColumns={7}
      data={data}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.item}>{item.value}</Text>
          <Image
            source={require("../../../assets/chilliBuddyCheckin/blackColor_background_empty.png")}
            style={styles.logoImage}
          />
        </View>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

const CheckIn = ({ data, onPressCheckIn, submitLoading }) => {
  return (
    <View>
      <Grid data={data} />
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
