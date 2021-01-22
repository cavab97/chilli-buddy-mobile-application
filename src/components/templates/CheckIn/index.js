import React from "react";
<<<<<<< HEAD
// import styles from "./styles";
import { StyleSheet, Dimensions } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { CheckInButton } from "../../molecules";
=======
import styles from "./styles";
>>>>>>> ffb513a687754a08769b93aa240820e8ba9031b4

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

import Icon from "react-native-vector-icons/FontAwesome";

<<<<<<< HEAD
const width = Dimensions.get("window").width / 7;
const height = Dimensions.get("window").height / 14;
const styles = StyleSheet.create({
  itemContainer: {
    width: width,
    height: height,
  },
  item: {
    flex: 1,
    margin: 3,
    backgroundColor: "lightblue",
  },
  checkInButtonStyle: {
    alignSelf: "center",
    padding: Platform.OS === "ios" ? 20 : 20,
    marginBottom: Platform.OS === "ios" ? 30 : 30,
    // position: "absolute",
    top: -160,
  },
});

function Grid({ data = [], numColumns }) {
=======
// function Voucher({ title, salesPoint, expiredDate, onPress }) {
//   const { image, card, columnOneText, columnOne, columnTwo } = styles;

//   return (
//     <TouchableOpacity onPress={onPress}>
//       <Card style={{ width: "95%" }}>
//         <CardSection style={card}>
//           <View style={columnOne}>
//             <Text style={columnOneText}>{salesPoint}</Text>
//           </View>
//           <View style={columnTwo}>
//             <Text style={{ fontWeight: "bold", fontSize: 18 }}>{title}</Text>
//             <Text>Valid until {expiredDate}</Text>
//           </View>
//         </CardSection>
//       </Card>
//     </TouchableOpacity>
//   );
// }

function Grid({ data }) {
>>>>>>> ffb513a687754a08769b93aa240820e8ba9031b4
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.item}>{item.value}</Text>
        </View>
      )}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
    />
  );
}

<<<<<<< HEAD
const CheckIn = ({ data, submitLoading, numColumns, dataSource, onClickCheckIn }) => {
  return (
    <View style={{ height: "100%" }}>
      <Grid numColumns={numColumns} submitLoading={submitLoading} data={dataSource} />

      <View style={styles.checkInButtonStyle}>
        <CheckInButton onPress={onClickCheckIn} loading={false}>
          Check in
        </CheckInButton>
      </View>

      {/* <SignoutButton onPress={onSignoutPress} loading={logOutLoading}>
          Sign Out
         </SignoutButton> */}
    </View>
  );
=======
const CheckIn = ({ data }) => {
  return <Grid data={data} />;
>>>>>>> ffb513a687754a08769b93aa240820e8ba9031b4
};

export { CheckIn };
