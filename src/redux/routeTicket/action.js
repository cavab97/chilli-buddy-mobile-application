import { routeTicketDataServices as objectDataServices } from "@services/database";
import { routeTicketBackendServices } from "@services/backend";

const type = "routeTicket";

const actions = {
  READ_FROM_DATABASE: type + "READ_FROM_DATABASE",
  READ_FROM_DATABASE_SUCCESS: type + "READ_FROM_DATABASE_SUCCESS",
  READ_FROM_DATABASE_ERROR: type + "READ_FROM_DATABASE_ERROR",

  READ_BY_USER: type + "READ_BY_USER",
  READ_BY_USER_SUCCESS: type + "READ_BY_USER_SUCCESS",
  READ_BY_USER_ERROR: type + "READ_BY_USER_ERROR",

  READ_BY_OBJECTGROUP: type + "READ_BY_OBJECTGROUP",
  READ_BY_OBJECTGROUP_SUCCESS: type + "READ_BY_OBJECTGROUP_SUCCESS",
  READ_BY_OBJECTGROUP_ERROR: type + "READ_BY_OBJECTGROUP_ERROR",

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
  return (dispatch, getState) => {
    dispatch({ type: actions.READ_BY_USER });
    return new Promise(async (resolve, reject) => {
      try {

        const { uid } = getState().Auth.user;
        const routes = await objectDataServices.readObjects({
          groupId: uid,
        });

        resolve(routes);
        dispatch({
          type: actions.READ_BY_USER_SUCCESS,
          payload: { data: routes },
        });
      } catch (error) {
        console.log(error);
        reject(error);
        dispatch({
          type: actions.READ_BY_USER_ERROR,
          payload: { error },
        });
      }
    });
  };
}

export function readByObjectGroup({routeId = null}) {
  return (dispatch, getState) => {
    dispatch({ type: actions.READ_BY_OBJECTGROUP });
    return new Promise(async (resolve, reject) => {
      try {
        const routes = await objectDataServices.readObjectsByObjectGroup({
          groupId: routeId,
        });

        resolve(routes);
        dispatch({
          type: actions.READ_BY_OBJECTGROUP_SUCCESS,
          payload: { data: routes },
        });
      } catch (error) {
        console.log(error);
        reject(error);
        dispatch({
          type: actions.READ_BY_OBJECTGROUP_ERROR,
          payload: { error },
        });
      }
    });
  };
}

export function listenFromDatabase() {
  return (dispatch, getState) => {
    dispatch({ type: actions.READ_FROM_DATABASE });
    try {
      const { uid } = getState().Auth.user
      
      console.log(`Start listen to route ticket belong to user : ${uid} `)
      objectDataServices.listenObjects({
        groupId: uid,
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
    console.log("Removed listener to route ticket")
    objectDataServices.unlistenObjects();
  }
}

export function listenToRecord({ routeTicketId = null }) {
  return (dispatch) => {
    dispatch({ type: actions.READ_RECORD });
    console.log(`Start listen to route ticket : ${routeTicketId} `)
    try {
      objectDataServices.listenObject({
        objectId: routeTicketId,
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
    console.log("Removed route Ticket listener")
    objectDataServices.unlistenObject();
    dispatch(update(null))
  }
}

export function submitToBackend(data, actionName) {
  return (dispatch, getState) => {
    dispatch({ type: actions.SUBMIT_TO_BACKEND });
    return new Promise(async (resolve, reject) => {
      let result = {};

      const { routeId } = data;
      const routeIds = [routeId];

      try {
        switch (actionName) {
          case "create":
            result = await routeTicketBackendServices.create({data: {routeIds}})
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

export default actions;
