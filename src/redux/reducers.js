//Main
import shopsReducer from "./shops/reducer";
import shopPostReducer from "./shopPost/reducer";

import routeGroupReducer from "./routeGroup/reducer";
import routeReducer from "./route/reducer";
import routeTicketReducer from "./routeTicket/reducer";

import missionReducer from "./mission/reducer";
import rewardReducer from "./reward/reducer";
import eventReducer from "./event/reducer";

import transactionReducer from "./transaction/reducer";

//Other
import advertisementsReducer from "./advertisement/reducer";
import settingsReducer from "./settings/reducer";
import promoReducer from "./promo/reducer";
import bookmarkReducer from "./bookmark/reducer";
import voucherReducer from "./voucher/reducer";

import checkInReducer from "./checkIn/reducer";
import favouriteReducer from "./favourite/reducer";

export default combineReducers = {
  Advertisement: advertisementsReducer,
  Shops: shopsReducer,
  ShopPost: shopPostReducer,
  Settings: settingsReducer,
  RouteGroup: routeGroupReducer,
  Route: routeReducer,
  RouteTicket: routeTicketReducer,
  Event: eventReducer,
  Mission: missionReducer,
  Reward: rewardReducer,
  Transaction: transactionReducer,
  Promotion: promoReducer,
  Bookmark: bookmarkReducer,
  Voucher: voucherReducer,
  CheckIn: checkInReducer,
  Favourite: favouriteReducer
};
