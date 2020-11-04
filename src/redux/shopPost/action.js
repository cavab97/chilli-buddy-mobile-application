import { shopPostDataServices } from "../../services/database";

const type = "shopPost";

const actions = {
  READ_FROM_DATABASE: type + "READ_FROM_DATABASE",
  READ_FROM_DATABASE_SUCCESS: type + "READ_FROM_DATABASE_SUCCESS",
  READ_FROM_DATABASE_ERROR: type + "READ_FROM_DATABASE_ERROR",

  READ_RECORD: type + "READ_RECORD",
  READ_RECORD_SUCCESS: type + "READ_RECORD_SUCCESS",
  READ_RECORD_ERROR: type + "READ_RECORD_ERROR",

  UPDATE: type + "UPDATE",
};

export const update = (data) => {
  return {
    type: actions.UPDATE,
    payload: { data },
  };
};

export function readFromDatabase(groupId) {
  return (dispatch) => {
    dispatch({ type: actions.READ_FROM_DATABASE });
    return new Promise(async (resolve, reject) => {
      try {
        const posts = await shopPostDataServices.readObjects(groupId);
        resolve(posts);
        dispatch({
          type: actions.READ_FROM_DATABASE_SUCCESS,
          payload: { data: posts },
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

// export function listenFromDatabase() {
//   return (dispatch) => {
//     dispatch({ type: actions.READ_FROM_DATABASE });
//     try {
//       console.log(`Start listen to entire route group.`)
//       shopPostDataServices.listenObjects({
//         updateListener: (data) => {
//           dispatch({
//             type: actions.READ_FROM_DATABASE_SUCCESS,
//             payload: { data },
//           });
//         },
//       });
//     } catch (error) {
//       console.log(error);
//       dispatch({
//         type: actions.READ_FROM_DATABASE_ERROR,
//         payload: { error },
//       });
//     }
//   };
// }

// export function removeListenerFromDatabase(){
//   return (dispatch) => {
//     console.log("Remove listener from route groups.")
//     shopPostDataServices.unlistenObjects();
//   }
// }

// export function listenToRecord({ postId = null,  }) {
//   return (dispatch) => {
//     dispatch({ type: actions.READ_RECORD });
//     console.log(`Start listen to route group : ${postId} `)
//     try {
//       shopPostDataServices.listenObject({
//         objectId: postId,
//         updateListener: (data) => {
//           dispatch({
//             type: actions.READ_RECORD_SUCCESS,
//             payload: { data },
//           });
//         },
//       });
//     } catch (error) {
//       console.log(error);
//       dispatch({
//         type: actions.READ_RECORD_ERROR,
//         payload: { error },
//       });
//     }
//   };
// }

// export function removeListenerToRecord() {
//   return (dispatch) => {
//     console.log("Removed route group listener")
//     shopPostDataServices.unlistenObject();
//   }
// }



export default actions;
