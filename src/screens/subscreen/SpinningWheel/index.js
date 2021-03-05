import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { SpinningWheel } from "@components/templates";
import { Animated } from "react-native";

import styles from "./styles";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wheelRotation: new Animated.Value(0),
      randomCategory: null,
      spinStatus: false,
      randomCategoryNumber: null,
      fadeWheel: new Animated.Value(1),
      categories: props.categories,
      fadeResult: new Animated.Value(0),
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  //done
  spinningWheel() {
    let newDeg = Math.random() * 360;
    const curValue = this.state.wheelRotation.__getValue();
    if (curValue > 720) {
      newDeg = curValue - newDeg - 720;
    } else {
      newDeg = curValue + newDeg + 720;
    }

    this.setState({
      randomCategoryNumber: Math.random(),
      spinStatus: true,
      randomCategory: null,
    });

    const randomCategory = this.getRandomCategory();
    this.setState({ randomCategory: randomCategory });

    Animated.parallel([
      Animated.decay(this.state.wheelRotation, {
        toValue: newDeg,
        velocity: 200,
        //deceleration: 0.99915,
        useNativeDriver: true,
      }).start(({ finished }) => {
        const randomCategory = this.getRandomCategory();
        this.setState({ spinStatus: false });
        Animated.timing(this.state.fadeResult, {
          toValue: 1,
          //delay: 2000,
          duration: 1500,
          useNativeDriver: true,
        }).start();
      }),
      Animated.timing(this.state.fadeWheel, {
        toValue: 0,
        duration: 6000,
        useNativeDriver: true,
      }).start(),
    ]);
  }
  //done
  onPressRandomCategory(category) {
    Actions.Shops({
      selectedCategory: category,
      selectedCategoryId: this.returnSpecificCategory(category.id),
    });
  }
  //Pass category
  passCategory() {
    let dataSource2 = [];
    let categoriesImage = [
      require("../../../assets/chillibuddy/category1.png"),
      require("../../../assets/chillibuddy/category2.png"),
      require("../../../assets/chillibuddy/category3.png"),
      require("../../../assets/chillibuddy/category4.png"),
      require("../../../assets/chillibuddy/category5.png"),
    ];
    let size = 30;
    dataSource2 = this.state.categories.slice(1, size).map((category) => {
      return {
        key: category.id,
        id: category.id,
        no: category.no,
        title: category.title,
        tags: category.tags,
        //image: require("../../../assets/chillibuddy/category1.png"),
      };
    });

    //Assigning background pictures
    dataSource2.forEach((element, index) => {
      element.image = categoriesImage[index % 5];
      switch (element.title) {
        case "Chinese 中餐":
          element.icon = require("../../../assets/chilliBuddy2.0Icon/chilliBuddySpinningWheelV2/chinese.png");
          break;
        case "Western 西餐":
          element.icon = require("../../../assets/chilliBuddy2.0Icon/chilliBuddySpinningWheelV2/western.png");

          break;
        case "Cafe 咖啡馆":
          element.icon = require("../../../assets/chilliBuddy2.0Icon/chilliBuddySpinningWheelV2/cafe.png");

          break;
        case "China 中国菜":
          element.icon = require("../../../assets/chilliBuddy2.0Icon/chilliBuddySpinningWheelV2/china.png");

          break;
        case "Japanese 日本餐":
          element.icon = require("../../../assets/chilliBuddy2.0Icon/chilliBuddySpinningWheelV2/japanese.png");

          break;
        case "Korean 韩国餐":
          element.icon = require("../../../assets/chilliBuddy2.0Icon/chilliBuddySpinningWheelV2/korean.png");

          break;
        case "Thai 泰国餐":
          element.icon = require("../../../assets/chilliBuddy2.0Icon/chilliBuddySpinningWheelV2/thai.png");

          break;
        case "TAIWAN 台湾":
          element.icon = require("../../../assets/chilliBuddy2.0Icon/chilliBuddySpinningWheelV2/others.png");

          break;
        case "Bistro 小酒馆":
          element.icon = require("../../../assets/chilliBuddy2.0Icon/chilliBuddySpinningWheelV2/bistro.png");

          break;
        case "Steamboat 火锅":
          element.icon = require("../../../assets/chilliBuddy2.0Icon/chilliBuddySpinningWheelV2/steamboat.png");

          break;
        case "Local Cuisine 本地美食":
          element.icon = require("../../../assets/chilliBuddy2.0Icon/chilliBuddySpinningWheelV2/localcuisine.png");

          break;
        case "Beverage 饮料":
          element.icon = require("../../../assets/chilliBuddy2.0Icon/chilliBuddySpinningWheelV2/beverage.png");

          break;
        case "Food Truck 餐车":
          element.icon = require("../../../assets/chilliBuddy2.0Icon/chilliBuddySpinningWheelV2/foodtruck.png");

          break;
        case "LOK LOK 碌碌":
          element.icon = require("../../../assets/chilliBuddy2.0Icon/chilliBuddySpinningWheelV2/others.png");

          break;
        case "Special Cuisine 特色美食":
          element.icon = require("../../../assets/chilliBuddy2.0Icon/chilliBuddySpinningWheelV2/cuisine.png");

          break;
        default:
          (element.title2 = "others"),
            (element.icon = require("../../../assets/chilliBuddy2.0Icon/chilliBuddySpinningWheelV2/others.png"));
      }
    });
    return dataSource2;
  }

  getRandomCategory() {
    let categoryArray = this.passCategory();
    let index = Math.floor(Math.random() * categoryArray.length + 1);
    var randomCategory = categoryArray[index >= categoryArray.length ? index - 1 : index];

    return randomCategory;
  }
  returnSpecificCategory(selectedCategory) {
    // console.log(category);
    // console.log(categories[0].id);
    // const { selectedCategory } = this.props.shopState;

    const { categories } = this.props;
    let index;

    index = categories.findIndex((category) => {
      return category.id === selectedCategory;
    });
    return index;
  }

  render() {
    return (
      <SpinningWheel
        // spinningWheelModal={spinningWheelModal}
        // dataSource2={this.passCategory()}
        randomCategory={this.state.randomCategory}
        spinStatus={this.state.spinStatus}
        onPressRandomCategory={this.onPressRandomCategory.bind(this)}
        wheelRotation={this.state.wheelRotation}
        // onCloseSpinningWheelModal={onCloseSpinningWheelModal}
        fadeWheel={this.state.fadeWheel}
        spinningWheel={this.spinningWheel.bind(this)}
      />
    );
  }
}

const mapStatetoprops = (state) => {
  const { categories } = state.Settings;
  const shopState = state.Shops;

  return { categories, shopState };
};

export default connect(mapStatetoprops, {})(index);
