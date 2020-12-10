import React, { Component } from "react";
import { connect } from "react-redux";
import MainTemplete from "@components/templates/Main";
import { Actions } from "react-native-router-flux";
import { readAllFromDatabase as readAllRoute } from "@redux/route/action";
import { readFromDatabase as readAdvertisements } from "@redux/advertisement/action";
import { readInfo as readSettingInfo } from "@redux/settings/action";
import { verifyPermission, loadShops } from "@redux/shops/action";
import {
  listenFromDatabase as listenToRouteTickets,
  removeListenerFromDatabase as removeListenerFromRouteTickets,
} from "@redux/routeTicket/action";

import clone from "clone";
import { lessThan } from "react-native-reanimated";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdvertisementModelShow: true,
      tags: props.tags,
      categories: props.categories,
      selectedCategory: {},
      selectedTag: "All",
      randomNumber: Math.random(),
    };
  }

  componentDidMount() {
    this.props.listenToRouteTickets();
    this.props.readAllRoute();
    this.props.readAdvertisements();
    this.props.readSettingInfo();
  }

  componentWillUnmount() {
    this.props.removeListenerFromRouteTickets();
  }

  // onPressCardChallenge(id) {
  //   Actions.Route({ routeId: id });
  // }

  onPressCategory(id, no) {
    Actions.Shops({ selectedCategory: id, number: no });
  }

  // View shop from clicking image swiper advertisements
  onPressViewShop(shopId) {
    Actions.SingleMerchant({ shopId: shopId });
  }

  onPressPopUp(getShopId) {
    Actions.SingleMerchant({ shopId: getShopId });
    this.setState({ isAdvertisementModelShow: false });
  }

  // Close advertisement modal
  onCloseAdvertisementModal() {
    this.setState({ isAdvertisementModelShow: false });
  }

  render() {
    const {
      allRoutes,
      advertisements,
      readLoadingRouteTicket,
      readLoadingRoute,
      readLoadingAdvertisement,
      readLoadingHeaderImages,
      readErrorRoute,
      readErrorRouteTicket,
      readErrorAdvertisement,
      readErrorHeaderImages,
    } = this.props;

    const readFail =
      readErrorRoute || readErrorRouteTicket || readErrorAdvertisement || readErrorHeaderImages;

    let dataSource = [];
    let dataSource2 = [];
    let dataSourceAds = []; //Testing advertisement slider click
    let filteredAdPic = [];
    let categoriesImage = [
      require("../../../assets/chillibuddy/category1.png"),
      require("../../../assets/chillibuddy/category2.png"),
      require("../../../assets/chillibuddy/category3.png"),
      require("../../../assets/chillibuddy/category4.png"),
      require("../../../assets/chillibuddy/category5.png"),
    ];

    //Sort to show latest
    advertisements.sort((a, b) => b.createAt - a.createAt);

    //Map image URL and Shop ID to array
    dataSourceAds = advertisements.map((item) => {
      return {
        imageUri: item.coverPic,
        shopId: item.shopID,
      };
    });

    //Filter empty shopID and Cover pic ads
    var filteredDatasource = dataSourceAds.filter(
      (value) => Object.keys(value.imageUri).length !== 0 && Object.keys(value.shopId).length !== 0
    );

    //Push ads popup cover pic into array
    advertisements.forEach((advertisement) => {
      if (advertisement.popUpImage) {
        filteredAdPic.push(advertisement.popUpImage);
      }
    });
    //Filter empty coverpic from array

    //var filteredAdPic = adCoverPic.filter((value) => Object.keys(value).length !== 0);
    var randomAdPic = filteredAdPic[Math.floor(this.state.randomNumber * filteredAdPic.length)];

    //filter same pic and get shop ID
    const getShopId = advertisements
      .filter(function (advertisement) {
        return advertisement.popUpImage === randomAdPic;
      })
      .map(function (advertisement) {
        return advertisement.shopID;
      })
      .toString();

    //Pass category
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
        case "中餐 | Chinese":
          element.icon = "chinese";
          break;
        case "西餐 | Western":
          element.icon = "western";
          break;
        case "Cafe":
          element.icon = "cafe";
          break;
        case "中國菜 | China":
          element.icon = "china";
          break;
        case "日本餐 | Japanese":
          element.icon = "japanese";
          break;
        case "韓國 | Korean":
          element.icon = "korean";
          break;
        case "泰國 | Thai":
          element.icon = "thai";
          break;
        case "台灣 | Taiwan":
          element.icon = "taiwan";
          break;
        case "小酒館 | Bistro":
          element.icon = "bistro";
          break;
        case "火鍋 | Steamboat":
          element.icon = "steamboat";
          break;
        case "本地美食 | Local cuisine":
          element.icon = "localcuisine";
          break;
        case "飲料店 | Beverage":
          element.icon = "beverage";
          break;
        case "餐車 | Food Truck":
          element.icon = "foodtruck";
          break;
        case "碌碌 | Lok Lok":
          element.icon = "loklok";
          break;
        case "特色美食 | Speciality cuisine":
          element.icon = "cuisine";
          break;
        default:
          element.icon = "others";
      }
    });

    const noImageHeaderSlider = require("../../../assets/gogogain/top_image.jpg");
    const noImageAdvertisement = require("../../../assets/gogogain/pinpng.com-camera-drawing-png-1886718.png");
    const casualImage = require("../../../assets/gogogain/Mascot-C.png");
    const luxuryImage = require("../../../assets/gogogain/Mascot-L.png");

    return (
      <MainTemplete
        readFail={readFail}
        slider={filteredDatasource}
        filteredAdPic={filteredAdPic}
        randomAdPic={randomAdPic}
        getShopId={getShopId}
        dataSource={dataSource}
        dataSource2={dataSource2}
        //routeTickets={routeTickets}
        casualImage={casualImage}
        luxuryImage={luxuryImage}
        sectionTitle1="Category"
        sectionTitle2="Latest News"
        sectionTitle3="Your Challenges"
        label1="Total Mission : "
        label2="Period : "
        unit=" pax"
        onPressCard={this.onPressCategory.bind(this)}
        advertisements={advertisements}
        isAdvertisementModelShow={this.state.isAdvertisementModelShow} //Get state to show advertisement Model
        onPressImage={this.onPressViewShop.bind(this)}
        onPressPopUp={this.onPressPopUp.bind(this)}
        onCloseAdvertisementModal={this.onCloseAdvertisementModal.bind(this)}
        //onPressAdvertisement = {this.onPressAdvertisement.bind(this)}
        noImageAdvertisement={noImageAdvertisement}
        noImageHeaderSlider={noImageHeaderSlider}
        readLoadingAdvertisement={readLoadingAdvertisement}
        readLoadingCategoryList={readLoadingRoute}
        readLoadingRouteTicket={readLoadingRouteTicket}
        readLoadingHeaderImages={readLoadingHeaderImages}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const routeTickets = state.RouteTicket.userRouteTickets;
  const { allRoutes } = state.Route;
  const { advertisements } = state.Advertisement;
  const { categories, tags } = state.Settings;

  const readLoadingRouteTicket = state.RouteTicket.readLoading;
  const readLoadingRoute = state.Route.readLoading;
  const readLoadingAdvertisement = state.Advertisement.readLoading;
  const readLoadingHeaderImages = state.Settings.readInfoLoading;

  const readErrorRouteTicket = state.RouteTicket.readError;
  const readErrorRoute = state.Route.readError;
  const readErrorAdvertisement = state.Advertisement.readError;
  const readErrorHeaderImages = state.Settings.readError;

  return {
    categories,
    tags,
    routeTickets,
    allRoutes,
    advertisements,
    readLoadingHeaderImages,
    readLoadingRouteTicket,
    readLoadingRoute,
    readLoadingAdvertisement,
    readErrorRoute,
    readErrorRouteTicket,
    readErrorAdvertisement,
    readErrorHeaderImages,
  };
};

export default connect(mapStateToProps, {
  listenToRouteTickets,
  removeListenerFromRouteTickets,
  readAllRoute,
  readAdvertisements,
  verifyPermission,
  loadShops,
  readSettingInfo,
})(index);
