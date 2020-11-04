import React, { Component } from "react";
import { Share, Platform } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

import { SingleRoutes } from "@components/templates";

import {
  listenToRecord as listenToRoute,
  removeListenerToRecord as removeListenerFromRoute,
} from "@redux/route/action";

import {
  listenToRecord as listenToRouteTicket,
  removeListenerToRecord as removeListenerFromRouteTicket,
  submitToBackend as submitRouteTicket,
} from "@redux/routeTicket/action";

import {
  readFromDatabase as readMissions,
  modalControl as missionModalControl,
} from "@redux/mission/action";

import {
  listenByRouteTicket as listenTransactions,
  removeListenByRouteTicket as removeListenTransactions
} from "@redux/transaction/action";

import { readFromDatabase as readRewards } from "@redux/reward/action";

import { submitToBackend as submitTransaction } from "@redux/transaction/action";

import styles from "./styles";

import { Linking } from "expo";
import clone from "clone"

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
      shared: false,
      invited: false,
      showModalVisible: true,
      routeTicketId: null,
      error: null,
      showErrorModalVisible: false,
    };
  }

  componentDidMount() {
    const { routeId } = this.props.navigation.state.params;
    const routeTicketId = this.lookingForTicket({ routeId });

    this.props.listenToRoute({ routeId });
    this.props.readMissions({ routeId });
    this.props.readRewards({ routeId });

    if (routeTicketId) {console.log("Hava route ticket id");
      this.props.listenToRouteTicket({ routeTicketId });
      this.props.listenTransactions({routeTicketId});
      this.setState({ routeTicketId: routeTicketId });
    }
  }

  componentWillUnmount() {
    this.props.removeListenerFromRoute();
    this.props.removeListenerFromRouteTicket();
    this.props.removeListenTransactions();
  }

  componentDidUpdate(prevProps, prevState) {
    const { routeId } = this.props.navigation.state.params;
    // Typical usage (don't forget to compare props):
    const { route } = this.props.routeState;

    if (
      (this.state.shared !== prevState.shared ||
        this.state.invited !== prevState.invited) &&
      route.type === "Luxury" &&
      this.state.invited &&
      this.state.shared &&
      !this.state.routeTicketId
    ) {
      this.props.submitRouteTicket({ routeId }, "create");
    }

    if (
      this.state.shared !== prevState.shared &&
      route.type === "Casual" &&
      this.state.shared &&
      !this.state.routeTicketId
    ) {
      this.props.submitRouteTicket({ routeId }, "create");
    }

    if (
      this.props.submitRouteTicketError.message !==
        prevProps.submitRouteTicketError.message &&
      this.props.submitRouteTicketError.message
    ) {
      this.setState({
        error: this.props.submitRouteTicketError.message,
        showErrorModalVisible: true,
      });
      setTimeout(() => {
        this.setState({ showErrorModalVisible: false });
      }, 3000);
    }

    if (
      this.props.submitRouteTicketResult.message !==
        prevProps.submitRouteTicketResult.message &&
      this.props.submitRouteTicketResult.message
    ) {
      this.props.listenToRouteTicket({
        routeTicketId: this.props.submitRouteTicketResult.ids[0],
      });

      this.props.listenTransactions({
        routeTicketId: this.props.submitRouteTicketResult.ids[0]
      });

      this.setState({
        routeTicketId: this.props.submitRouteTicketResult.ids[0],
      });
    }
  }

  lookingForTicket({ routeId = null }) {
    const { userRouteTickets = [] } = this.props.routeTicketState;
    let routeTicketId = null;
    userRouteTickets.forEach((routeTicket) => {
      if (routeTicket.routeIds[0] === routeId) {
        routeTicketId = routeTicket.id;
      }
    });
    return routeTicketId;
  }

  toolTipPress() {
    this.setState((state) => ({
      toolTipVisible: !state.toolTipVisible,
    }));
  }

  onUnlockPress() {
    this.setState((state) => ({
      isVisible: !state.isVisible,
    }));
  }

  onShare() {
    const { settingInfo } = this.props;
    const { fbPost } = settingInfo.share;
    Linking.openURL(`https://www.facebook.com/sharer/sharer.php?u=${fbPost}`);

    setTimeout(() => {
      this.setState({ shared: true });
      console.log("Share successful");
    }, 3000);
  }

  onInvite() {
    const { settingInfo } = this.props;
    const { fbPost, title, message } = settingInfo.share;

    const shareOptions = {
      title,
      message: `${message} ${fbPost}`,
      url: fbPost,
      subject: title,
    };

    Share.share(shareOptions)
      .then(({ action, activityType }) => {
        if (action === Share.dismissedAction) {
          console.log("Share dismissed");
        } else {
          setTimeout(() => {
            this.setState({ invited: true });
            console.log("Share successfuld");
          }, 3000);
        }
      })
      .catch((error) => this.setState({ result: "error: " + error.message }));
  }

  handleModal = (mission) => {
    this.props.missionModalControl(mission);
  };

  onPay = (mission) => {
    const { routeId } = this.props.navigation.state.params;
    const routeTicketId = this.lookingForTicket({ routeId });
    const shopId = mission.shop.id;
    const missionId = mission.id;
    const payment = {
      amount: 50,
      paymentId: null,
      paymentType: "cash",
      receiptId: null,
      receiptPhotoUrl:
        "https://image.freepik.com/free-vector/realistic-receipt-template_23-2147938550.jpg",
      receiptUrl: null,
    };
    const data = { routeId, shopId, routeTicketId, missionId, payment };
    this.props.submitTransaction(data, "create");
  };

  onPayAmount = (mission) => {
    this.props.missionModalControl(mission);
    Actions.Amount({
      mission: mission,
      routeId: this.props.navigation.state.params.routeId,
    });
  };

  onCameraCheckIn = (mission) => {
    this.props.missionModalControl(mission);
    Actions.CameraCheckIn({
      mission: mission,
      routeId: this.props.navigation.state.params.routeId,
    });
  }

  mapPress() {
    //console.log(data)
    console.log('I am clicked')
  }

  onRulesPress = (rules, terms) => {
    Actions.Rules({ rules, terms });
  };

  onPrizesPress() {
    const { routeId } = this.props.navigation.state.params;
    Actions.Prizes({ routeId });
  };

  onCompletedPress() {
    const { routeId } = this.props.navigation.state.params;
    Actions.CompletedUser({ routeId });
  }

  render() {
    const transactions = this.props.transactions;
    const { routeTicket } = this.props.routeTicketState;
    const { route } = this.props.routeState;
    const { mission, modalActive } = this.props.missionState;
    const { rewards } = this.props.rewardState;
    const {
      submitRouteTicketLoading,
      readLoadingRouteTicket,
      readLoadingRoute,
      readLoadingMission,
      readLoadingReward,
    } = this.props;

    let { missions } = clone(this.props.missionState)

    const banner = route.images[0]
      ? route.images[0]
      : require("../../../../assets/banner.jpg");

    const map = route.station === 9 ? 
      require("../../../../assets/gogogain/RouteMap_FA_Ver2_Yellow.png") 
      : require("../../../../assets/gogogain/RouteMap_FA_Ver2_Blue.png") 

    const uncompleteMissions = [];
    const completedMissions = [];
    const processedMissions = [];

    missions.sort((a,b)=>{
      return a.minSpend - b.minSpend
    })

    missions.forEach((mission) => {
      const completedMission = routeTicket.completedMissions.filter((completedMission)=>{
        return completedMission.id === mission.id
      })

      if (completedMission.length > 0) {
        mission = {...mission, completed: true}

        // > for pending chop <
        /* if(transactions.length > 0){
          const transaction = transactions.filter((transaction) => {
            return transaction.mission.id === mission.id
          })

          if(transaction.length > 0){
            if(transaction[0].approved.by !== null){
              mission["transactionStatus"] = "approved"
            }else{
              mission["transactionStatus"] = "pending"
            }
          }
        } */

        processedMissions.push(mission)
        // completedMissions.push(mission)
      } else {
        mission = {...mission, completed: false}
        processedMissions.push(mission)
        // uncompleteMissions.push(mission);
      }
    });

    // missions = [...uncompleteMissions, ...completedMissions]

    const pendingTransaction = processedMissions.filter((mission) => {
      return mission.transactionStatus === "pending";
    });

    return (
      <SingleRoutes
        currency="RM"
        routeData={route}
        isJoined={this.state.routeTicketId ? true : false}
        routeTicketData={routeTicket}
        banner={banner}
        map={map}
        isVisible={this.state.isVisible}
        onUnlockPress={this.onUnlockPress.bind(this)}
        isUnlockLoading={submitRouteTicketLoading}
        facebookButtonTitle="Share our Facebook"
        inviteButtonTitle="Invite Friends"
        facebookSharePress={this.onShare.bind(this)}
        invitePress={this.onInvite.bind(this)}
        missionData={processedMissions}
        mission={mission}
        missionPress={this.handleModal.bind(this)}
        showModal={modalActive}
        descriptionTitle="Description"
        payTitle="Pay"
        pendingTransaction={pendingTransaction}
        onPay={this.onPay}
        onPayAmount={this.onPayAmount}
        onCameraCheckIn={this.onCameraCheckIn}
        onRulesPress={this.onRulesPress.bind(this)}
        onPrizesPress={this.onPrizesPress.bind(this)}
        onCompletedPress={this.onCompletedPress.bind(this)}
        readLoadingRouteTicket={readLoadingRouteTicket}
        readLoadingRoute={readLoadingRoute}
        readLoadingMission={readLoadingMission}
        readLoadingReward={readLoadingReward}
        errorSubmit={this.state.error}
        errorModal={this.state.showErrorModalVisible}
        errorHeader="Error"
      />
    );
  }
}

