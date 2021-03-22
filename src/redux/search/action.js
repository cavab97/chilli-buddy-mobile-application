import firebase from "firebase";
import { GeoFirestore } from "geofirestore";

import * as Location from "expo-location";
import { AsyncStorage } from "react-native";

import { permissionsRegistration, LOCATION } from "../../marslab-library-react-native/utils/system";
import { shopSearchDataServices as objectDataServices } from "../../services/database";
let temp = [];
temp.length = 5;

const type = "search";

const actions = {
  PERMISSION_VERIFICATION: type + "PERMISSION_VERIFICATION",
  PERMISSION_VERIFICATION_SUCCESS: type + "PERMISSION_VERIFICATIONSUCCESS",
  PERMISSION_VERIFICATION_ERROR: type + "PERMISSION_VERIFICATION_ERROR",

  READ_FROM_DATABASE: type + "READ_FROM_DATABASE",
  READ_FROM_DATABASE_SUCCESS: type + "READ_FROM_DATABASE_SUCCESS",
  READ_FROM_DATABASE_ERROR: type + "READ_FROM_DATABASE_ERROR",

  READ_PROMO_FROM_DATABASE: type + "READ_PROMO_FROM_DATABASE",
  READ_PROMO_FROM_DATABASE_SUCCESS: type + "READ_PROMO_FROM_DATABASE_SUCCESS",
  READ_PROMO_FROM_DATABASE_ERROR: type + "READ_PROMO_FROM_DATABASE_ERROR",

  READ_RECORD: type + "READ_RECORD",
  READ_RECORD_SUCCESS: type + "READ_RECORD_SUCCESS",
  READ_RECORD_ERROR: type + "READ_RECORD_ERROR",

  TOGGLE_SEARCH_PROMO_SHOP_FAVOURITE: type + "TOGGLE_SEARCH_PROMO_SHOP_FAVOURITE",
  TOGGLE_SEARCH_PROMO_SHOP_FAVOURITE_ERROR: type + "TOGGLE_SEARCH_PROMO_SHOP_FAVOURITE_ERROR",

  TOGGLE_SEARCH_SHOP_FAVOURITE: type + "TOGGLE_SEARCH_SHOP_FAVOURITE",
  TOGGLE_SEARCH_SHOP_FAVOURITE_ERROR: type + "TOGGLE_SEARCH_SHOP_FAVOURITE_ERROR",

  TOGGLE_SEARCH_SHOP_MESSAGES: type + "TOGGLE_SEARCH_SHOP_MESSAGES",
  TOGGLE_SEARCH_SHOP_MESSAGES_BUTTON: type + "TOGGLE_SEARCH_SHOP_MESSAGES_BUTTON",

  TOGGLE_CATEGORY: type + "TOGGLE_CATEGORY",
  TOGGLE_FAVOURITE: type + "TOGGLE_FAVOURITE",
  TOGGLE_TAG: type + "TOGGLE_TAG",

  READ_SEARCH_HISTORY: type + "READ_SEARCH_HISTORY",
  READ_SEARCH_HISTORY_SUCCESS: type + "READ_SEARCH_HISTORY_SUCCESS",
  READ_SEARCH_HISTORY_ERROR: type + "READ_SEARCH_HISTORY_ERROR",

  REMOVE_SEARCH_HISTORY_SUCCESS: type + "REMOVE_SEARCH_HISTORY_SUCCESS",
};

const { firestore } = firebase;

export const COLLECTION = "shopPrivate0";
// Create a GeoFirestore reference
const geoFirestore = new GeoFirestore(firestore());

// Create a GeoCollection reference
const geoCollectionReference = geoFirestore.collection(COLLECTION);

export function verifyPermission() {
  return (dispatch) => {
    dispatch({ type: actions.PERMISSION_VERIFICATION });
    return new Promise(async (resolve, reject) => {
      try {
        const [locationPermission] = await permissionsRegistration([LOCATION]);
        const permissions = { location: locationPermission };
        resolve(permissions);
        dispatch({
          type: actions.PERMISSION_VERIFICATION,
          payload: { data: { permissions } },
        });
      } catch (error) {
        reject(error);
        console.log(error);
        dispatch({
          type: actions.PERMISSION_VERIFICATION_ERROR,
          payload: { error },
        });
      }
    });
  };
}

