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
        case "CHINESE | 中餐":
          element.icon = "chinese";
          break;
        case "WESTERN | 西餐":
          element.icon = "western";
          break;
        case "CAFE | 咖啡馆":
          element.icon = "cafe";
          break;
        case "CHINA | 中国菜":
          element.icon = "china";
          break;
        case "JAPANESE | 日本餐":
          element.icon = "japanese";
          break;
        case "KOREAN | 韩国餐":
          element.icon = "korean";
          break;
        case "THAI | 泰国餐":
          element.icon = "thai";
          break;
        case "TAIWAN | 台湾":
          element.icon = "taiwan";
          break;
        case "BISTRO | 小酒馆":
          element.icon = "bistro";
          break;
        case "STEAMBOAT | 火锅":
          element.icon = "steamboat";
          break;
        case "LOCAL CUISINE | 本地美食":
          element.icon = "localcuisine";
          break;
        case "BEVERAGE | 饮料店":
          element.icon = "beverage";
          break;
        case "FOOD TRUCK | 餐车":
          element.icon = "foodtruck";
          break;
        case "LOK LOK | 碌碌":
          element.icon = "loklok";
          break;
        case "SPECIAL CUISINE | 特色美食":
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
