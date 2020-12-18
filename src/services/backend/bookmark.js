import { backend } from "../../marslab-library-react-native/utils/helper";

const objectName = "Bookmark";

export function create({ data }) {
  return new Promise((resolve, reject) => {
    const apiName = `http${objectName}Create`;

    const { shopIds, promo, isBookmark } = data;

    data = {
      shopIds,
      promo,
      isBookmark,
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

    const { id, isBookmark } = data;

    data = {
      id,
      isBookmark,
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
