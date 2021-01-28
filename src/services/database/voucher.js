import { database } from "../../marslab-library-react-native/utils/helper";

const objectName = "voucher";

export function readObjects({ uid }) {
  return new Promise((resolve, reject) => {
    let databaseRef = database.readTable({
      ref: `${objectName}Private0`,
    });
    // if (selectedCategory)
    //   databaseRef = databaseRef.where("shop.categories", "array-contains-any", [selectedCategory]);
    databaseRef
      .where("userIds", "==", [uid])
      .where("assigned", "==", true)
      .get()
      .then((QuerySnapshot) => {
        const result = [];
        QuerySnapshot.forEach((snapshot) => {
          const data = {
            ...snapshot.data(),
            id: snapshot.id,
          };
          const parent = database.processData({ data });

          const processedData = { ...parent };

          result.push(processedData);
        });
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

let objectListener = () => {};

export function listenObject({ objectId = null, updateListener = () => {} }) {
  objectListener = database
    .readRecord({ ref: `${objectName}Packaging0/${objectId}` })
    .onSnapshot((snapshot) => {
      const data = {
        ...snapshot.data(),
        id: snapshot.id,
      };

      const parent = database.processData({ data });
      const created = database.processData({ data: data.created });
      const deleted = database.processData({ data: data.deleted });
      const updated = database.processData({ data: data.updated });

      const processedData = { ...parent, created, deleted, updated };

      updateListener(processedData);
    });
}
