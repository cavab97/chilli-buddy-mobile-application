import { backend } from "../../marslab-library-react-native/utils/helper";

const objectName = "Transaction";

export function create({
  data : { shopIds, routeTicketIds, routeIds, missionIds, payment },
}) {
  return new Promise((resolve, reject) => {
    const apiName = `http${objectName}Create`;

    data = backend.processData({ data : { shopIds, routeTicketIds, routeIds, missionIds, payment } });

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
