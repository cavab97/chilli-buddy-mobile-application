import React from "react";
import { Scene, Stack, Tabs } from "react-native-router-flux";

import MainScreen from "../screens/main/MainScreen";
import Shops from "../screens/main/Shops";
import Promo from "../screens/main/Promo";
import Profile from "../screens/main/Profile";
import SpinningWheel from "../screens/subscreen/SpinningWheel";
import SearchScreen from "../screens/subscreen/SearchScreen";

import RouteGroups from "../screens/main/RouteGroups";

import userForm from "../screens/auth/UserForm";
import CameraProfile from "../screens/subscreen/CameraProfile";

import Shop from "../screens/main/Shops/SingleMerchant";
import ShopPromo from "../screens/main/Promo/SingleMerchantPromo";

import Routes from "../screens/main/RouteGroups/Routes";
import Route from "../screens/main/RouteGroups/Route";

import Advertisement from "../screens/main/Advertisement";

import Amount from "../screens/subscreen/payment/Amount";
import PaymentDetail from "../screens/subscreen/payment/Method";
import CameraReceipt from "../screens/subscreen/payment/CameraReceipt";
import SubmitReceipt from "../screens/subscreen/payment/SubmitReceipt";
import SingleVoucherRedeem from "../screens/subscreen/Voucher/SingleVoucherRedeem";
import RedeemedVoucherScreen from "../screens/subscreen/Voucher/RedeemedVoucherScreen";

import Rules from "../screens/subscreen/Rules";

import CompletedUser from "../screens/subscreen/CompletedUser";
import Prizes from "../screens/subscreen/Prizes";

import RouteRanking from "../screens/subscreen/rank/RouteRanking";
import EventRanking from "../screens/subscreen/rank/EventRanking";
import LuckyDrawRanking from "../screens/subscreen/rank/LuckyDrawRanking";
import LuckyDrawWinnerRanking from "../screens/subscreen/rank/LuckyDrawWinnerRanking";
import RedeemPage from "../screens/subscreen/RedeemPage";
import HelpCenter from "../screens/subscreen/HelpCenter";
import Bookmark from "../screens/subscreen/Bookmark";
import Voucher from "../screens/subscreen/Voucher";
import SingleVoucher from "../screens/subscreen/Voucher/SingleVoucher";
import CheckIn from "../screens/subscreen/CheckIn";

import LoginTACScreen from "../screens/auth/TAC";
import Favourite from "../screens/subscreen/Favourite";

import ShopsSinglePost from "../screens/main/Shops/ShopsSinglePost";
import styles from "./styles";
import * as icons from "./icons";
import { Colors } from "../settings/styles/theme";

export const authRoute = () => {
  return <Scene key="loginTAC" component={LoginTACScreen} hideNavBar />;
};

