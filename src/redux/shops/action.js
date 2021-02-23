import firebase from "firebase";
import {
  GeoCollectionReference,
  GeoFirestore,
  GeoQuery,
  GeoQuerySnapshot,
  encodeGeohash,
} from "geofirestore";
import { Actions } from "react-native-router-flux";

import { permissionsRegistration, LOCATION } from "../../marslab-library-react-native/utils/system";
import { shopDataServices as objectDataServices } from "../../services/database";

const type = "shop";

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

  TOGGLE_SHOP_FAVOURITE: type + "TOGGLE_SHOP_FAVOURITE",
  TOGGLE_SHOP_FAVOURITE_ERROR: type + "TOGGLE_SHOP_FAVOURITE_ERROR",
  TOGGLE_CATEGORY: type + "TOGGLE_CATEGORY",
  TOGGLE_FAVOURITE: type + "TOGGLE_FAVOURITE",
  TOGGLE_TAG: type + "TOGGLE_TAG",
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

export function loadShops({
  radius,
  latitude,
  longtitude,
  selectedCategory = null,
  selectedTag = null,
}) {
  let limit = 0;
  return (dispatch, getState) => {
    dispatch({ type: actions.READ_FROM_DATABASE });
    return new Promise(async (resolve, reject) => {
      try {
        radius < 15 ? (limit = 0) : (limit = 100);
        const shops = await objectDataServices.geoReadObjects({
          l: { latitude, longtitude },
          radius,
          limit,
          selectedCategory,
          selectedTag,
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

/* export function loadShops({ radius, latitude, longtitude, selectedCategory }) {
  let limit = 0;
  return (dispatch) => {
    dispatch({ type: actions.READ_FROM_DATABASE });
    return new Promise((resolve, reject) => {
      radius < 15 ? (limit = 0) : (limit = 100);
      selectedCategory !== null &&
        geoCollectionReference
          .where("categories", "array-contains-any", [selectedCategory])
          .where("deleted.at", "==", null)
          .limit(limit)
          .near({
            center: new firebase.firestore.GeoPoint(latitude, longtitude),
            radius: radius,
          })
          .get()
          .then((snapshot) => {
            let Data = [];

            snapshot.forEach(function (doc) {
              if (doc.data().deleted.at === null) {
                Data.push({ ...doc, id: doc.id });
              }
            });

            Data.sort((a, b) => a.distance - b.distance);

            Data = Data.map((item) => {
              return { ...item.data(), distance: item.distance, id: item.id };
            });
            resolve(Data);
            dispatch({ type: actions.READ_FROM_DATABASE_SUCCESS });
          })
          .catch((error) => {
            console.log(error);
            dispatch({ type: actions.READ_FROM_DATABASE_ERROR });

            reject(error);
          });

      selectedCategory === null &&
        geoCollectionReference
          .limit(limit)
          .where("deleted.at", "==", null)
          .near({
            center: new firebase.firestore.GeoPoint(latitude, longtitude),
            radius: radius,
          })
          .get()
          .then((snapshot) => {
            var Data = [];

            snapshot.forEach(function (doc) {
              //console.log(doc.data().displayName, doc.data().deleted_at)
              //   if (doc.data().deleted.at === null) {
              Data.push({ ...doc, id: doc.id });
              //   }
            });

            Data.sort((a, b) => a.distance - b.distance);

            Data = Data.map((item) => {
              return { ...item.data(), distance: item.distance, id: item.id };
            });
            resolve(Data);
            dispatch({ type: actions.READ_FROM_DATABASE_SUCCESS });
          })
          .catch((error) => {
            console.log(error);
            dispatch({ type: actions.READ_FROM_DATABASE_ERROR });

            reject(error);
          });
    });
  };
}
 */
export function readFromDatabase(groupId) {
  return (dispatch) => {
    dispatch({ type: actions.READ_PROMO_FROM_DATABASE });
    return new Promise(async (resolve, reject) => {
      try {
        const promotions = await objectDataServices.readObjects(groupId);
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

export function onFavouriteClick(shopId) {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      try {
        const shops = getState().Shops.shops;
        const newShops = shops.map((shop) => {
          if (shop.id === shopId) {
            shop.isFavourite = !shop.isFavourite;
          }
          return shop;
        });
        resolve(newShops);
        dispatch({
          type: actions.TOGGLE_SHOP_FAVOURITE,
          payload: { data: newShops },
        });
      } catch (error) {
        console.log(error);
        dispatch({
          type: actions.TOGGLE_SHOP_FAVOURITE_ERROR,
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

export default actions;
