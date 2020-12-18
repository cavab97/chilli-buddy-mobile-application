import { permissionsRegistration, LOCATION } from "../../marslab-library-react-native/utils/system";
import { bookmarkDataServices as objectDataServices } from "../../services/database";
import { bookmarkBackendServices } from "../../services/backend";

const type = "bookmark";

const actions = {
  PERMISSION_VERIFICATION: type + "PERMISSION_VERIFICATION",
  PERMISSION_VERIFICATION_SUCCESS: type + "PERMISSION_VERIFICATIONSUCCESS",
  PERMISSION_VERIFICATION_ERROR: type + "PERMISSION_VERIFICATION_ERROR",

  READ_FROM_DATABASE: type + "READ_FROM_DATABASE",
  READ_FROM_DATABASE_SUCCESS: type + "READ_FROM_DATABASE_SUCCESS",
  READ_FROM_DATABASE_ERROR: type + "READ_FROM_DATABASE_ERROR",

  TOGGLE_BOOKMARK: type + "TOGGLE_BOOKMARK",

  READ_BOOKMARK: type + "READ_BOOKMARK",
  READ_BOOKMARK_SUCCESS: type + "READ_BOOKMARK_SUCCESS",
  READ_BOOKMARK_ERROR: type + "READ_BOOKMARK_ERROR",

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
  return (dispatch, getState) => {
    dispatch({ type: actions.READ_FROM_DATABASE });
    return new Promise(async (resolve, reject) => {
      try {
        const { uid } = getState().Auth.user;
        const bookmarks = await objectDataServices.readObjects({
          groupId: uid,
        });
        resolve(bookmarks);
        dispatch({
          type: actions.READ_FROM_DATABASE_SUCCESS,
          payload: { data: bookmarks },
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

export function updateIsBookmark(promoId) {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      const bookmarks = getState().Bookmark.bookmarks;
      const newBookmarks = bookmarks.map((bookmark) => {
        if (bookmark.promotion.id === promoId) {
          bookmark.isBookmark = !bookmark.isBookmark;
        }
        return bookmark;
      });

      resolve(newBookmarks);
      dispatch({
        type: actions.TOGGLE_BOOKMARK,
        payload: { data: newBookmarks },
      });
    });
  };
}

export function loadBookmark({
  radius,
  latitude,
  longtitude,
  selectedCategory = null,
  selectedTag = null,
}) {
  let limit = 0;
  return (dispatch, getState) => {
    dispatch({ type: actions.READ_BOOKMARK });
    return new Promise(async (resolve, reject) => {
      try {
        const { uid } = getState().Auth.user;
        radius < 15 ? (limit = 0) : (limit = 100);
        const bookmarks = await objectDataServices.geoReadObjects({
          l: { latitude, longtitude },
          radius,
          limit,
          selectedCategory,
          selectedTag,
          groupId: uid,
        });
        resolve(bookmarks);
        dispatch({
          type: actions.READ_BOOKMARK_SUCCESS,
          payload: { data: bookmarks },
        });
      } catch (error) {
        reject(error);
        dispatch({
          type: actions.READ_BOOKMARK_ERROR,
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
            const { shopId, promoId, isBookmark } = data;
            data = {
              shopIds: [shopId],
              promo: [promoId],
              isBookmark: isBookmark,
            };
            result = await bookmarkBackendServices.create({ data });
            break;
          case "update":
            const { bookmarkId } = data;
            data = {
              id: bookmarkId,
              isBookmark: data.isBookmark,
            };
            result = await bookmarkBackendServices.update({ data });
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
        console.log(error);
        reject(error);
        dispatch({
          type: actions.SUBMIT_TO_BACKEND_ERROR,
          payload: { error },
        });
      }
    });
  };
}

export default actions;
