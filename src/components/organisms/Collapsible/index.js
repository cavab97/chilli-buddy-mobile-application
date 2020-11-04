import React, { useRef } from "react";
import { TouchableWithoutFeedBack } from "@components/atoms";
import { Animated, Text, View, StyleSheet, Button } from "react-native";
import { ScrollView } from "@components/atoms/index";

const Collapsible = ({
    onPress,
    isOpen = false,
    title,
    titleContainerStyle,
    titleStyle,
    rightIcon = null,
    animeContainerStyle,
    animeContent = null,
    animeTime = 1000,
    animeTo,
    defaultHeight = 150,
}) => {
    // set default value to 0
    const animControl = useRef(new Animated.Value(0)).current;

    const collapsion = (isOpen) => {
        if(isOpen){
            Animated.timing(animControl, {
                toValue: 0,
                duration: Platform.OS === 'ios' ? 1000 : animeTime
            }).start();
        }else{
            Animated.timing(animControl, {
                toValue: animeTo === 0 ? defaultHeight : animeTo,
                duration: Platform.OS === 'ios' ? 1000 : animeTime
            }).start();
        }
    }

  return (
    <View style={styles.container}>
        <TouchableWithoutFeedBack
            onPress={() => {
                onPress();
                collapsion(isOpen);
            }}
        >
            <View style={titleContainerStyle}>
                <Text style={titleStyle}>{title}</Text>
                { rightIcon && 
                    rightIcon
                }
            </View>

        </TouchableWithoutFeedBack>


      <Animated.View
        style={[
            animeContainerStyle,
            {
                width: "100%",
                //height: isOpen === true ? "100%" : animControl,
                height: animControl,
                //flex: 1,
            }
        ]}
      >
        {animeContent}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export { Collapsible };