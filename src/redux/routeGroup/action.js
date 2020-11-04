import { routeGroupDataServices } from "../../services/database";
import { authBackendServices } from "../../services/backend";

const type = "routeGroup";

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

  UPDATE: type + "UPDATE",
};

export const update = (data) => {
  return {
    type: actions.UPDATE,
    payload: { data },
  };
};

export function readFromDatabase() {
  return (dispatch) => {
    dispatch({ type: actions.READ_FROM_DATABASE });
    return new Promise(async (resolve, reject) => {
      try {
        const routeGroups = await routeGroupDataServices.readObjects();
        resolve(routeGroups);
        dispatch({
          type: actions.READ_FROM_DATABASE_SUCCESS,
          payload: { data: routeGroups },
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

export function listenFromDatabase() {
  return (dispatch) => {
    dispatch({ type: actions.READ_FROM_DATABASE });
    try {
      console.log(`Start listen to entire route group.`)
      routeGroupDataServices.listenObjects({
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

export function removeListenerFromDatabase(){
  return (dispatch) => {
    console.log("Remove listener from route groups.")
    routeGroupDataServices.unlistenObjects();
  }
}

export function listenToRecord({ routeGroupId = null,  }) {
  return (dispatch) => {
    dispatch({ type: actions.READ_RECORD });
    console.log(`Start listen to route group : ${routeGroupId} `)
    try {
      routeGroupDataServices.listenObject({
        objectId: routeGroupId,
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
    console.log("Removed route group listener")
    routeGroupDataServices.unlistenObject();
  }
}



export default actions;
