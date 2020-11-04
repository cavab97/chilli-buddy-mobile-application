import React from "react";
import ProgressCircle from 'react-native-progress-circle';
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";

import {
    Button,
    Overlay, 
    Text,
    View
} from "../../atoms";  

import { 
    IconButton,
    ImageInfo
} from "../../molecules";

import { Colors } from "../../../settings/styles";

import { Camera } from 'expo-camera';

const CameraProfile = ({
    hasPermission,
    cameraType,
    cameraConfig,
    onPress,
    uri,
    progressVisible,
    onRetakePress,
    uploadLoading,
    uploadProgress,
    loadingMessage,
    errorHeader,
    errorRedirectMessage,
    successHeader,
    successMessage,
    successVisible,
    errorVisible,
    error,
    message,
    onUploadPress,
    triggerLoading,
    selectImage
})=> {
 
    if (hasPermission === null) {
        return <View />;
    } else if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    } else if (uploadLoading === true) {
        return (
            <Overlay
                isVisible={uploadLoading}
                width="100%"
                height="100%"
                overlayBackgroundColor={Colors.PRIMARY}
                overlayStyle={styles.containerOverlay}
            >
                <View style={styles.contentContainer}>
                    <ProgressCircle
                        percent={uploadProgress}
                        radius={50}
                        borderWidth={8}
                        color="#fff"
                        shadowColor="#fff1de"
                        bgColor="#f18a22"
                    >
                        <Text style={styles.percentText}>
                            {uploadProgress}%
                        </Text>
                    </ProgressCircle>
                    <Text style={styles.messageText}>
                        {loadingMessage} 
                    </Text>
                </View>
            </Overlay>
        )
    } else if (error === true) {
        return (
            <Overlay
                isVisible={errorVisible}
                width="100%"
                height="100%"
                overlayBackgroundColor={Colors.PRIMARY}
                overlayStyle={styles.containerOverlay}
            >
                <View style={styles.contentContainer}>
                    <Icon 
                        name="ios-close-circle-outline" 
                        color="white" 
                        size={70} 
                    />
                    <Text style={styles.subjectText}>
                        {errorHeader}
                    </Text>
                    <Text style={styles.messageText}>
                        {errorRedirectMessage}
                    </Text>
                </View>
            </Overlay>
        )
    } else if (message !== null) {
        return (
            <Overlay
                isVisible={successVisible}
                width="100%"
                height="100%"
                overlayBackgroundColor={Colors.PRIMARY}
                overlayStyle={styles.containerOverlay}
            >
                <View style={styles.contentContainer}>
                    <Icon 
                        name="ios-checkmark-circle-outline" 
                        color="white" 
                        size={70} 
                    />
                    <Text style={styles.subjectText}>
                        {successHeader}
                    </Text>
                    <Text style={styles.messageText}>
                        {successMessage}
                    </Text>
                </View>
            </Overlay>
        )
    } else if (uri !== null) {
        return (
            <Overlay
                isVisible={progressVisible}
                width="100%"
                height="100%"
                overlayStyle={styles.containerOverlay}
            >
                <View>
                    <ImageInfo
                        banner={uri}
                        imageContainer={styles.overlayImage}
                        imageStyle={styles.imageOverlay}
                    />
                    <Button
                        title="Retake"
                        buttonStyle={styles.button}
                        titleStyle={styles.buttonText}
                        onPress={onRetakePress}
                    />
                    <Button
                        title="Upload Profile Image"
                        buttonStyle={styles.completeButton}
                        titleStyle={styles.completeButtonText}
                        onPress={onUploadPress}
                    />
                </View>
            </Overlay>
        )
    } else {
        return (
            <View style={styles.container}>
                <Camera style={styles.container} type={cameraType} ref={cameraConfig}>
                    <View style={styles.cameraContainer}>
                        <View styles={{flexDirection: 'row',justifyContent: 'center',}}>
                            <IconButton
                                iconContainer={styles.iconContainer}
                                iconName='ios-camera'
                                iconSize={48}
                                iconColor='white'
                                onPress={onPress}
                            />
                            <View style={styles.imagePickerIcon}>
                                <IconButton
                                    iconContainer={styles.iconContainer}
                                    iconName='ios-folder-open'
                                    iconSize={38}
                                    iconColor='white'
                                    onPress={selectImage}
                                />
                            </View>
                        </View>
                    </View>   
                </Camera>
            </View>
    );
    }
};

export { CameraProfile };