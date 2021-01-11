import React, { Component } from "react";
import { connect } from "react-redux";
import MainTemplete from "@components/templates/Main";
import { Actions } from "react-native-router-flux";
import { readAllFromDatabase as readAllRoute } from "@redux/route/action";
import { readFromDatabase as readAdvertisements, toggleModal } from "@redux/advertisement/action";
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
      refreshing: false,
      popUpImage: "",
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

  handleRefresh = async () => {
    this.setState({ refreshing: true });
    await this.props.readAdvertisements();
    await this.props.readSettingInfo();
    this.setState({ refreshing: false });
  };

  handleVideoRef = (component) => {
    const playbackObject = component;
  };

  onPressCategory(id, no) {
    Actions.Shops({ selectedCategory: id, number: no });
  }

  // View shop from clicking image swiper advertisements
  onPressViewShop(index) {
    const filteredDatasource = this.filteredDatasource();
    if (filteredDatasource[index].adsType === "image") {
      Actions.SingleMerchant({ shopId: filteredDatasource[index].shopId });
    } else if (filteredDatasource[index].adsType === "video") {
      this.props.toggleModal();
      this.state.popUpImage = filteredDatasource[index].popUpImage;
    }
  }

  //close pop up from header
  onClosePopUp() {
    this.props.toggleModal();
  }

  onPressPopUp(getShopId) {
    Actions.SingleMerchant({ shopId: getShopId });
    this.setState({ isAdvertisementModelShow: false });
  }

  // Close advertisement modal
  onCloseAdvertisementModal() {
    this.setState({ isAdvertisementModelShow: false });
  }

  //Filtered Data Source from empty shopId and empty cover pic
  filteredDatasource() {
    const advertisements = this.props.advertisements;
    let dataSourceAds = [];

    //Map image URL and Shop ID to array
    dataSourceAds = advertisements.map((item) => {
      return {
        imageUri: item.coverPic,
        shopId: item.shopID,
        popUpImage: item.popUpImage,
      };
    });

    //Filter empty shopID and Cover pic ads
    var filteredDatasource = dataSourceAds.filter(
      (value) => Object.keys(value.imageUri).length !== 0 && Object.keys(value.shopId).length !== 0
    );

    //check pop up image type in slider
    filteredDatasource.forEach((data) => {
      data.adsType = this.checkType(data.popUpImage);
    });

    return filteredDatasource;
  }

  //Check the type of url is image or video
  checkType(imageUrl) {
    //define image and video type
    var imageType = new RegExp("https?://.*.(?:png|jpg|jpeg)");
    var videoType = new RegExp("https?://.*.(?:mp4|3gp)");

    if (imageType.test(imageUrl)) {
      return "image";
    } else if (videoType.test(imageUrl)) {
      return "video";
    } else {
      return null;
    }
  }

  //close pop up from spinning wheel modal
  onCloseSpinningWheelModal() {
    this.props.toggleSpinningWheelModal();
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

    //Push ads popup cover pic into array
    advertisements.forEach((advertisement) => {
      if (advertisement.popUpImage) {
        filteredAdPic.push(advertisement.popUpImage);
      }
    });

    //Get random pop up ads
    var randomAdPic = filteredAdPic[Math.floor(this.state.randomNumber * filteredAdPic.length)];

    //get type of random pop up ads
    const type = this.checkType(randomAdPic);

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
        slider={this.filteredDatasource()}
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
        noImageAdvertisement={noImageAdvertisement}
        noImageHeaderSlider={noImageHeaderSlider}
        readLoadingAdvertisement={readLoadingAdvertisement}
        readLoadingCategoryList={readLoadingRoute}
        readLoadingRouteTicket={readLoadingRouteTicket}
        readLoadingHeaderImages={readLoadingHeaderImages}
        handleRefresh={this.handleRefresh.bind(this)}
        refreshing={this.state.refreshing}
        handleVideoRef={this.handleVideoRef.bind(this)}
        type={type}
        openModal={this.props.openModal}
        popUpImage={this.state.popUpImage}
        onClosePopUp={this.onClosePopUp.bind(this)}
        toggleSpinningWheelModal={this.props.toggleSpinningWheelModal}
        onCloseSpinningWheelModal={this.onCloseSpinningWheelModal.bind(this)}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const routeTickets = state.RouteTicket.userRouteTickets;
  const { allRoutes } = state.Route;
  const { advertisements } = state.Advertisement;
  const { categories, tags, toggleSpinningWheelModal } = state.Settings;

  const readLoadingRouteTicket = state.RouteTicket.readLoading;
  const readLoadingRoute = state.Route.readLoading;
  const readLoadingAdvertisement = state.Advertisement.readLoading;
  const readLoadingHeaderImages = state.Settings.readInfoLoading;

  const readErrorRouteTicket = state.RouteTicket.readError;
  const readErrorRoute = state.Route.readError;
  const readErrorAdvertisement = state.Advertisement.readError;
  const readErrorHeaderImages = state.Settings.readError;

  const openModal = state.Advertisement.openModal;

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
    openModal,
    toggleSpinningWheelModal,
  };
};

export default connect(mapStateToProps, {
  listenToRouteTickets,
  removeListenerFromRouteTickets,
  readAllRoute,
  readAdvertisements,
  toggleModal,
  verifyPermission,
  loadShops,
  readSettingInfo,
})(index);
