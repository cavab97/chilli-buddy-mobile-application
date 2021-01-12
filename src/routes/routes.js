import React from "react";
import { Scene, Stack } from "react-native-router-flux";

import MainScreen from "../screens/main/MainScreen";
import Shops from "../screens/main/Shops";
import Promo from "../screens/main/Promo";

import RouteGroups from "../screens/main/RouteGroups";
import Profile from "../screens/main/Profile";

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

import LoginTACScreen from "../screens/auth/TAC";

import styles from "./styles";
import * as icons from "./icons";
import { Colors } from "../settings/styles/theme";
import { StatusBar } from "@components/atoms";

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
      <Stack
        key="main"
        hideNavBar={true}
        tabs={true}
        initial={true}
        activeTintColor={Colors.SECONDARY}
        showLabel={false}
      >
        <Scene
          key="mainscreen"
          component={MainScreen}
          title="Main"
          titleStyle={styles.title}
          initial={true}
          icon={icons.announce}
          hideNavBar={true}
        />
        {/* <Scene
                    key="Shops"
                    component={Shops}
                    title="Shops"
                    titleStyle={styles.title}
                    initial={false}
                    icon={icons.merchant}
                /> */}
        <Scene
          key="Promo"
          component={Promo}
          title="Promo"
          titleStyle={styles.title}
          initial={false}
          icon={icons.promo}
        />
        {/* <Scene
                    key="RouteGroups"
                    component={RouteGroups}
                    title="Event"
                    titleStyle={styles.title}
                    initial={false}
                    icon={icons.award}
                /> */}
        <Scene
          key="Profile"
          component={Profile}
          title="Profile"
          titleStyle={styles.title}
          initial={false}
          icon={icons.profile}
          hideNavBar={true}
        />
      </Stack>
      <Stack key="Shops" back>
        <Scene key="Shops" component={Shops} title="Shops" titleStyle={styles.title} />
      </Stack>
      <Stack key="SingleMerchant" back>
        <Scene key="SingleMerchant" component={Shop} title="Shop" titleStyle={styles.title} />
      </Stack>

      <Stack key="SingleMerchantPromo" back>
        <Scene
          key="SingleMerchantPromo"
          component={ShopPromo}
          title="Promo"
          titleStyle={styles.title}
        />
      </Stack>

      <Stack key="EditProfile" back>
        <Scene key="EditProfile" component={userForm} title="Profile" titleStyle={styles.title} />
      </Stack>

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

      <Stack key="EditProfile" back>
        <Scene
          key="EditProfile"
          component={userForm}
          title="Edit Profile"
          titleStyle={styles.title}
        />
      </Stack>
      <Stack key="RedeemPage" back>
        <Scene key="RedeemPage" component={RedeemPage} title="Redeem" titleStyle={styles.title} />
      </Stack>
      <Stack key="HelpCenter" back>
        <Scene
          key="HelpCenter"
          component={HelpCenter}
          title="Help Center"
          titleStyle={styles.title}
        />
      </Stack>
      <Stack key="Bookmark" back>
        <Scene key="Bookmark" component={Bookmark} title="Bookmark" titleStyle={styles.title} />
      </Stack>

      <Stack key="Voucher" back>
        <Scene key="Voucher" component={Voucher} title="Voucher" titleStyle={styles.title} />
      </Stack>
    </Stack>
  );
};

export default routes;