const routes = ({ isLoggedIn, isBooted, forceUpdate }) => {
  return (
    <Stack
      hideNavBar={true}
      initial={isLoggedIn && isBooted && !forceUpdate}
      tabBarStyle={{ backgroundColor: Colors.PRIMARY }}
    >
      {/* mainScreen  */}
      <Stack key="MainScreen">
        <Scene
          key="MainScreen"
          component={MainScreen}
          title="MainScreen"
          titleStyle={styles.title}
          initial={true}
          icon={icons.announce}
          hideNavBar={true}
        />
      </Stack>

      <Stack key="Promo" back>
        <Scene
          key="Promo"
          component={Promo}
          //title="Promo"
          hideNavBar={true}
          titleStyle={styles.title}
          navigationBarStyle={{ borderBottomColor: "transparent", elevation: 0, marginLeft: 5 }}
        />
      </Stack>

      <Stack key="Profile" back>
        <Scene
          key="Profile"
          component={Profile}
          // title="Profile"
          titleStyle={styles.title}
          navigationBarStyle={{ borderBottomColor: "transparent", elevation: 0, marginLeft: 5 }}
        />
      </Stack>
      <Stack key="SpinningWheel" back>
        <Scene
          key="SpinningWheel"
          component={SpinningWheel}
          // title="dsdsdsds"
          titleStyle={styles.title}
          navigationBarStyle={{ borderBottomColor: "transparent", elevation: 0, marginLeft: 5 }}
        />
      </Stack>

      <Stack key="SearchScreen">
        <Scene
          key="SearchScreen"
          component={SearchScreen}
          // title="dsdsdsds"
          titleStyle={styles.title}
          navigationBarStyle={{ borderBottomColor: "transparent", elevation: 0, marginLeft: 5 }}
          hideNavBar={true}
        />
      </Stack>

      <Stack key="ShopsSinglePost" back>
        <Scene
          key="ShopsSinglePost"
          component={ShopsSinglePost}
          // title="dsdsdsds"
          titleStyle={styles.title}
          navigationBarStyle={{ borderBottomColor: "transparent", elevation: 0, marginLeft: 5 }}
        />
      </Stack>
      {/* 
      <Stack key="CheckIn" back>
        <Scene
          key="CheckIn"
          component={CheckIn}
          titleStyle={styles.title}
          navigationBarStyle={{ borderBottomColor: "transparent", elevation: 0 }}
        />
      </Stack> */}
      {/* <Stack key="RedeemedVoucherScreen">
        <Scene
          key="RedeemedVoucherScreen"
          component={RedeemedVoucherScreen}
          title="Redeem Voucher"
          titleStyle={styles.title}
        />
      </Stack> */}
      {/* <Stack key="Shops" back>
        <Scene key="Shops" component={Shops} title="Shops" titleStyle={styles.title} />
      </Stack>
      */}
      <Stack key="Shops" back>
        <Scene
          key="Shops"
          component={Shops}
          //title="Shops"
          titleStyle={styles.title}
          navigationBarStyle={{ borderBottomColor: "transparent", elevation: 0, marginLeft: 5 }}
        />
      </Stack>
      <Stack key="SingleMerchant" back>
        <Scene
          key="SingleMerchant"
          component={Shop}
          // title="Shop"
          navTransparent={true}
          titleStyle={styles.title}
          navigationBarStyle={{ borderBottomColor: "transparent", elevation: 0, marginLeft: 5 }}
        />
      </Stack>
      <Stack key="SingleMerchantPromo" back>
        <Scene
          key="SingleMerchantPromo"
          component={ShopPromo}
          overlay
          //title="Promo"
          titleStyle={styles.title}
        />
      </Stack>
      {/* <Stack key="EditProfile" back>
        <Scene key="EditProfile" component={userForm} title="Profile" titleStyle={styles.title} />
      </Stack> */}
      <Stack key="CameraProfile" back>
        <Scene
          key="CameraProfile"
          component={CameraProfile}
          title="Profile Image"
          titleStyle={styles.title}
        />
      </Stack>
      <Stack key="Route" back>
        <Scene key="Route" component={Route} title="Route" titleStyle={styles.title} />
      </Stack>
      <Stack key="Routes" back>
        <Scene key="Routes" component={Routes} title="Routes" titleStyle={styles.title} />
      </Stack>
      <Stack key="Advertisement" back>
        <Scene key="Advertisement" component={Advertisement} title="Advertisement" />
      </Stack>
      <Stack key="Amount">
        <Scene key="Amount" component={Amount} hideNavBar />
      </Stack>
      <Stack key="PaymentDetail" back>
        <Scene
          key="PaymentDetail"
          component={PaymentDetail}
          title="Payment Detail"
          titleStyle={styles.title}
        />
      </Stack>
      <Stack key="CameraReceipt" back>
        <Scene
          key="CameraReceipt"
          component={CameraReceipt}
          title="Camera Your Receipt"
          titleStyle={styles.title}
        />
      </Stack>
      <Stack key="CameraCheckIn" back>
        <Scene
          key="CameraCheckIn"
          component={CameraReceipt}
          title="Selfie Time"
          titleStyle={styles.title}
        />
      </Stack>
      <Stack key="SubmitReceipt" back>
        <Scene
          key="SubmitReceipt"
          component={SubmitReceipt}
          title="Pay By Cash"
          titleStyle={styles.title}
        />
      </Stack>
      <Stack key="Prizes" back>
        <Scene key="Prizes" component={Prizes} title="Prizes" titleStyle={styles.title} />
      </Stack>
      <Stack key="Rules" back>
        <Scene key="Rules" component={Rules} title="Rules" titleStyle={styles.title} />
      </Stack>
      <Stack key="CompletedUser" back>
        <Scene
          key="CompletedUser"
          component={CompletedUser}
          title="Completed User"
          titleStyle={styles.title}
        />
      </Stack>
      <Stack key="RouteRanking" back>
        <Scene
          key="RouteRanking"
          component={RouteRanking}
          title="Ranking"
          titleStyle={styles.title}
        />
      </Stack>
      <Stack key="EventRanking" back>
        <Scene
          key="EventRanking"
          component={EventRanking}
          title="Ranking"
          titleStyle={styles.title}
        />
      </Stack>
      <Stack key="LuckyDrawRanking" back>
        <Scene
          key="LuckyDrawRanking"
          component={LuckyDrawRanking}
          title="Ranking"
          titleStyle={styles.title}
        />
      </Stack>
      <Stack key="LuckyDrawWinnerRanking" back>
        <Scene
          key="LuckyDrawWinnerRanking"
          component={LuckyDrawWinnerRanking}
          title="Ranking"
          titleStyle={styles.title}
        />
      </Stack>
      {/* <Stack key="EditProfile" back>
        <Scene
          key="EditProfile"
          component={userForm}
          // title="Edit Profile"
          titleStyle={styles.title}
          // hideNavBar={true}
          navigationBarStyle={{ borderBottomColor: "transparent", elevation: 0 }}
        />
      </Stack> */}

      <Stack key="EditProfile" back>
        <Scene
          key="EditProfile"
          component={userForm}
          title=" "
          titleStyle={styles.title}
          navigationBarStyle={{ borderBottomColor: "transparent", elevation: 0, marginLeft: 5 }}
        />
      </Stack>
      {/* <Stack key="Promo" back>
        <Scene
          key="Promo"
          component={Promo}
          //title="Promo"
          hideNavBar={true}
          titleStyle={styles.title}
          navigationBarStyle={{ borderBottomColor: "transparent", elevation: 0 }}
        />
      </Stack> */}
      <Stack key="RedeemPage" back>
        <Scene key="RedeemPage" component={RedeemPage} title="Redeem" titleStyle={styles.title} />
      </Stack>
      <Stack key="HelpCenter" back>
        <Scene
          key="HelpCenter"
          component={HelpCenter}
          title=""
          navigationBarStyle={{ borderBottomColor: "transparent", elevation: 0, marginLeft: 5 }}
          titleStyle={styles.title}
        />
      </Stack>
      <Stack key="Bookmark" back>
        <Scene key="Bookmark" component={Bookmark} title="Bookmark" titleStyle={styles.title} />
      </Stack>
      <Stack key="Favourite" back>
        <Scene
          key="Favourite"
          component={Favourite}
          title="Favourite"
          titleStyle={styles.title}
          navigationBarStyle={{ borderBottomColor: "transparent", elevation: 0, marginLeft: 5 }}
          hideNavBar={true}
        />
      </Stack>

      <Stack key="CheckIn" back>
        <Scene
          key="CheckIn"
          component={CheckIn}
          titleStyle={styles.title}
          navigationBarStyle={{ borderBottomColor: "transparent", elevation: 0, marginLeft: 5 }}
        />
      </Stack>
      <Stack key="Voucher" back>
        <Scene
          key="Voucher"
          component={Voucher}
          //title="Vouchers"
          titleStyle={styles.title}
          navigationBarStyle={{ borderBottomColor: "transparent", elevation: 0, marginLeft: 5 }}
        />
      </Stack>
      <Stack key="SingleVoucher" back>
        <Scene
          key="SingleVoucher"
          navTransparent={true}
          component={SingleVoucher}
          title={SingleVoucher.title}
          titleStyle={styles.title}
        />
      </Stack>
      <Stack key="SingleVoucherRedeem" back>
        <Scene
          key="SingleVoucherRedeem"
          component={SingleVoucherRedeem}
          title="Scan Merchant QR Code"
          titleStyle={styles.title}
        />
      </Stack>
      <Stack key="RedeemedVoucherScreen">
        <Scene
          key="RedeemedVoucherScreen"
          component={RedeemedVoucherScreen}
          title="Redeem Voucher"
          titleStyle={styles.title}
        />
      </Stack>
    </Stack>
  );
};

export default routes;
