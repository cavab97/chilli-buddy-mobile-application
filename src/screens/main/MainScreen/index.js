import React, { Component } from "react";
import { connect } from "react-redux";
import MainTemplete from "@components/templates/Main";
import { Actions } from "react-native-router-flux";
import { readAllFromDatabase as readAllRoute } from "@redux/route/action";
import { readFromDatabase as readAdvertisements, toggleModal } from "@redux/advertisement/action";
import { readInfo as readSettingInfo, toggleSpinningWheelModal } from "@redux/settings/action";
import { verifyPermission, loadShops } from "@redux/shops/action";
import {
  listenFromDatabase as listenToRouteTickets,
  removeListenerFromDatabase as removeListenerFromRouteTickets,
} from "@redux/routeTicket/action";

import * as Location from "expo-location";
import { loadShopsPromo } from "@redux/promo/action";

import clone from "clone";
import { lessThan } from "react-native-reanimated";
import { Animated } from "react-native";
const RADIUS = 50;

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
      wheelRotation: new Animated.Value(0),
      // fadeWheel: new Animated.Value(1),
      fadeResult: new Animated.Value(0),
      randomCategoryNumber: null,
      randomCategory: null,
      // spinStatus: false,
      selectedCategory: { id: "", tags: ["All"], title: "All" },
      selectedTag: "All",
      radiusAddition: 1,
    };
  }

  componentDidMount() {
    this.props.listenToRouteTickets();
    this.props.readAllRoute();
    this.props.readAdvertisements();
    this.props.readSettingInfo();
    this.handleRefresh();
  }

  componentWillUnmount() {
    this.props.removeListenerFromRouteTickets();
  }

  // onPressCardChallenge(id) {
  //   Actions.Route({ routeId: id });
  // }

  handleRefresh = async () => {
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ refreshing: true });
    await this.props.readAdvertisements();
    await this.props.readSettingInfo();
    await this.props.loadShopsPromo({
      radius: RADIUS * this.state.radiusAddition,
      latitude: location.coords.latitude,
      longtitude: location.coords.longitude,
      selectedCategory: this.state.selectedCategory.id ? this.state.selectedCategory.id : null,
      selectedTag: this.state.selectedTag !== "All" ? this.state.selectedTag : null,
    });
    this.setState({ refreshing: false });

    //await this.props.readFromDatabase();
  };

  handleVideoRef = (component) => {
    const playbackObject = component;
  };

  onPressCategory(id, no) {
    Actions.Shops({ selectedCategory: id, number: no });
  }
  onCheckInPressed() {
    Actions.CheckIn();
  }
  onShopsPressed() {
    Actions.Shops();
  }
  onPromotionsPressed() {
    Actions.Promo();
  }
  onProfilePressed() {
    Actions.Profile();
  }
  //open spinning wheel screen
  onOpenSpinningWheel() {
    Actions.SpinningWheel();
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

  //open spinning wheel modal
  onOpenSpinningWheelModal() {
    this.setState({ randomCategory: null });
    this.props.toggleSpinningWheelModal();
  }

  //close pop up from spinning wheel modal
  onCloseSpinningWheelModal() {
    this.setState({ randomCategory: null });
    this.props.toggleSpinningWheelModal();
  }

  onPressRandomCategory(category) {
    Actions.Shops({ selectedCategory: category });
    this.props.toggleSpinningWheelModal();
  }

  returnGreetings() {
    let hour = new Date().getHours();
    // let offsetInHours = date.getTimezoneOffset() / 60;
    console.log(hour);
    if ((hour >= 5 && hour <= 12) || hour <= 12) {
      return "Good Morning.";
    } else if (hour >= 12 && hour <= 18) {
      return "Good Afternoon.";
    } else if (hour >= 18 && hour <= 5) {
      return "Good Evening";
    }
  }
  //merchant Pressed
  onMerchantPressed(item) {
    Actions.SingleMerchantPromo({ promoId: item.id, distance: item.distance });
  }

  // //Pass category
  // passCategory() {
  //   let dataSource2 = [];
  //   let categoriesImage = [
  //     require("../../../assets/chillibuddy/category1.png"),
  //     require("../../../assets/chillibuddy/category2.png"),
  //     require("../../../assets/chillibuddy/category3.png"),
  //     require("../../../assets/chillibuddy/category4.png"),
  //     require("../../../assets/chillibuddy/category5.png"),
  //   ];
  //   let size = 30;
  //   dataSource2 = this.state.categories.slice(1, size).map((category) => {
  //     return {
  //       key: category.id,
  //       id: category.id,
  //       no: category.no,
  //       title: category.title,
  //       tags: category.tags,
  //       //image: require("../../../assets/chillibuddy/category1.png"),
  //     };
  //   });

  //   //Assigning background pictures
  //   dataSource2.forEach((element, index) => {
  //     element.image = categoriesImage[index % 5];
  //     switch (element.title) {
  //       case "Chinese | 中餐":
  //         element.icon = "chinese";
  //         break;
  //       case "Western | 西餐":
  //         element.icon = "western";
  //         break;
  //       case "Cafe | 咖啡馆":
  //         element.icon = "cafe";
  //         break;
  //       case "China | 中国菜":
  //         element.icon = "china";
  //         break;
  //       case "Japanese | 日本餐":
  //         element.icon = "japanese";
  //         break;
  //       case "Korean | 韩国餐":
  //         element.icon = "korean";
  //         break;
  //       case "Thai | 泰国餐":
  //         element.icon = "thai";
  //         break;
  //       case "TAIWAN | 台湾":
  //         element.icon = "taiwan";
  //         break;
  //       case "Bistro | 小酒馆":
  //         element.icon = "bistro";
  //         break;
  //       case "Steamboat | 火锅":
  //         element.icon = "steamboat";
  //         break;
  //       case "Local Cuisine | 本地美食":
  //         element.icon = "localcuisine";
  //         break;
  //       case "Beverage | 饮料店":
  //         element.icon = "beverage";
  //         break;
  //       case "Food Truck | 餐车":
  //         element.icon = "foodtruck";
  //         break;
  //       case "LOK LOK | 碌碌":
  //         element.icon = "loklok";
  //         break;
  //       case "Special Cuisine | 特色美食":
  //         element.icon = "cuisine";
  //         break;
  //       default:
  //         element.icon = "others";
  //     }
  //   });
  //   return dataSource2;
  // }

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
    let {
      user,
      notifications,
      ownRewards,
      photo,
      readLoadingNotification,
      readLoadingReward,
    } = this.props;
    const { readLoading, promo, bookmark, promotions } = this.props.promotionState;
    const readFail =
      readErrorRoute || readErrorRouteTicket || readErrorAdvertisement || readErrorHeaderImages;

    let dataSource = [];
    let filteredAdPic = [];

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
        // dataSource2={this.passCategory()}
        sectionTitle1="Category"
        //routeTickets={routeTickets}
        casualImage={casualImage}
        luxuryImage={luxuryImage}
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
        spinningWheelModal={this.props.spinningWheelModal}
        // onOpenSpinningWheelModal={this.onOpenSpinningWheelModal.bind(this)}
        // onCloseSpinningWheelModal={this.onCloseSpinningWheelModal.bind(this)}
        // spinningWheel={this.spinningWheel.bind(this)}
        wheelRotation={this.state.wheelRotation}
        randomCategory={this.state.randomCategory}
        onPressRandomCategory={this.onPressRandomCategory.bind(this)}
        fadeWheel={this.state.fadeWheel}
        fadeResult={this.state.fadeResult}
        // spinStatus={this.state.spinStatus}
        onCheckInPressed={this.onCheckInPressed.bind(this)}
        onPromotionsPressed={this.onPromotionsPressed.bind(this)}
        onShopsPressed={this.onShopsPressed.bind(this)}
        onProfilePressed={this.onProfilePressed.bind(this)}
        user={user}
        promoSource={promo}
        promotions={promotions}
        onMerchantPressed={this.onMerchantPressed.bind(this)}
        onOpenSpinningWheel={this.onOpenSpinningWheel.bind(this)}
        returnGreetings={this.returnGreetings()}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const routeTickets = state.RouteTicket.userRouteTickets;
  const { allRoutes } = state.Route;
  const { advertisements } = state.Advertisement;
  const { categories, tags } = state.Settings;
  const spinningWheelModal = state.Settings.spinningWheelModal;
  const readLoadingRouteTicket = state.RouteTicket.readLoading;
  const readLoadingRoute = state.Route.readLoading;
  const readLoadingAdvertisement = state.Advertisement.readLoading;
  const readLoadingHeaderImages = state.Settings.readInfoLoading;

  const readErrorRouteTicket = state.RouteTicket.readError;
  const readErrorRoute = state.Route.readError;
  const readErrorAdvertisement = state.Advertisement.readError;
  const readErrorHeaderImages = state.Settings.readError;

  const openModal = state.Advertisement.openModal;

  const user = state.Auth.user;

  const promotionState = state.Promotion;

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
    spinningWheelModal,
    user,
    promotionState,
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
  toggleSpinningWheelModal,
  loadShopsPromo,
})(index);
