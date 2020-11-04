import firebase from "firebase";

import {
    permissionsRegistration,
    LOCATION,
  } from "../../marslab-library-react-native/utils/system";
import { promoDataServices as objectDataServices } from "../../services/database";

const type = "promotion";

const actions = {
  PERMISSION_VERIFICATION: type + "PERMISSION_VERIFICATION",
  PERMISSION_VERIFICATION_SUCCESS: type + "PERMISSION_VERIFICATIONSUCCESS",
  PERMISSION_VERIFICATION_ERROR: type + "PERMISSION_VERIFICATION_ERROR",

  READ_FROM_DATABASE: type + "READ_FROM_DATABASE",
  READ_FROM_DATABASE_SUCCESS: type + "READ_FROM_DATABASE_SUCCESS",
  READ_FROM_DATABASE_ERROR: type + "READ_FROM_DATABASE_ERROR",

  READ_RECORD: type + "READ_RECORD",
  READ_RECORD_SUCCESS: type + "READ_RECORD_SUCCESS",
  READ_RECORD_ERROR: type + "READ_RECORD_ERROR",
};

export const COLLECTION = "promotionPackaging0";

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

export function readFromDatabase(groupId) {
  return (dispatch) => {
    dispatch({ type: actions.READ_FROM_DATABASE });
    return new Promise(async (resolve, reject) => {
      try {
        const promotions = await objectDataServices.readObjects(groupId);
        resolve(promotions);
        dispatch({
          type: actions.READ_FROM_DATABASE_SUCCESS,
          payload: { data: promotions },
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

export function loadShopsPromo({ radius, latitude, longtitude, selectedCategory = null, selectedTag = null }) {
  let limit = 0;
  return (dispatch) => {
    dispatch({ type: actions.READ_FROM_DATABASE });
    return new Promise(async (resolve, reject) => {
      try {
        radius < 15 ? (limit = 0) : (limit = 100);
        const promotions = await objectDataServices.geoReadObjects({
          l: { latitude, longtitude },
          radius,
          limit,
          selectedCategory,
          selectedTag
        });

        resolve(promotions);
        dispatch({ 
          type: actions.READ_FROM_DATABASE_SUCCESS,
          payload: { data: promotions },
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

export function listenToRecord({ promoId = null }) {
  return (dispatch) => {
    dispatch({ type: actions.READ_RECORD });
    console.log(`Start listen to shop with promo : ${promoId} `)
    try {
      objectDataServices.listenObject({
        objectId: promoId,
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
    console.log("Removed promo listener")
    objectDataServices.removeListenerToRecord();
  }
}

export default actions;