export function loadSearchShops({
  radius,
  selectedCategory = null,
  selectedTag = null,
  shopName = null,
  address = null,
}) {
  let limit = 0;
  return (dispatch, getState) => {
    dispatch({ type: actions.READ_FROM_DATABASE });
    return new Promise(async (resolve, reject) => {
      try {
        let location = await Location.getCurrentPositionAsync({});
        let latitude = location.coords.latitude;
        let longtitude = location.coords.longitude;

        radius < 35 ? (limit = 0) : (limit = 200);
        const shops = await objectDataServices.geoReadObjects({
          l: { latitude, longtitude },
          radius,
          limit,
          selectedCategory,
          selectedTag,
          shopName,
          address,
        });

        const { uid } = getState().Auth.user;
        const { favourites } = getState().Favourite;
        shops.map((shop) => {
          const isFavourite = favourites.filter((favourite) => {
            return favourite.shopIds[0] === shop.id;
          });

          if (isFavourite.length > 0) {
            shop.isFavourite = isFavourite[0].isFavourite;
          } else {
            shop.isFavourite = false;
          }
        });

        resolve(shops);

        dispatch({
          type: actions.READ_FROM_DATABASE_SUCCESS,
          payload: { data: shops },
        });
      } catch (error) {
        console.log(error);

        reject(error);
        dispatch({
          type: actions.READ_FROM_DATABASE_ERROR,
          payload: { error },
        });
      }
    });
  };
}

export function loadShopsPromo({
  radius,
  selectedCategory = null,
  selectedTag = null,
  shopName = null,
}) {
  let limit = 0;
  return (dispatch, getState) => {
    dispatch({ type: actions.READ_PROMO_FROM_DATABASE });
    return new Promise(async (resolve, reject) => {
      try {
        let location = await Location.getCurrentPositionAsync({});
        let latitude = location.coords.latitude;
        let longtitude = location.coords.longitude;
        radius < 15 ? (limit = 0) : (limit = 100);
        const promotions = await objectDataServices.ReadObjects({
          l: { latitude, longtitude },
          radius,
          limit,
          selectedCategory,
          selectedTag,
          shopName,
        });
        const { uid } = getState().Auth.user;
        const { bookmarks } = getState().Bookmark;
        // console.log("bookMarks");
        // console.log(bookmarks);

        promotions.map((promotion) => {
          const isBookmark = bookmarks.filter((bookmark) => {
            return bookmark.promotion.id === promotion.id;
          });

          if (isBookmark.length > 0) {
            promotion.isBookmark = isBookmark[0].isBookmark;
          } else {
            promotion.isBookmark = false;
          }
        });
        resolve(promotions);
        dispatch({
          type: actions.READ_PROMO_FROM_DATABASE_SUCCESS,
          payload: { data: promotions },
        });
      } catch (error) {
        console.log(error);
        reject(error);
        dispatch({
          type: actions.READ_PROMO_FROM_DATABASE_ERROR,
          payload: { error },
        });
      }
    });
  };
}

export function listenToRecord({ shopId = null }) {
  return (dispatch) => {
    dispatch({ type: actions.READ_RECORD });
    console.log(`Start listen to shop : ${shopId} `);
    try {
      objectDataServices.listenObject({
        objectId: shopId,
        updateListener: (data) => {
          dispatch({
            type: actions.READ_RECORD_SUCCESS,
            payload: { data },
          });
        },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: actions.READ_RECORD_ERROR,
        payload: { error },
      });
    }
  };
}

export function removeListenerToRecord() {
  return (dispatch) => {
    // Actions.refresh({});
    console.log("Removed shop listener");
    objectDataServices.removeListenerToRecord();
  };
}

export function onPromoSpecificClick(shopId) {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      try {
        const promos = getState().Search.promos;

        let isFavourited = null;
        const newShops = promos.map((shop) => {
          if (shop.id === shopId) {
            shop.isBookmark = !shop.isBookmark;
            isFavourited = shop;
          }
          return shop;
        });
        resolve(newShops, isFavourited);
        const data = { promos: newShops, promo: isFavourited };
        dispatch({
          type: actions.TOGGLE_SEARCH_PROMO_SHOP_FAVOURITE,
          payload: { data },
        });
      } catch (error) {
        console.log(error);
        dispatch({
          type: actions.TOGGLE_SEARCH_PROMO_SHOP_FAVOURITE_ERROR,
          payload: { error },
        });
      }
    });
  };
}

export function onShopSpecificClick(shopId) {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      try {
        const shops = getState().Search.shops;

        let isFavourited = null;
        const newShops = shops.map((shop) => {
          if (shop.id === shopId) {
            shop.isFavourite = !shop.isFavourite;
            isFavourited = shop;
          }
          return shop;
        });
        resolve(newShops, isFavourited);
        const data = { shops: newShops, shop: isFavourited };
        dispatch({
          type: actions.TOGGLE_SEARCH_SHOP_FAVOURITE,
          payload: { data },
        });
      } catch (error) {
        console.log(error);
        dispatch({
          type: actions.TOGGLE_SEARCH_SHOP_FAVOURITE_ERROR,
          payload: { error },
        });
      }
    });
  };
}

export const toggleCategory = (data = null) => {
  return {
    type: actions.TOGGLE_CATEGORY,
    payload: { data },
  };
};

export const toggleSearchMessage = (data = null) => {
  return {
    type: actions.TOGGLE_SEARCH_SHOP_MESSAGES,
    payload: { data },
  };
};
export const toggleSearchMessageMain = () => {
  return {
    type: actions.TOGGLE_SEARCH_SHOP_MESSAGES_BUTTON,
  };
};

export const toggleFavourite = () => {
  return {
    type: actions.TOGGLE_FAVOURITE,
  };
};

export const toggleTag = (data = null) => {
  return {
    type: actions.TOGGLE_TAG,
    payload: { data },
  };
};

export const searchHistory = (value, actionName) => {
  let result = {};
  const key = "searchHistory";
  return (dispatch, getState) => {
    dispatch({ type: actions.READ_SEARCH_HISTORY });
    return new Promise(async (resolve, reject) => {
      try {
        const historySearchStore = getState().Search.historySearchStore;

        switch (actionName) {
          case "create":
            try {
              if (value.length !== 0) {
                console.log("trigger here");
                if (historySearchStore === null || historySearchStore === undefined) {
                  console.log("1st");
                  temp.push(value);
                } else if (Object.keys(historySearchStore).length === 0) {
                  console.log("2nd");
                  temp = [value];
                } else if (value !== "null") {
                  console.log("3rd");
                  temp = [...historySearchStore, value];
                } else {
                  temp = [...historySearchStore];
                }
              }

              if (temp.length > 5) {
                let filtered = temp.slice(1);
                AsyncStorage.setItem(key, JSON.stringify(filtered));
                result = filtered;
              } else if (value.length !== 0) {
                let filtered = temp;

                AsyncStorage.setItem(key, JSON.stringify(filtered));
                result = filtered;
              }
            } catch (error) {
              console.log(error);
              // alert(error);
            }
            break;
          case "read":
            await AsyncStorage.getItem(key).then((data) => {
              let tempArray = JSON.parse(data);
              resolve(tempArray);
              result = tempArray;
            });
            break;
          case "remove":
            // await AsyncStorage.getItem(key).then((data) => {
            //   // console.log("data");
            //   temp = data;
            //   resolve(temp);
            //   result = temp;
            // });
            // let filtered = historySearchStore.filter(prod, (index) => index !== value);
            let filtered = historySearchStore.filter((item, index) => index !== value);

            console.log("filtered remove specific");
            console.log(filtered);
            // let filtered = temp.slice(1);
            AsyncStorage.setItem(key, JSON.stringify(filtered));
            // console.log("datAsyncStoragea");
            result = filtered;
            break;
          case "clear":
            await AsyncStorage.removeItem(key).then((data) => {
              console.log("REMOVE_SEARCH_HISTORY_SUCCESS");
              const status = "Remove Data Success";
              resolve(status);
              dispatch({
                type: actions.REMOVE_SEARCH_HISTORY_SUCCESS,
              });
            });
            break;
        }
        dispatch({
          type: actions.READ_SEARCH_HISTORY_SUCCESS,
          payload: { data: result },
        });
      } catch (error) {
        console.log(error);
        reject(error);
        dispatch({
          type: actions.READ_SEARCH_HISTORY_ERROR,
          payload: { error },
        });
      }
    });
  };
};

export default actions;
