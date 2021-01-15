import { settingsDataServices } from "../../services/database";

const type = "settings";

const actions = {
  READ_FROM_DATABASE: type + "READ_FROM_DATABASE",
  READ_FROM_DATABASE_SUCCESS: type + "READ_FROM_DATABASE_SUCCESS",
  READ_FROM_DATABASE_ERROR: type + "READ_FROM_DATABASE_ERROR",

  READ_INFO: type + "READ_INFO",
  READ_INFO_SUCCESS: type + "READ_INFO_SUCCESS",
  READ_INFO_ERROR: type + "READ_INFO_ERROR",

  TOGGLE_SPINNING_WHEEL_MODAL: type + "TOGGLE_SPINNING_WHEEL_MODAL",
};

export function readFromDatabase() {
  return (dispatch) => {
    dispatch({ type: actions.READ_FROM_DATABASE });
    return new Promise(async (resolve, reject) => {
      try {
        const getCategories = settingsDataServices.readCategories();
        const getTags = settingsDataServices.readTags();

        const [categories, tags] = await Promise.all([getCategories, getTags]);

        resolve({ categories, tags });
        dispatch({
          type: actions.READ_FROM_DATABASE_SUCCESS,
          payload: { data: { categories, tags } },
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

export function readInfo() {
  return (dispatch) => {
    dispatch({ type: actions.READ_INFO });
    return new Promise(async (resolve, reject) => {
      try {
        const info = await settingsDataServices.readInfo();

        resolve({ info });
        dispatch({
          type: actions.READ_INFO_SUCCESS,
          payload: { data: { info } },
        });
      } catch (error) {
        console.log(error);
        reject(error);
        dispatch({
          type: actions.READ_INFO_ERROR,
          payload: { error },
        });
      }
    });
  };
}

export const toggleSpinningWheelModal = (data = null) => {
  return {
    type: actions.TOGGLE_SPINNING_WHEEL_MODAL,
    payload: { data }
  };
};

export default actions;
