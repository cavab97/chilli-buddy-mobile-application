import React from "react";
import { Platform, Dimensions, Animated } from "react-native";

import { Text, View, Modal, TouchableOpacity, Image, ScrollView } from "../../atoms";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { CustomIcon } from "@components/atoms/index";

import styles from "./styles";

const SpinningWheel = ({
  spinningWheelModal,
  randomCategory,
  spinStatus,
  onPressRandomCategory,
  wheelRotation,
  onCloseSpinningWheelModal,
  fadeWheel,
  fadeResult,
  spinningWheel,
}) => {
  let arrangedCategoryTitle = "";
  if (randomCategory != null && spinStatus === false) {
    let categoryTitle = randomCategory.title.split(" ");

    if (categoryTitle.length > 0) {
      for (let i = 0; i < categoryTitle.length; i++) {
        arrangedCategoryTitle += categoryTitle[i] + "\n";
      }
    }
  }
  const resultImage = require("../../../assets/chilliBuddy2.0Icon/chilliBuddySpinningWheelV2/empty_wheel_result.png");
  const wheelImage = require("../../../assets/chilliBuddy2.0Icon/chilliBuddySpinningWheelV2/spinWheelWithFood.png");

  let { width } = Dimensions.get("window");
  width = width * 0.85;
  const rotation = wheelRotation.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  return (
    // <Modal transparent={true} visible={spinningWheelModal}>

    <ScrollView>
      <View style={styles.modelBackground}>
        {randomCategory != null && spinStatus === false ? (
          <View style={styles.mainTitleContain}>
            <Text style={styles.spinningTitle2}>Spin Me </Text>
            <Text style={styles.subTitle2}>We have a great choice of Restaurants near you,</Text>
            <Text style={styles.subTitle}>Let's Go!</Text>
          </View>
        ) : (
          <View style={styles.mainTitleContain}>
            <Text style={styles.spinningTitle2}>Spin Me </Text>

            <Text style={styles.subTitle2}>Don't Know What To Eat? </Text>
            <Text style={styles.subTitle}> </Text>
          </View>
        )}
        <View style={styles.containerForSpinningWheel}>
          {randomCategory != null && spinStatus === false ? (
            <View>
              <View style={styles.spinningWheelImage}>
                <Animated.View style={{ opacity: fadeResult }}>
                  <TouchableOpacity
                    onPress={() => onPressRandomCategory(randomCategory)}
                    activeOpacity={1}
                  >
                    <Animated.Image
                      style={{ width, height: width * 1, alignSelf: "center" }}
                      source={resultImage}
                    />
                    <View style={styles.categoryTextHolder}>
                      {/* <CustomIcon name={randomCategory.icon} size={30} style={{ color: "#FFFFFF" }} /> */}
                      {/* {console.log(randomCategory.icon)} */}
                      <Image
                        source={randomCategory.icon}
                        style={
                          randomCategory.title2 == "others" ? styles.wheelIconV2 : styles.wheelIcon
                        }
                      />
                      {/* {console.log(randomCategory.title)} */}
                      <Text style={styles.categoryText}>
                        {/* {randomCategory.title.replace("|", "\n")} */}
                        {/* {this.textAdjust.bind(randomCategory.title)} */}
                        {arrangedCategoryTitle}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </View>
          ) : (
            <View>
              <View style={styles.spinningWheelImage}>
                <View>
                  <Animated.View style={{ opacity: fadeWheel }}>
                    <Animated.Image
                      style={{ width, height: width * 1, transform: [{ rotate: rotation }] }}
                      source={wheelImage}
                    />
                  </Animated.View>
                </View>
              </View>
            </View>
          )}

          {/* <TouchableOpacity style={styles.closeWheelModal} onPress={onCloseSpinningWheelModal}>
          <MaterialCommunityIcons name="close-circle-outline" size={40} color="#FFFFFF" />
        </TouchableOpacity> */}
        </View>

        <View style={styles.buttonContain}>
          {/* <Image
            source={require("../../../assets/chilliBuddy2.0Icon/chilliBuddySpinningWheelV2/spinWheelHolder_Icon.png")}
            style={styles.holderPng}
          /> */}
          <Image
            source={require("../../../assets/chilliBuddy2.0Icon/chilliBuddySpinningWheelV2/spinWheelHolder_Icon.png")}
            style={styles.holderPng}
          />
          <TouchableOpacity
            style={spinStatus ? styles.categoriesButton : styles.categoriesButton}
            onPress={spinningWheel}
            disabled={spinStatus}
            activeOpacity={1}
          >
            <Text style={styles.buttonText}>
              {spinStatus ? "Spinning..." : randomCategory ? "Spin Again" : "Start"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    // </Modal>
  );
};

export { SpinningWheel };
