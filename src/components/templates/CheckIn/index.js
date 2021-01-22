import React from "react";
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
