import React from "react";
import styles from "./styles";

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

const CheckIn = ({ data }) => {
  return <Grid data={data} />;
};

export { CheckIn };
