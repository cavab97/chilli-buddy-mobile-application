import React from "react";
import { Platform, Dimensions, Animated } from "react-native";

import { Text, View, Modal, TouchableOpacity } from "../../atoms";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import styles from "./styles";

const SpinningWheel = ({
  spinningWheelModal,
  randomCategory,
  spinStatus,
  onPressRandomCategory,
  wheelRotation,
  onCloseSpinningWheelModal,
}) => {
  const resultImage = require("../../../assets/categoryResult.png");
  const wheelImage = require("../../../assets/categoryWheel.png");
  const rotation = wheelRotation.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });
  return (
    <Modal transparent={true} visible={spinningWheelModal}>
      <View style={styles.modelBackground}>
        <View style={styles.containerForSpinningWheel}>
          {randomCategory != null && spinStatus === false ? (
            <View>
              <View style={{ alignItems: "center", paddingTop: 30 }}>
                <Text style={styles.spinningTitle2}>
                  {" "}
                  We have a great choice of Restaurants near you{" "}
                </Text>
                <Text style={styles.subTitle}> Let's go! </Text>
              </View>
              <View style={styles.spinningWheelImage}>
                <Animated.View style={{ opacity: fadeResult }}>
                  <TouchableOpacity onPress={() => onPressRandomCategory(randomCategory)}>
                    <Animated.Image style={{ width, height: width }} source={resultImage} />
                    <View style={styles.categoryTextHolder}>
                      <CustomIcon
                        name={randomCategory.icon}
                        size={30}
                        style={{ color: "#FFFFFF" }}
                      />
                      <Text style={styles.categoryText}> {randomCategory.title} </Text>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </View>
          ) : (
            <View>
              <View style={{ alignItems: "center", paddingTop: 30 }}>
                <Text style={styles.spinningTitle}> Don't know </Text>
                <Text style={styles.subTitle}> WHAT TO EAT? </Text>
              </View>
              <View style={styles.spinningWheelImage}>
                <View>
                  <Animated.View style={{ opacity: fadeWheel }}>
                    <Animated.Image
                      style={{ width, height: width, transform: [{ rotate: rotation }] }}
                      source={wheelImage}
                    />
                  </Animated.View>
                </View>
              </View>
            </View>
          )}
          <View>
            <TouchableOpacity
              style={spinStatus ? styles.categoriesButton : styles.categoriesButton}
              onPress={spinningWheel}
              disabled={spinStatus}
            >
              <Text style={styles.buttonText}>
                {" "}
                {spinStatus ? "SPINNING..." : randomCategory ? "SPIN AGAIN" : "START"}{" "}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.closeWheelModal} onPress={onCloseSpinningWheelModal}>
            <MaterialCommunityIcons name="close-circle-outline" size={40} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export { SpinningWheel };
