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
    Actions.Shops({ selectedCategory: category });
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
        case "Chinese | 中餐":
          element.icon = "chinese";
          break;
        case "Western | 西餐":
          element.icon = "western";
          break;
        case "Cafe | 咖啡馆":
          element.icon = "cafe";
          break;
        case "China | 中国菜":
          element.icon = "china";
          break;
        case "Japanese | 日本餐":
          element.icon = "japanese";
          break;
        case "Korean | 韩国餐":
          element.icon = "korean";
          break;
        case "Thai | 泰国餐":
          element.icon = "thai";
          break;
        case "TAIWAN | 台湾":
          element.icon = "taiwan";
          break;
        case "Bistro | 小酒馆":
          element.icon = "bistro";
          break;
        case "Steamboat | 火锅":
          element.icon = "steamboat";
          break;
        case "Local Cuisine | 本地美食":
          element.icon = "localcuisine";
          break;
        case "Beverage | 饮料店":
          element.icon = "beverage";
          break;
        case "Food Truck | 餐车":
          element.icon = "foodtruck";
          break;
        case "LOK LOK | 碌碌":
          element.icon = "loklok";
          break;
        case "Special Cuisine | 特色美食":
          element.icon = "cuisine";
          break;
        default:
          element.icon = "others";
      }
    });
    return dataSource2;
  }
  getRandomCategory() {
    let categoryArray = this.passCategory();
    var randomCategory =
      categoryArray[Math.floor(this.state.randomCategoryNumber * categoryArray.length)];
    return randomCategory;
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

  return { categories };
};

export default connect(mapStatetoprops, {})(index);