const mapStateToProps = (state) => {
  const routeTicketState = state.RouteTicket;
  const submitRouteTicketLoading = state.RouteTicket.submitLoading;
  const submitRouteTicketResult = state.RouteTicket.submitResult;
  const submitRouteTicketError = state.RouteTicket.submitError;
  const routeState = state.Route;
  const missionState = state.Mission;
  const rewardState = state.Reward;
  const settingInfo = state.Settings.info;

  const readLoadingRouteTicket = state.RouteTicket.readLoading;
  const readLoadingRoute = state.Route.readLoading;
  const readLoadingMission = state.Mission.readLoading;
  const readLoadingReward = state.Reward.readLoading;

  const transactions = state.Transaction.transactions;

  return {
    routeState,
    routeTicketState,
    missionState,
    rewardState,
    settingInfo,
    submitRouteTicketLoading,
    submitRouteTicketResult,
    submitRouteTicketError,
    readLoadingRouteTicket,
    readLoadingRoute,
    readLoadingMission,
    readLoadingReward,
    transactions
  };
};

export default connect(mapStateToProps, {
  submitRouteTicket,
  listenToRoute,
  removeListenerFromRoute,
  listenToRouteTicket,
  removeListenerFromRouteTicket,
  readMissions,
  missionModalControl,
  readRewards,
  submitTransaction,
  listenTransactions,
  removeListenTransactions
})(index);
