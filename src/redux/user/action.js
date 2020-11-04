import { userDataServices } from "../../services/database";
import { authBackendServices } from "../../services/backend";
import { userStorageServices } from "../../services/storage";

const type = "user";

const actions = {
  READ_FROM_DATABASE: type + "READ_FROM_DATABASE",
  READ_FROM_DATABASE_SUCCESS: type + "READ_FROM_DATABASE_SUCCESS",
  READ_FROM_DATABASE_ERROR: type + "READ_FROM_DATABASE_ERROR",

  SUBMIT_TO_BACKEND: type + "SUBMIT_TO_BACKEND",
  SUBMIT_TO_BACKEND_ERROR: type + "SUBMIT_TO_BACKEND_ERROR",
  SUBMIT_TO_BACKEND_SUCCESS: type + "SUBMIT_TO_BACKEND_SUCCESS",

  UPLOAD_TO_STORAGE: type + "UPLOAD_TO_STORAGE",
  UPLOAD_TO_STORAGE_SUCCESS: type + "UPLOAD_TO_STORAGE_SUCCESS",
  UPLOAD_TO_STORAGE_ERROR : type + "UPLOAD_TO_STORAGE_ERROR",
  UPDATE_UPLOAD_PROGRESS : type+ "UPDATE_UPLOAD_PROGRESS",

  UPDATE: type + "UPDATE",
};

export const update = (data) => {
  return {
    type: actions.UPDATE,
    payload: { data },
  };
};

export function readFromDatabase() {
  return (dispatch, getState) => {
    dispatch({ type: actions.READ_FROM_DATABASE });
    return new Promise(async (resolve, reject) => {
      try {
        const uid = getState().Auth.user.uid;
        const user = await userDataServices.readOwnInfo({ uid });
        resolve(user);
        dispatch({
          type: actions.READ_FROM_DATABASE_SUCCESS,
          payload: { data: user },
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

      try {
        switch (actionName) {
          case "updateProfile":
            result = await authBackendServices.updateProfile({data})
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

export function uploadToStorage(data) {
  return (dispatch) => {
    dispatch({ type: actions.UPLOAD_TO_STORAGE });
    return new Promise(async (resolve, reject) => {
      let result = {};
      const { id, file, name } = data;
  
      try {
        result = await userStorageServices
        .uploadFile({ 
          id, 
          file, 
          name,  
          progressListener: snap => {
            const progress = Math.round(
              (snap.bytesTransferred / snap.totalBytes) * 100
            );
            dispatch({
              type: actions.UPDATE_UPLOAD_PROGRESS,
              payload: { data: progress },
            });
          }
        });
        
        resolve(result);
        dispatch({
          type: actions.UPLOAD_TO_STORAGE_SUCCESS,
          payload: { data: result },
        });

      } catch (error) {
        console.log(error);
        reject(error);
        dispatch({
          type: actions.UPLOAD_TO_STORAGE_ERROR,
          payload: { error },
        });
      }
    });
  };
} 

export default actions;
