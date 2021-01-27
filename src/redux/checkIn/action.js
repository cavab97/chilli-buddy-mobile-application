import { checkInDataServices } from "../../services/database";
import { checkInBackendServices } from "../../services/backend";

// import _ from "lodash";

const type = "checkIn";

const actions = {
  READ_FROM_DATABASE: type + "READ_FROM_DATABASE",
  READ_FROM_DATABASE_SUCCESS: type + "READ_FROM_DATABASE_SUCCESS",
  READ_FROM_DATABASE_ERROR: type + "READ_FROM_DATABASE_ERROR",

  SUBMIT_TO_BACKEND: type + "SUBMIT_TO_BACKEND",
  SUBMIT_TO_BACKEND_ERROR: type + "SUBMIT_TO_BACKEND_ERROR",
  SUBMIT_TO_BACKEND_SUCCESS: type + "SUBMIT_TO_BACKEND_SUCCESS",

  UPLOAD_TO_STORAGE: type + "UPLOAD_TO_STORAGE",
  UPLOAD_TO_STORAGE_SUCCESS: type + "UPLOAD_TO_STORAGE_SUCCESS",
  UPLOAD_TO_STORAGE_ERROR: type + "UPLOAD_TO_STORAGE_ERROR",
  UPDATE_UPLOAD_PROGRESS: type + "UPDATE_UPLOAD_PROGRESS",

  TOGGLE_MODAL: type + "TOGGLE_MODAL"

  //   UPDATE: type + "UPDATE",
};

// export const update = (data) => {
//   return {
//     type: actions.UPDATE,
//     payload: { data },
//   };
// };

export function readFromDatabase() {
  return (dispatch, getState) => {
    dispatch({ type: actions.READ_FROM_DATABASE });
    return new Promise(async (resolve, reject) => {
      try {
        const { uid } = getState().Auth.user;

        const checkIN = await checkInDataServices.readObjects({
          uid: uid,
        });

        resolve(checkIN);
        dispatch({
          type: actions.READ_FROM_DATABASE_SUCCESS,
          payload: { data: checkIN },
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

export function submitToBackend(data, actionName) {
  return (dispatch, getState) => {
    dispatch({ type: actions.SUBMIT_TO_BACKEND });
    return new Promise(async (resolve, reject) => {
      let result = {};
      const { uid, id } = data;

      data = {
        userIds: [uid],
        id: id
      };

      console.log(actionName)

      try {
        switch (actionName) {
          case "create":
            result = await checkInBackendServices.create({ data });
            break;
          case "update":
            result = await checkInBackendServices.update({ data });
            break;
        }

        resolve(result);
        dispatch({
          type: actions.SUBMIT_TO_BACKEND_SUCCESS,
          payload: { data: result },
        });
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

export const toggleModal = () => {
  return {
    type: actions.TOGGLE_MODAL,
    payload: { data },
  };
};

export default actions;
