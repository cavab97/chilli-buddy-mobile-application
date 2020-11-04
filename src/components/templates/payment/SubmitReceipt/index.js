import React from "react";
import styles from "./styles";
import { Dimensions } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import Icon from "react-native-vector-icons/Ionicons";

import {
    ActivityIndicator,
    Button,
    Overlay,
    ScrollView,
    Text,
    View
} from "../../../atoms";

import {
    ImageInfo,
} from "../../../molecules";


const SubmitReceipt = ({
    uri,
    retakeTitle,
    doneTitle,
    onRetakePress,
    onDonePress,
    uploadImageProgress,
    progressVisible,
    errorMessage,
    successfulMessage,
    errorHeader,
    errorRedirectMessage,
    successHeader,
    triggerLoading,
    loadingMessage,
    uploadLoadingMessage,
    submitLoading,
    messageSubmit,
    uploadLoading,
    categoryCheck
    
 })=> {
    const barWidth = Dimensions.get('screen').width - 40;
     return(     
        <View style={styles.container}> 

            <Overlay
                isVisible={progressVisible}
                width="100%"
                overlayStyle={styles.overlayContainer}
            >
                {errorMessage ? (
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
                            {errorMessage} {errorRedirectMessage}
                        </Text>
                    </View>
                ) : (
                    (uploadLoading || submitLoading) ? (
                        <View style={styles.contentContainer}>
                            <ActivityIndicator
                                size="large"
                                color="white"
                            />
                            { categoryCheck !== "CheckIn" ? 
                            <Text style={styles.messageText}>
                                Submitting your transactions
                            </Text> :
                            <Text style={styles.messageText}>
                            Submitting your Check In
                        </Text>
                        }
                        </View>
                    ) : (
                        messageSubmit ? (
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
                                    {messageSubmit} 
                                </Text>
                            </View>
                        ) : (
                            triggerLoading ? (
                                <View style={styles.contentContainer}>
                                    <Text style={styles.messageText}>
                                        {uploadLoadingMessage} 
                                    </Text>
                                </View>
                            ) : (
                                successfulMessage ? (
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
                                            {successfulMessage} 
                                        </Text>
                                    </View>
                                ) : (
                                    <View style={styles.contentContainer}>
                                        <ProgressCircle
                                            percent={uploadImageProgress}
                                            radius={50}
                                            borderWidth={8}
                                            color="#fff"
                                            shadowColor="#fff1de"
                                            bgColor="#f18a22"
                                        >
                                            <Text style={styles.percentText}>
                                                {uploadImageProgress}%
                                            </Text>
                                        </ProgressCircle>
                                        <Text style={styles.messageText}>
                                            {loadingMessage} 
                                        </Text>
                                    </View>
                                )
                            )
                        )
                    )
                )}
            </Overlay>
            <ScrollView showsVerticalScrollIndicator={false}>
            <ImageInfo
                banner={uri}
                imageContainer={styles.overlayImage}
                imageStyle={styles.image}
            />
            {/* progressVisible &&
                <ProgressBarAnimated
                    width={barWidth}
                    value={uploadImageProgress}
                    backgroundColorOnComplete="#f18a22"
                /> */}
            <Button
                title={retakeTitle}
                buttonStyle={styles.button}
                titleStyle={styles.buttonText}
                onPress={onRetakePress}
            />
            <Button
                title={doneTitle}
                buttonStyle={styles.completeButton}
                titleStyle={styles.completeButtonText}
                onPress={onDonePress}
                loading={uploadLoading}
                disabled={uploadLoading}
            />
            </ScrollView>
        </View>
     );
 };
 
 export { SubmitReceipt };