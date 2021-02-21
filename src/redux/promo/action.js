import firebase from "firebase";

import { permissionsRegistration, LOCATION } from "../../marslab-library-react-native/utils/system";
import { promoDataServices as objectDataServices } from "../../services/database";

const type = "promotion";

const actions = {
  PERMISSION_VERIFICATION: type + "PERMISSION_VERIFICATION",
  PERMISSION_VERIFICATION_SUCCESS: type + "PERMISSION_VERIFICATIONSUCCESS",
  PERMISSION_VERIFICATION_ERROR: type + "PERMISSION_VERIFICATION_ERROR",

  READ_FROM_DATABASE: type + "READ_FROM_DATABASE",
  READ_FROM_DATABASE_SUCCESS: type + "READ_FROM_DATABASE_SUCCESS",
  READ_FROM_DATABASE_ERROR: type + "READ_FROM_DATABASE_ERROR",

  TOGGLE_PROMO_BOOKMARK: type + "TOGGLE_PROMO_BOOKMARK",
  TOGGLE_SWIPEABLE: type + 'TOGGLE_SWIPEABLE',
  TOGGLE_CATEGORY_MODAL: type + 'TOGGLE_CATEGORY_MODAL',
  TOGGLE_TAG_MODAL: type + 'TOGGLE_TAG_MODAL',
  TOGGLE_PROMOTION_MODAL: type + 'TOGGLE_PROMOTION_MODAL',

  TOGGLE_CATEGORY: type + 'TOGGLE_CATEGORY',
  TOGGLE_TAG: type + 'TOGGLE_TAG',
  TOGGLE_BOOKMARK: type + 'TOGGLE_BOOKMARK',

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

export function onBookmarkClick(promoId) {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      const promotions = getState().Promotion.promo;
      const newPromos = promotions.map((promotion) => {
        if (promotion.id === promoId) {
          promotion.isBookmark = !promotion.isBookmark;
        }
        return promotion;
      });

      resolve(newPromos);
      dispatch({
        type: actions.TOGGLE_PROMO_BOOKMARK,
        payload: { data: newPromos },
      });
    });
  };
}

export function loadShopsPromo({
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
        const promotions = await objectDataServices.geoReadObjects({
          l: { latitude, longtitude },
          radius,
          limit,
          selectedCategory,
          selectedTag,
        });
        const { uid } = getState().Auth.user;
        const { bookmarks } = getState().Bookmark;

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
    console.log(`Start listen to shop with promo : ${promoId} `);
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
    console.log("Removed promo listener");
    objectDataServices.removeListenerToRecord();
  };
}

export const toggleSwipeable = () => {
  return {
    type: actions.TOGGLE_SWIPEABLE,
  };
};

export const toggleCategoryModal = () => {
  return {
    type: actions.TOGGLE_CATEGORY_MODAL
  }
}

export const toggleCategory = (data = null) => {
  return{
    type: actions.TOGGLE_CATEGORY,
    payload: { data }
  }
}

export const toggleTagModal = () => {
  return {
    type: actions.TOGGLE_TAG_MODAL
  }
}

export const toggleTag = (data = null) => {
  return{
    type: actions.TOGGLE_TAG,
    payload: { data }
  }
}

export const togglePromotionModal = () => {
  return {
    type: actions.TOGGLE_PROMOTION_MODAL
  }
}

export const toggleBookmark = () => {
  return {
    type: actions.TOGGLE_BOOKMARK
  }
}

export default actions;
