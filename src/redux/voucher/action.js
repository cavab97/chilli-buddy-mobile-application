import { bookmarkDataServices as objectDataServices } from "../../services/database";

import moment from "moment";
const type = "voucher";

const actions = {
  READ_FROM_DATABASE: type + "READ_FROM_DATABASE",
  READ_FROM_DATABASE_SUCCESS: type + "READ_FROM_DATABASE_SUCCESS",
  READ_FROM_DATABASE_ERROR: type + "READ_FROM_DATABASE_ERROR",
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
            title: "Buy one get one free",
            salesPoint: "10%",
            expiredDate: moment().format("d/mm/yy"),
          },
          {
            id: "2",
            title: "Buy one get one free",
            salesPoint: "10%",
            expiredDate: moment().format("d/mm/yy"),
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

export default actions;
