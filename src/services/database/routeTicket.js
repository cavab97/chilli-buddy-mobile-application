import { database } from "../../marslab-library-react-native/utils/helper";

const objectGroupName = "route";
const userName = "user";
const objectName = "routeTicket";

export const GeoPoint = database.GeoPoint;

export function readObjects({groupId}) {
  return new Promise((resolve, reject) => {
    database
      .readTable({ ref: `${userName}Packaging0/${groupId}/${objectName}Packaging0` })
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
          const completedMissions = data.completedMissions.map((data) => {
            return database.processData({ data: data });
          });

          const processedData = { ...parent, created, deleted, updated, completedMissions };

          result.push(processedData);
        });
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function readObjectsByObjectGroup({groupId}) {
  return new Promise((resolve, reject) => {
    database
      .readTable({ ref: `${objectGroupName}Packaging0/${groupId}/${objectName}Packaging0` })
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
          const completedMissions = data.completedMissions.map((data) => {
            return database.processData({ data: data });
          });

          const processedData = { ...parent, created, deleted, updated, completedMissions };

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
      .readData({ ref: `${objectName}Private0/${id}` })
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
        const completedMissions = data.completedMissions.map((data) => {
          return database.processData({ data: data });
        });

        const processedData = { ...parent, created, deleted, updated, completedMissions };

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
      .readTable({ ref: `${userName}Packaging0/${groupId}/${objectName}Packaging0` })
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
          const completedMissions = data.completedMissions.map((data) => {
            return database.processData({ data: data });
          });

          const processedData = { ...parent, created, deleted, updated, completedMissions };

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
      const completedMissions = data.completedMissions.map((data) => {
        return database.processData({ data: data });
      });

      const processedData = { ...parent, created, deleted, updated, completedMissions };

      updateListener(processedData);
    });
}

export function unlistenObject() {
  objectListener();
}