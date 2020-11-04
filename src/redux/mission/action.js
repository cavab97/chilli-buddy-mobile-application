import { missionDataServices as objectDataServices } from "../../services/database";
import { routeTicketBackendServices } from "../../services/backend";

const type = "mission";

const actions = {
  READ_FROM_DATABASE: type + "READ_FROM_DATABASE",
  READ_FROM_DATABASE_SUCCESS: type + "READ_FROM_DATABASE_SUCCESS",
  READ_FROM_DATABASE_ERROR: type + "READ_FROM_DATABASE_ERROR",

  READ_RECORD: type + "READ_RECORD",
  READ_RECORD_SUCCESS: type + "READ_RECORD_SUCCESS",
  READ_RECORD_ERROR: type + "READ_RECORD_ERROR",

  SUBMIT_TO_BACKEND: type + "SUBMIT_TO_BACKEND",
  SUBMIT_TO_BACKEND_ERROR: type + "SUBMIT_TO_BACKEND_ERROR",
  SUBMIT_TO_BACKEND_SUCCESS: type + "SUBMIT_TO_BACKEND_SUCCESS",

  MODAL_CONTROL: type + 'MODAL_CONTROL',
  UPDATE: type + "UPDATE",
};

export const update = (data) => {
  return {
    type: actions.UPDATE,
    payload: { data },
  };
};

export const modalControl = (data = null) => {
  return{
    type: actions.MODAL_CONTROL,
    payload: { data },
  }
}

export function readFromDatabase({ routeId = null }) {
  return (dispatch, getState) => {
    dispatch({ type: actions.READ_FROM_DATABASE });
    return new Promise(async (resolve, reject) => {
      try {
        
        const missions = await objectDataServices.readObjects({
          groupId: routeId,
        });

        resolve(missions);
        dispatch({
          type: actions.READ_FROM_DATABASE_SUCCESS,
          payload: { data: missions },
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

export function listenFromDatabase({ routeId = null }) {
  return (dispatch, getState) => {
    dispatch({ type: actions.READ_FROM_DATABASE });
    try {
      
      console.log(`Start listen to missions belong to route : ${routeId} `)
      objectDataServices.listenObjects({
        groupId: routeId,
        updateListener: (data) => {
          dispatch({
            type: actions.READ_FROM_DATABASE_SUCCESS,
            payload: { data },
          });
        },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: actions.READ_FROM_DATABASE_ERROR,
        payload: { error },
      });
    }
  };
}

export function removeListenerFromDatabase() {
  return (dispatch) => {
    console.log("Removed listener from missions")
    objectDataServices.unlistenObjects();
  }
}

export function listenToRecord({ missionId = null }) {
  return (dispatch) => {
    dispatch({ type: actions.READ_RECORD });
    console.log(`Start listen to mission : ${missionId} `)
    try {
      objectDataServices.listenObject({
        objectId: missionId,
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
    console.log("Removed mission listener")
    objectDataServices.unlistenObject();
  }
}

// export function submitToBackend(data, actionName) {
//   return (dispatch, getState) => {
//     dispatch({ type: actions.SUBMIT_TO_BACKEND });
//     return new Promise(async (resolve, reject) => {
//       let result = {};

//       const { routeId } = data;
//       const routeIds = [routeId]

//       try {
//         switch (actionName) {
//           case "create":
//             result = await routeTicketBackendServices.create({data: {routeIds}})
//             break;
//         }

//         resolve(result);
//         dispatch({
//           type: actions.SUBMIT_TO_BACKEND_SUCCESS,
//           payload: { data: result },
//         });
//       } catch (error) {
//         console.log(error);
//         reject(error);
//         dispatch({
//           type: actions.SUBMIT_TO_BACKEND_ERROR,
//           payload: { error },
//         });
//       }
//     });
//   };
// }

export default actions;
