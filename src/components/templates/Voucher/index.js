import React from "react";
import styles from "./styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors, Mixins } from "../../../settings/styles/theme";

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

function Voucher({ title, salesPoint, expiredDate, onPress, merchantName, columnTwoText, status }) {
  const {
    image,
    card,
    columnOneText,
    columnOne,
    columnTwo,
    columnThree,
    columnOneInvalid,
  } = styles;

  return status ? (
    <TouchableOpacity onPress={onPress}>
      <Card style={{ width: "95%" }}>
        <CardSection style={card}>
          <View style={columnOne}>
            <Image
              source={require("../../../assets/gogogain/loginIcon.png")}
              style={styles.logoImage}
            />
          </View>
          <View style={columnTwo}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>{title}</Text>
            <Text>Valid until {expiredDate}</Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                fontFamily: "RobotoRegular",
                marginLeft: 0,
                //marginRight: 10.5,
                marginTop: 3,
                color: Colors.SUCCESS,
                marginBottom: 5,
              }}
            >
              Active
            </Text>

            <View style={columnThree}>
              <Text style={columnTwoText}>Provide by {merchantName}</Text>
            </View>
          </View>
        </CardSection>
      </Card>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={onPress}>
      <Card style={{ width: "95%" }}>
        <CardSection style={card}>
          <View style={columnOneInvalid}>
            <Image
              source={require("../../../assets/gogogain/loginIcon.png")}
              style={styles.logoImage}
            />
          </View>
          <View style={columnTwo}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>{title}</Text>
            <Text>Valid until {expiredDate}</Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                fontFamily: "RobotoRegular",
                marginLeft: 0,
                //marginRight: 10.5,
                marginTop: 3,
                color: Colors.PRIMARY,
                marginBottom: 5,
              }}
            >
              Deactive
            </Text>

            <View style={columnThree}>
              <Text style={columnTwoText}>Provide by {merchantName}</Text>
            </View>
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
            merchantName={item.MerchantName}
            status={item.status}
          />
        )}
        keyExtractor={(item) => item.id}
        onRefresh={handleRefresh}
        refreshing={readLoading}
        ListFooterComponent={renderFooter({ empty: dataSource.length === 0 ? true : false })}
        style={styles.flatList}
      />
    </View>
  );
};

export { VoucherList };
