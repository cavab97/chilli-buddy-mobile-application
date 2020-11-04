import { database } from "../../marslab-library-react-native/utils/helper";

const objectGroupName = "route"
const objectName = "mission";

export const GeoPoint = database.GeoPoint;

export function readObjects({groupId}) {
  return new Promise((resolve, reject) => {
    database
      .readTable({ ref: `${objectGroupName}Packaging0/${groupId}/${objectName}Packaging0` })
      .where("deleted.by", "==", null)
      .get()
      .then(QuerySnapshot => {
        const result = [];
        QuerySnapshot.forEach(snapshot => {
          const data = {
            ...snapshot.data(),
            ...snapshot.data().d,
            id: snapshot.id
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
      .catch(error => {
        reject(error);
      });
  });
}



export function readObject({ id }) {
  return new Promise((resolve, reject) => {
    database
      .readData({ ref: `${objectName}Public0/${id}` })
      .then(snapshot => {

        const data = {
          ...snapshot,
          ...snapshot.d,
          id: snapshot.id
        };

        delete data["d"];

        const parent = database.processData({ data });
        const created = database.processData({ data: data.created });
        const deleted = database.processData({ data: data.deleted });
        const updated = database.processData({ data: data.updated });

        const processedData = { ...parent, created, deleted, updated };

        resolve(processedData);
      })
      .catch(error => {
        reject(error);
      });
  });
}

let listener = () => {};

export function listenObjects({groupId = null, updateListener = () =>{} }) {
  listener = database
      .readTable({ ref: `${objectGroupName}Packaging0/${groupId}/${objectName}Packaging0` })
      .where("deleted.by", "==", null)
      .onSnapshot(QuerySnapshot => {
        const result = [];
        QuerySnapshot.forEach(snapshot => {
          const data = {
            ...snapshot.data(),
            ...snapshot.data().d,
            id: snapshot.id
          };
          delete data["d"];

          const parent = database.processData({ data });
          const created = database.processData({ data: data.created });
          const deleted = database.processData({ data: data.deleted });
          const updated = database.processData({ data: data.updated });

          const processedData = { ...parent, created, deleted, updated };

          result.push(processedData);
        });
        updateListener(result)
      })
}

export function unlistenObjects() {
  listener();
}

let objectListener = () => {};

export function listenObject({ objectId = null, updateListener = () => {} }) {
  objectListener = database
    .readRecord({ ref: `${objectName}Public0/${objectId}` })
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

export function unlistenObject() {
  objectListener();
}