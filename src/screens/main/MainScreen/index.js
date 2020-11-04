import React, { Component } from "react";
import { connect } from "react-redux";
import MainTemplete from "@components/templates/Main";
import { Actions } from "react-native-router-flux";
import { readAllFromDatabase as readAllRoute } from "@redux/route/action";
import { readFromDatabase as readAdvertisements } from "@redux/advertisement/action";
import { readInfo as readSettingInfo } from "@redux/settings/action";
import {
  listenFromDatabase as listenToRouteTickets,
  removeListenerFromDatabase as removeListenerFromRouteTickets,
} from "@redux/routeTicket/action";

import clone from "clone"

class index extends Component {
  constructor(props) {
    super(props);
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

  onPressCardChallenge(id) {
    Actions.Route({ routeId: id });
  }

  onPressAdvertisement(id) {
    Actions.Advertisement({ AdvertisementId: id })
  }

  render() {
    const {
      allRoutes,
      advertisements,
      readLoadingRouteTicket,
      readLoadingRoute,
      readLoadingAdvertisement,
      headerImages,
      readLoadingHeaderImages,
      readErrorRoute,
      readErrorRouteTicket,
      readErrorAdvertisement,
      readErrorHeaderImages
    } = this.props;

    const readFail = readErrorRoute || readErrorRouteTicket || readErrorAdvertisement || readErrorHeaderImages;

    let dataSource = [];
    let dataSource2 = [];

    let { routeTickets } = clone(this.props);

    routeTickets = routeTickets.filter((routeTicket)=> routeTicket.route.ended.boolean === false && routeTicket.route.terminated.at === null)

    if (routeTickets.length > 0) {
      dataSource = routeTickets.map(({ route }) => {
        return {
          key: route.id,
          id: route.id,
          type: route.type,
          title: route.title,
          image: require("../../../assets/gogogain/RouteMap_FA_Challenge.png"),
        };
      });
    }

    let size = 10;
    dataSource2 = allRoutes.slice(0, size).map((route) => {
      let seatLeft = null;
      let joined = 0;
      if (route.minimumUser - route.currentUser <= 0) {
        seatLeft = "0";
      } else {
        seatLeft = route.minimumUser - route.currentUser;
      }

      return {
        key: route.id,
        id: route.id,
        totalMission: route.totalMissions,
        title: route.title,
        type: route.type,
        seatLeft: seatLeft,
        startTime: route.startTime,
        endTime: route.endTime,
        image: require("../../../assets/gogogain/RouteMap_FA_JoinUs.jpg"),
        joined: joined,
      };
    });
 
    for(let x=0; x < dataSource2.length; x++){
      for(let y=0; y < dataSource.length; y++){
        if(dataSource2[x].id === dataSource[y].id)
          dataSource2[x].joined++;
      }
    }

    dataSource2 = dataSource2.sort((a, b) => {
      return (a.joined) - (b.joined);
    }); 

    const noImageHeaderSlider = require("../../../assets/gogogain/top_image.jpg")
    const noImageAdvertisement = require("../../../assets/gogogain/pinpng.com-camera-drawing-png-1886718.png")
    const casualImage = require("../../../assets/gogogain/Mascot-C.png")
    const luxuryImage = require("../../../assets/gogogain/Mascot-L.png")

    return (
      console.log(advertisements.coverPic),
        <MainTemplete
          readFail={readFail}
          slider={headerImages}
          dataSource={dataSource}
          dataSource2={dataSource2}
          routeTickets={routeTickets}
          casualImage={casualImage}
          luxuryImage={luxuryImage}
          sectionTitle1="Category"
          sectionTitle2="Latest News"
          sectionTitle3="Your Challenges"
          label1="Total Mission : "
          label2="Period : "
          unit=" pax"
          onPressCard={this.onPressCardChallenge.bind(this)}
          advertisements = {advertisements}
          onPressAdvertisement = {this.onPressAdvertisement.bind(this)}
          noImageAdvertisement= {noImageAdvertisement}
          noImageHeaderSlider = {noImageHeaderSlider}
          readLoadingAdvertisement = {readLoadingAdvertisement}
          readLoadingRoute = {readLoadingRoute}
          readLoadingRouteTicket = {readLoadingRouteTicket}
          readLoadingHeaderImages ={readLoadingHeaderImages}
        />
    );
  }
}

const mapStateToProps = (state) => {
  const routeTickets = state.RouteTicket.userRouteTickets;
  const { allRoutes } = state.Route;
  const { advertisements } = state.Advertisement;
  const { headerImages } = state.Settings.info

  const readLoadingRouteTicket = state.RouteTicket.readLoading;
  const readLoadingRoute = state.Route.readLoading;
  const readLoadingAdvertisement = state.Advertisement.readLoading;
  const readLoadingHeaderImages = state.Settings.readInfoLoading;

  const readErrorRouteTicket = state.RouteTicket.readError;
  const readErrorRoute = state.Route.readError;
  const readErrorAdvertisement = state.Advertisement.readError;
  const readErrorHeaderImages = state.Settings.readError;

  return {
    routeTickets,
    allRoutes,
    advertisements,
    headerImages,
    readLoadingHeaderImages,
    readLoadingRouteTicket,
    readLoadingRoute,
    readLoadingAdvertisement,
    readErrorRoute,
    readErrorRouteTicket,
    readErrorAdvertisement,
    readErrorHeaderImages
  };
};

export default connect(mapStateToProps, {
  listenToRouteTickets,
  removeListenerFromRouteTickets,
  readAllRoute,
  readAdvertisements,
  readSettingInfo
})(index);
