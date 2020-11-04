import { backend } from "../../marslab-library-react-native/utils/helper";

const objectName = "RouteTicket";

export function create({
    data
  }) {
    return new Promise((resolve, reject) => {
      const apiName = `http${objectName}Create`;

      const {
        routeIds
      } = data;

      data = {
        routeIds
      }

      data = backend.processData({data})

      backend
        .callApi({ apiName, data })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }