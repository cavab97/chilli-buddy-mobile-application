import React from "react";
import styles from "./styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

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

function Voucher({ title, salesPoint, expiredDate, onPress }) {
  const { image, card, columnOneText, columnOne, columnTwo } = styles;

  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={{ width: "95%" }}>
        <CardSection style={card}>
          <View style={columnOne}>
            <Text style={columnOneText}>{salesPoint}</Text>
          </View>
          <View style={columnTwo}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>{title}</Text>
            <Text>Valid until {expiredDate}</Text>
          </View>
        </CardSection>
      </Card>
    </TouchableOpacity>
  );
}

const VoucherList = ({
  dataSource,
  handleRefresh,
  renderFooter,
  onVoucherPressed,
  readLoading,
  state,
}) => {
  return (
    <View style={{ height: "100%" }}>
      <FlatList
        data={dataSource}
        renderItem={({ item, index }) => (
          <Voucher
            onPress={() => onVoucherPressed(item)}
            title={item.title}
            salesPoint={item.salesPoint}
            expiredDate={item.expiredDate}
          />
        )}
        keyExtractor={(item) => item.id}
        onRefresh={handleRefresh}
        refreshing={state.refreshing}
        ListFooterComponent={renderFooter({ empty: dataSource.length === 0 ? true : false })}
        style={styles.flatList}
      />
    </View>
  );
};

export { VoucherList };
