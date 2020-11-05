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

const announce = (focused) => (
    <CustomIcon name="mainmenu" color={focused.focused ? Colors.SECONDARY : Colors.WHITE} size={20} />
);

const merchant = () => (
    <CustomIcon name="merchant" color={Colors.PRIMARY} size={20} />
);

const profile = (focused) => (
    <CustomIcon name="userprofile" color={focused.focused ? Colors.SECONDARY : Colors.WHITE} size={20} />
);

const promo = (focused) => (
    <View style={{ alignItems: "center", justifyContent: "center",  width: 72, height: 72, borderColor: focused.focused ? Colors.SECONDARY : Colors.WHITE, backgroundColor: Colors.PRIMARY, borderRadius: 36, borderWidth: 3, top: -30, position: "absolute",}}><CustomIcon name="promo" style={styles.promoButton} color={focused.focused ? Colors.SECONDARY : Colors.WHITE} size={50} /></View>
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
