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
  return status ? (
    <TouchableOpacity onPress={onPress}>
      <Card style={styles.CardListSingleCard}>
        <CardSection style={styles.card}>
          <View style={styles.columnOne}>
            <Image
              source={require("../../../assets/chilliBuddyCheckin/merchant_logo_border.png")}
              style={styles.borderImage}
            />
            <View style={styles.merchantBorder}>
              <Image
                source={require("../../../assets/chilliBuddyCheckin/starbucks.png")}
                style={styles.merchantImage}
              />
            </View>

            <View style={styles.salesPoint}>
              <Text style={styles.salesPointText}>{salesPoint}</Text>
            </View>
          </View>
          {/* <Text style={styles.columnTwoText}>Provide by {merchantName}</Text> */}
          <View style={styles.columnTwo}>
            <View style={styles.columnThree}>
              <Text style={styles.columnTwoText}> {merchantName}</Text>
              <Text style={styles.termNconditionText}>
                {salesPoint} Discount * with Terms & Conditions
              </Text>
            </View>

            {/* <Text style={styles.textStyle}>{title}</Text>
            <Text>Valid until {expiredDate}</Text> */}
            {/* <Text
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
            </Text> */}
          </View>
        </CardSection>
      </Card>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={onPress} style={styles.bannerOutSide}>
      <View style={styles.usedBanner}>
        <Text style={styles.usedStyles}>Used</Text>
      </View>
      <Card style={styles.CardListSingleCard2}>
        <CardSection style={styles.card2}>
          <View style={styles.columnOne2}>
            <Image
              source={require("../../../assets/chilliBuddyCheckin/merchant_logo_border.png")}
              style={styles.borderImage2}
            />
            <View style={styles.merchantBorder2}>
              <Image
                source={require("../../../assets/chilliBuddyCheckin/starbucks.png")}
                style={styles.merchantImage2}
              />
            </View>

            <View style={styles.salesPoint2}>
              <Text style={styles.salesPointText}>{salesPoint}</Text>
            </View>
          </View>
          {/* <Text style={styles.columnTwoText}>Provide by {merchantName}</Text> */}
          <View style={styles.columnTwo}>
            <View style={styles.columnThree}>
              <Text style={styles.columnTwoText}> {merchantName}</Text>
              <Text style={styles.termNconditionText}>
                {salesPoint} Discount * with Terms & Conditions
              </Text>
            </View>

            {/* <Text style={styles.textStyle}>{title}</Text>
          <Text>Valid until {expiredDate}</Text> */}
            {/* <Text
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
          </Text> */}
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
      <Text style={styles.VoucherListTitle}>Voucher</Text>
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
