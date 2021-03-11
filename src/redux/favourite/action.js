import { permissionsRegistration, LOCATION } from "../../marslab-library-react-native/utils/system";
import { favouriteDataServices as objectDataServices } from "../../services/database";
import { favouriteBackendServices } from "../../services/backend";

const type = "favourite";

const actions = {
  PERMISSION_VERIFICATION: type + "PERMISSION_VERIFICATION",
  PERMISSION_VERIFICATION_SUCCESS: type + "PERMISSION_VERIFICATIONSUCCESS",
  PERMISSION_VERIFICATION_ERROR: type + "PERMISSION_VERIFICATION_ERROR",

  READ_FROM_DATABASE: type + "READ_FROM_DATABASE",
  READ_FROM_DATABASE_SUCCESS: type + "READ_FROM_DATABASE_SUCCESS",
  READ_FROM_DATABASE_ERROR: type + "READ_FROM_DATABASE_ERROR",

  TOGGLE_FAVOURITE: type + "TOGGLE_FAVOURITE",
  TOGGLE_TAB: type + "TOGGLE_TAB",

  READ_FAVOURITE: type + "READ_FAVOURITE",
  READ_FAVOURITE_SUCCESS: type + "READ_FAVOURITE_SUCCESS",
  READ_FAVOURITE_ERROR: type + "READ_FAVOURITE_ERROR",

  READ_RECORD: type + "READ_RECORD",
  READ_RECORD_SUCCESS: type + "READ_RECORD_SUCCESS",
  READ_RECORD_ERROR: type + "READ_RECORD_ERROR",

  SUBMIT_TO_BACKEND: type + "SUBMIT_TO_BACKEND",
  SUBMIT_TO_BACKEND_ERROR: type + "SUBMIT_TO_BACKEND_ERROR",
  SUBMIT_TO_BACKEND_SUCCESS: type + "SUBMIT_TO_BACKEND_SUCCESS",

  UPDATE: type + "UPDATE",
};

//export const COLLECTION = "promotionPackaging0";

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

export function readFromDatabase() {
  // console.log("readFromDatabase11111111");
  return (dispatch, getState) => {
    dispatch({ type: actions.READ_FROM_DATABASE });
    return new Promise(async (resolve, reject) => {
      try {
        const { uid } = getState().Auth.user;
        const favourites = await objectDataServices.readObjects({
          groupId: uid,
        });
        resolve(favourites);
        dispatch({
          type: actions.READ_FROM_DATABASE_SUCCESS,
          payload: { data: favourites },
        });
      } catch (error) {
        reject(error);
        console.log(error);
        dispatch({
          type: actions.READ_FROM_DATABASE_ERROR,
          payload: { error },
        });
      }
    });
  };
}

export function updateIsFavourite(shopId) {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      const favourites = getState().Favourite.favourites;
      const newFavourites = favourites.map((favourite) => {
        if (favourite.shop.id === shopId) {
          favourite.isFavourite = !favourite.isFavourite;
        }
        return favourite;
      });

      resolve(newFavourites);
      dispatch({
        type: actions.TOGGLE_FAVOURITE,
        payload: { data: newFavourites },
      });
    });
  };
}

export function readSingleFavourite(shopId) {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      const favourites = getState().Favourite.favourites;
      const newFavourites = favourites.map((favourite) => {
        if (favourite.shop.id === shopId) {
          favourite.isFavourite = favourite.isFavourite;
        }
        return favourite;
      });

      resolve(newFavourites);
      dispatch({
        type: actions.TOGGLE_FAVOURITE,
        payload: { data: newFavourites },
      });
    });
  };
}

export function loadFavourite({
  radius,
  latitude,
  longtitude,
  selectedCategory = null,
  selectedTag = null,
}) {
  let limit = 0;
  return (dispatch, getState) => {
    dispatch({ type: actions.READ_FAVOURITE });
    return new Promise(async (resolve, reject) => {
      try {
        const { uid } = getState().Auth.user;
        radius < 15 ? (limit = 0) : (limit = 100);
        const favourites = await objectDataServices.geoReadObjects({
          l: { latitude, longtitude },
          radius,
          limit,
          selectedCategory,
          selectedTag,
          groupId: uid,
        });
        resolve(favourites);
        dispatch({
          type: actions.READ_FAVOURITE_SUCCESS,
          payload: { data: favourites },
        });
      } catch (error) {
        reject(error);
        dispatch({
          type: actions.READ_FAVOURITE_ERROR,
          payload: { error },
        });
      }
    });
  };
}

export function submitToBackend(data, actionName) {
  return (dispatch, getState) => {
    dispatch({ type: actions.SUBMIT_TO_BACKEND });
    return new Promise(async (resolve, reject) => {
      let result = {};

      try {
        switch (actionName) {
          case "create":
            const { shopId, isFavourite } = data;
            data = {
              shopIds: [shopId],
              isFavourite: isFavourite,
            };
            result = await favouriteBackendServices.create({ data });
            break;
          case "update":
            const { favouriteId } = data;
            data = {
              id: favouriteId,
              isFavourite: data.isFavourite,
            };
            result = await favouriteBackendServices.update({ data });
            break;
        }

        resolve(result);

        dispatch({
          type: actions.SUBMIT_TO_BACKEND_SUCCESS,
          payload: { data: result },
        });
        // dispatch({
        //   type: actions.READ_FROM_DATABASE_SUCCESS,
        //   payload: { data: result },
        // });
      } catch (error) {
        reject(error);
        console.log(error);
        dispatch({
          type: actions.SUBMIT_TO_BACKEND_ERROR,
          payload: { error },
        });
      }
    });
  };
}

export const toggleTab = () => {
  return {
    type: actions.TOGGLE_TAB,
  };
};

export default actions;
