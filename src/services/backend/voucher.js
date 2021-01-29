import { backend } from "../../marslab-library-react-native/utils/helper";

const objectName = "Voucher";

export function create({
    data
  }) {
    return new Promise((resolve, reject) => {
      const apiName = `http${objectName}Redeem`;

      const {
        id
      } = data;

      data = {
        id
      }

      data = backend.processData({ data })

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