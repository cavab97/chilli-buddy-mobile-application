import { routeDataServices } from "../../services/database";
import _ from "lodash"

const type = "route";

const actions = {
  READ_ALL_FROM_DATABASE: type + "READ_ALL_FROM_DATABASE",
  READ_ALL_FROM_DATABASE_SUCCESS: type + "READ_ALL_FROM_DATABASE_SUCCESS",
  READ_ALL_FROM_DATABASE_ERROR: type + "READ_ALL_FROM_DATABASE_ERROR",

  READ_FROM_DATABASE: type + "READ_FROM_DATABASE",
  READ_FROM_DATABASE_SUCCESS: type + "READ_FROM_DATABASE_SUCCESS",
  READ_FROM_DATABASE_ERROR: type + "READ_FROM_DATABASE_ERROR",

  READ_CLOSED_ROUTES : type + "READ_CLOSED_ROUTES",
  READ_CLOSED_ROUTES_SUCCESS: type + "READ_CLOSED_ROUTES_SUCCESS",
  READ_CLOSED_ROUTES_ERROR: type + "READ_CLOSED_ROUTES_ERROR",
 
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

export function readAllFromDatabase() {
  return (dispatch, getState) => {
    dispatch({ type: actions.READ_ALL_FROM_DATABASE });
    return new Promise(async (resolve, reject) => {
      try {
        const allRoutes = await routeDataServices.readAllObjects();

        resolve(allRoutes);
        dispatch({
          type: actions.READ_ALL_FROM_DATABASE_SUCCESS,
          payload: { data: allRoutes },
        });
      } catch (error) {
        console.log(error);
        reject(error);
        dispatch({
          type: actions.READ_ALL_FROM_DATABASE_ERROR,
          payload: { error },
        });
      }
    });
  };
}



export function readFromDatabase({ routeGroupId = null }) {
  return (dispatch, getState) => {
    dispatch({ type: actions.READ_FROM_DATABASE });
    return new Promise(async (resolve, reject) => {
      try {
        const routes = await routeDataServices.readObjects({
          groupId: routeGroupId,
        });

        resolve(routes);
        dispatch({
          type: actions.READ_FROM_DATABASE_SUCCESS,
          payload: { data: routes },
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

export function readClosedRoutes() {
  return (dispatch, getState) => {
    dispatch({ type: actions.READ_CLOSED_ROUTES });
    return new Promise(async (resolve, reject) => {
      try {
        const closedRoutes = await routeDataServices.readEndedRoutes()
        
        resolve(closedRoutes);
        dispatch({
          type: actions.READ_CLOSED_ROUTES_SUCCESS,
          payload: { data: closedRoutes },
        });
      } catch (error) {
        console.log(error);
        reject(error);
        dispatch({
          type: actions.READ_CLOSED_ROUTES_ERROR,
          payload: { error },
        });
      }
    });
  };
}

export function listenFromDatabase({ routeGroupId = null }) {
  return (dispatch) => {
    dispatch({ type: actions.READ_FROM_DATABASE });
    console.log(`Start listen to routes belong to route group : ${routeGroupId} `)
    try {
      routeDataServices.listenObjects({
        groupId: routeGroupId,
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
    console.log("Removed route listener belong to route group.")
    routeDataServices.unlistenObjects();
  }
}

export function listenToRecord({ routeId = null,  }) {
  return (dispatch) => {
    dispatch({ type: actions.READ_RECORD });
    console.log(`Start listen to route : ${routeId} `)
    try {
      routeDataServices.listenObject({
        objectId: routeId,
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
    console.log("Removed route listener")
    routeDataServices.unlistenObject();
    dispatch(update(null))
  }
}

// export function submitToBackend(data, actionName) {
//   return (dispatch, getState) => {
//     dispatch({ type: actions.SUBMIT_TO_BACKEND });
//     return new Promise(async (resolve, reject) => {
//       let result = {};

//       try {
//         switch (actionName) {
//           case "updateProfile":
//             result = await authBackendServices.updateProfile({data})
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
