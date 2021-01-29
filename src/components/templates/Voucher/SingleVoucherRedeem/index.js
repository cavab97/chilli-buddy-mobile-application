import { View } from "@components/atoms/View";
import React from "react";
import styles from "./styles";
import { Text } from "../../../atoms";
import { StyleSheet, Button } from "react-native";

import { BarCodeScanner, Permissions } from "expo-barcode-scanner";
import { Camera } from "expo-camera";

const SingleVoucherRedeem = ({
  hasPermission,
  onBarCodeRead,
  handleBarCodeScanned,
  scanned,
  handleSetScanned,
}) => {
  const { container, BarCodeScannerStyle, containerQR } = styles;

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    // <View style={container}>
    //   <BarCodeScanner
    //     onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
    //     style={BarCodeScannerStyle}
    //   >
    //     <View style={styles.layerTop} />
    //     <View style={styles.layerCenter}>
    //       <View style={styles.layerLeft} />
    //       <View style={styles.focused} />
    //       <View style={styles.layerRight} />
    //     </View>
    //     <View style={styles.layerBottom} />
    //     {scanned && <Button title={"Tap to Scan Again"} onPress={() => handleSetScanned(false)} />}
    //   </BarCodeScanner>
    // </View>
    <Camera
      onBarCodeScanned={onBarCodeRead}
      barCodeScannerSettings={{
        barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
      }}
      style={[StyleSheet.absoluteFill]}
    >
      <View style={styles.layerTop} />
      <View style={styles.layerCenter}>
        <View style={styles.layerLeft} />
        <View style={styles.focused} />
        <View style={styles.layerRight} />
      </View>
      <View style={styles.layerBottom} />
      {scanned && <Button title={"Tap to Scan Again"} onPress={() => handleSetScanned(false)} />}
    </Camera>
  );
};

export { SingleVoucherRedeem };
