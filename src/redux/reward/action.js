import { rewardDataServices as objectDataServices } from "../../services/database";

const type = "reward";

const actions = {
  READ_FROM_DATABASE: type + "READ_FROM_DATABASE",
  READ_FROM_DATABASE_SUCCESS: type + "READ_FROM_DATABASE_SUCCESS",
  READ_FROM_DATABASE_ERROR: type + "READ_FROM_DATABASE_ERROR",

  READ_FROM_EVENT_REWARDS: type + "READ_FROM_EVENT_REWARDS",
  READ_FROM_EVENT_REWARDS_SUCCESS: type + "READ_FROM_EVENT_REWARDS_SUCCESS",
  READ_FROM_EVENT_REWARDS_ERROR: type + "READ_FROM_EVENT_REWARDS_ERROR",

  READ_FROM_OWN_REWARDS: type + "READ_FROM_OWN_REWARDS",
  READ_FROM_OWN_REWARDS_SUCCESS: type + "READ_FROM_OWN_REWARDS_SUCCESS",
  READ_FROM_OWN_REWARDS_ERROR: type + "READ_FROM_OWN_REWARDS_ERROR",

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
        
        const rewards = await objectDataServices.readObjects({
          groupId: routeId,
        });

        resolve(rewards);
        dispatch({
          type: actions.READ_FROM_DATABASE_SUCCESS,
          payload: { data: rewards },
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

export function readEventRewards({ eventId = null }) {
  return (dispatch, getState) => {
    dispatch({ type: actions.READ_FROM_EVENT_REWARDS});
    return new Promise(async (resolve, reject) => {
      try {
        
        const eventRewards = await objectDataServices.readEventRewards({
          eventId
        });

        resolve(eventRewards);
        dispatch({
          type: actions.READ_FROM_EVENT_REWARDS_SUCCESS,
          payload: { data: eventRewards },
        });
      } catch (error) {
        console.log(error);
        reject(error);
        dispatch({
          type: actions.READ_FROM_EVENT_REWARDS_ERROR,
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
      
      console.log(`Start listen to rewards belong to route : ${routeId} `)
      objectDataServices.listenObjects({
        groupId: routeId,
        updateListener: (data) => {
          dispatch({
            type: actions.READ_FROM_DATABASE_SUCCESS,
            payload: { data },
          });
        },
      });
    }catch (error) {
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
    console.log("Removed listener from rewards")
    objectDataServices.unlistenObjects();
  }
}

export function listenToOwnRewards() {
  return (dispatch, getState) => {
    dispatch({ type: actions.READ_FROM_OWN_REWARDS });
    try {
      console.log(`Start listen to own rewards `)
      const uid = getState().Auth.user.uid;
      objectDataServices.listenOwnRewards({
        uid,
        updateListener: (data) => {
          dispatch({
            type: actions.READ_FROM_OWN_REWARDS_SUCCESS,
            payload: { data },
          });
        },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: actions.READ_FROM_OWN_REWARDS_ERROR,
        payload: { error },
      });
    }
  };
}

export function removeListenerFromOwnRewards() {
  return (dispatch) => {
    console.log("Removed listener from own rewards")
    objectDataServices.unlistenOwnRewards();
  }
}

export function listenToRecord({ rewardId = null }) {
  return (dispatch) => {
    dispatch({ type: actions.READ_RECORD });
    console.log(`Start listen to reward : ${rewardId} `)
    try {
      objectDataServices.listenObject({
        objectId: rewardId,
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
    console.log("Removed reward listener")
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
