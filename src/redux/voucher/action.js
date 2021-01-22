import { bookmarkDataServices as objectDataServices } from "../../services/database";

import moment from "moment";
const type = "voucher";

const actions = {
  READ_FROM_DATABASE: type + "READ_FROM_DATABASE",
  READ_FROM_DATABASE_SUCCESS: type + "READ_FROM_DATABASE_SUCCESS",
  READ_FROM_DATABASE_ERROR: type + "READ_FROM_DATABASE_ERROR",
  SUBMIT_TO_BACKEND: type + "SUBMIT_TO_BACKEND",
  SUBMIT_TO_BACKEND_SUCCESS: type + "SUBMIT_TO_BACKEND_SUCCESS",
  SUBMIT_TO_BACKEND_ERROR: type + "SUBMIT_TO_BACKEND_ERROR",
};

//export const COLLECTION = "promotionPackaging0";

export function readFromDatabase() {
  return (dispatch, getState) => {
    dispatch({ type: actions.READ_FROM_DATABASE });
    return new Promise(async (resolve, reject) => {
      try {
        const { uid } = getState().Auth.user;
        // const vouchers = await objectDataServices.readObjects({
        //   groupId: uid,
        //   title: "Buy one get one free",
        //   salesPoint: "10%",
        //   expiredDate: moment().format("d/mm/yy"),
        // });
        const temp = [
          {
            id: "1",
            title: "RM12 Off",
            salesPoint: "10%",
            amount: "RM20",
            description: "Happy New Year Big Offer",
            expiredDate: moment().format("d/mm/yy"),
            MerchantName: "Marslab Solution Sdn.Bhd",
            status: true,
          },
          {
            id: "2",
            title: "Year End Sales ",
            salesPoint: "10%",
            amount: "RM20",
            description: "Festival Moon",
            expiredDate: moment().format("d/mm/yy"),
            MerchantName: "The Store",
            status: false,
          },
        ];
        // const vouchers = await temp.readObjects({
        //   groupId: uid,
        // });
        // _refresh(context) {
        //   let promise = new Promise((resolve) => {
        //     setTimeout(() => {
        //       resolve()
        //     }, 2000);
        //     setTimeout(() => {
        //        this.updateUI();
        //        this.setState({ refreshing: true });
        //    }, 2000);
        //   })

        //   return promise
        //   }

        setTimeout(() => {
          resolve(temp);
          dispatch({
            type: actions.READ_FROM_DATABASE_SUCCESS,
            payload: { data: temp },
          });
        }, 2000);
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

      const { routeId } = data;
      const routeIds = [routeId];

      try {
        switch (actionName) {
          case "create":
            result = await routeTicketBackendServices.create({ data: { routeIds } });
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
