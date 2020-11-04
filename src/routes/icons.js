import React from "react";
import { CustomIcon } from "../components/atoms";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../settings/styles/theme";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import styles from "./styles";
import { View } from "@components/atoms/View";

const iconProfile = () => (
    <Icon name="md-people" color="#c83528" size={24} />
);

const announce = () => (
    <CustomIcon name="announce" color={Colors.PRIMARY} size={20} />
);

const merchant = () => (
    <CustomIcon name="merchant" color={Colors.PRIMARY} size={20} />
);

const profile = () => (
    <CustomIcon name="user" color={Colors.PRIMARY} size={20} />
);

const promo = () => (
    <View style={{width:48, height:48}}><FontAwesome5 name="fire" style={styles.promoButton} color={Colors.PRIMARY} size={60} /></View>
);

const award = () => (
    <CustomIcon name="award" color={Colors.PRIMARY} size={20} />
);

export { 
    iconProfile, 
    announce, 
    merchant, 
    profile, 
    award,
    promo 
};
