import React from "react";
import styles from "./styles";

import {
    Text,
    View
} from "../../../atoms";

import { IconButton } from "../../../molecules";

import { Camera } from 'expo-camera';

const PaymentCameraReceipt = ({
    hasPermission,
    cameraType,
    cameraConfig,
    onPress,
    changeCamera,
    takePictureLoading,
    setCameraReady,
    ratio,
    imagePadding
})=> {
 
    if (hasPermission === null) {
        return <View />;
    } else if (hasPermission === false) {
        return <Text style={styles.textFontFamily}>No access to camera</Text>;
    } else {
        return (
            <View style={styles.container}>
                <Camera style={[styles.cameraPreviewContainer,{marginTop: imagePadding, marginBottom: imagePadding}]} type={cameraType} ref={cameraConfig} autoFocus={"on"} focusDepth={1} ratio={ratio} onCameraReady={setCameraReady}>
                    <View style={styles.cameraContainer}>
                        <IconButton
                            iconContainer={styles.iconContainer}
                            iconName='ios-camera'
                            iconSize={48}
                            iconColor='white'
                            onPress={onPress}
                            loading={takePictureLoading}
                        />
                        <IconButton
                            iconContainer={styles.rotateIconContainer}
                            iconName='md-sync'
                            iconSize={40}
                            iconColor='white'
                            onPress={changeCamera}
                            //loading={takePictureLoading}
                        />
                    </View>
                </Camera>
            </View>
    );
    }
};

export { PaymentCameraReceipt };