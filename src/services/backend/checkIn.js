import { backend } from "../../marslab-library-react-native/utils/helper";

const objectName = "CheckInTicket";
// httpCheckInTicketCreate
export function create({ data }) {
  return new Promise((resolve, reject) => {
    const apiName = `http${objectName}Create`;

    const { userIds } = data;

    data = {
      userIds,
    };
    data = backend.processData({ data });
    backend
      .callApi({ apiName, data })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("error: " + JSON.stringify(error));
        reject(error);
      });
  });
}

export function update({ data }) {
  return new Promise((resolve, reject) => {
    const apiName = `http${objectName}Update`;

    const { id, userIds } = data;

    data = {
      id,
      userIds,
    };

    data = backend.processData({ data });

    backend
      .callApi({ apiName, data })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function cancel({ data }) {
  return new Promise((resolve, reject) => {
    const apiName = `http${objectName}Cancel`;

    const { voucherIds, id } = data;

    data = {
      voucherIds,
      id,
    };
    data = backend.processData({ data });
    backend
      .callApi({ apiName, data })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("error: " + JSON.stringify(error));
        reject(error);
      });
  });
}

export function claim({ data }) {
  return new Promise((resolve, reject) => {
    const apiName = `http${objectName}Claim`;

    const { voucherIds, id } = data;

    data = {
      voucherIds,
      id,
    };
    data = backend.processData({ data });
    backend
      .callApi({ apiName, data })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("error: " + JSON.stringify(error));
        reject(error);
      });
  });
}
