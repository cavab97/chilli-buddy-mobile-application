import { backend } from "../../marslab-library-react-native/utils/helper";

const objectName = "Voucher";

export function redeem({
    data
  }) {
    return new Promise((resolve, reject) => {
      const apiName = `http${objectName}Redeem`;

      console.log(data)

      const {
        id,
        merchantIds
      } = data;

      data = {
        id,
        merchantIds
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