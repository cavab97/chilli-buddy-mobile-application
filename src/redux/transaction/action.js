import { transactionBackendServices } from "../../services/backend";
import { transactionStorageServices } from "../../services/storage";
import { transactionDataServices } from "../../services/database";

const type = "transaction";

const actions = {
  READ_BY_ROUTETICKET: type + "READ_BY_ROUTETICKET",
  READ_BY_ROUTETICKET_ERROR: type + "READ_BY_ROUTETICKET_ERROR",
  READ_BY_ROUTETICKET_SUCCESS: type + "READ_BY_ROUTETICKET_SUCCESS",

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

export function listenByRouteTicket({routeTicketId = null}) {
  return (dispatch, getState) => {
    dispatch({ type: actions.READ_BY_ROUTETICKET });
    try {

      console.log(`Start listen to transaction belong to route ticket : ${routeTicketId} `)

      transactionDataServices.listenObjectsByRouteTicket({
        routeTicketId: routeTicketId,
        updateListener: (data) => {
          dispatch({
            type: actions.READ_BY_ROUTETICKET_SUCCESS,
            payload: { data },
          });
        },
      });

    } catch (error) {
      console.log(error);
      dispatch({
        type: actions.READ_BY_ROUTETICKET_ERROR,
        payload: { error },
      });
    }
  };
}

export function removeListenByRouteTicket() {
  return (dispatch) => {
    console.log("Removed listener to transaction")
    transactionDataServices.unlistenObjectsByRouteTicket();
  }
}

export function submitToBackend(data, actionName) {
  return (dispatch, getState) => {
    dispatch({ type: actions.SUBMIT_TO_BACKEND });
    return new Promise(async (resolve, reject) => {
      let result = {};

      try {
        switch (actionName) {
          case "create":
            const { routeId, shopId, routeTicketId, missionId, payment } = data;
            data = {
              routeIds: [routeId],
              shopIds: [shopId],
              routeTicketIds: [routeTicketId],
              missionIds: [missionId],
              payment
            };
            
            result = await transactionBackendServices.create({ data });
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
        result = await transactionStorageServices
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
