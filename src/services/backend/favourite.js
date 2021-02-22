import { backend } from "../../marslab-library-react-native/utils/helper";

const objectName = "Favourite";

export function create({ data }) {
  return new Promise((resolve, reject) => {
    const apiName = `http${objectName}Create`;

    const { shopIds, isFavourite } = data;

    data = {
      shopIds,
      isFavourite,
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

    const { id, isFavourite } = data;

    data = {
      id,
      isFavourite,
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
