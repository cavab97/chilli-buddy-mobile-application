import firebase from "firebase";
import {
  GeoCollectionReference,
  GeoFirestore,
  GeoQuery,
  GeoQuerySnapshot,
  encodeGeohash,
} from "geofirestore";

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

  READ_RECORD: type + "READ_RECORD",
  READ_RECORD_SUCCESS: type + "READ_RECORD_SUCCESS",
  READ_RECORD_ERROR: type + "READ_RECORD_ERROR",
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

export function loadShops({ radius, latitude, longtitude, selectedCategory }) {
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
    console.log("Removed shop listener");
    objectDataServices.removeListenerToRecord();
  };
}

export default actions;
