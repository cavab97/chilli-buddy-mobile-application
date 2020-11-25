import { database } from "../../marslab-library-react-native/utils/helper";

const objectName = "shop";
const objectGroupName = "promotion";

let objectListener = () => {};

export function listenObject({ objectId = null, updateListener = () => {} }) {
  objectListener = database
    .readRecord({ ref: `${objectName}Private0/${objectId}` })
    .onSnapshot((snapshot) => {
      const data = {
        ...snapshot.data(),
        ...snapshot.data().d,
        id: snapshot.id,
      };
      delete data["d"];

      const parent = database.processData({ data });
      const created = database.processData({ data: data.created });
      const deleted = database.processData({ data: data.deleted });
      const updated = database.processData({ data: data.updated });

      const processedData = { ...parent, created, deleted, updated };

      updateListener(processedData);
    });
}

export function readObjects(groupId) {
  return new Promise((resolve, reject) => {
    database
      .readTable({
        ref: `${objectName}Packaging0/${groupId}/${objectGroupName}Packaging0`,
      })
      .where("deleted.by", "==", null)
      .where("d.ended.boolean", "==", false)
      .where("d.started.boolean", "==", true)
      .get()
      .then((QuerySnapshot) => {
        const result = [];
        QuerySnapshot.forEach((snapshot) => {
          const data = {
            ...snapshot.data(),
            ...snapshot.data().d,
            id: snapshot.id,
          };
          delete data["d"];

          const parent = database.processData({ data });
          const created = database.processData({ data: data.created });
          const deleted = database.processData({ data: data.deleted });
          const updated = database.processData({ data: data.updated });

          const processedData = { ...parent, created, deleted, updated };

          result.push(processedData);
        });
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function removeListenerToRecord() {
  objectListener();
}
