import { database } from "../../marslab-library-react-native/utils/helper";

const objectGroupName = "route";
const objectName = "reward";

export const GeoPoint = database.GeoPoint;
export function readObjects({ groupId }) {
  return new Promise((resolve, reject) => {
    database
      .readTable({
        ref: `${objectGroupName}Packaging0/${groupId}/${objectName}Packaging0`,
      })
      .where("deleted.by", "==", null)
      .orderBy("rank", "asc")
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
          const obtained = database.processData({ data: data.obtained });
          const claimed = database.processData({ data: data.claimed });
          const issued = database.processData({ data: data.issued });
          const route = database.processData({ data: data.route });

          const processedData = {
            ...parent,
            created,
            deleted,
            updated,
            obtained,
            claimed,
            issued,
            route
          };

          result.push(processedData);
        });
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function readEventRewards({ eventId }) {
  return new Promise((resolve, reject) => {
    database
      .readTable({
        ref: `eventPackaging0/${eventId}/${objectName}Packaging0`,
      })
      .where("deleted.by", "==", null)
      .orderBy("rank", "asc")
      .get()
      .then((QuerySnapshot) => {
        const result = [];
        QuerySnapshot.forEach((snapshot) => {
          const data = {
            ...snapshot.data(),
            id: snapshot.id,
          };

          const parent = database.processData({ data });
          const created = database.processData({ data: data.created });
          const deleted = database.processData({ data: data.deleted });
          const updated = database.processData({ data: data.updated });
          const obtained = database.processData({ data: data.obtained });
          const claimed = database.processData({ data: data.claimed });
          const issued = database.processData({ data: data.issued });

          const processedData = {
            ...parent,
            created,
            deleted,
            updated,
            obtained,
            claimed,
            issued,
          };

          result.push(processedData);
        });
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function readObject({ id }) {
  return new Promise((resolve, reject) => {
    database
      .readData({ ref: `${objectName}Public0/${id}` })
      .then((snapshot) => {
        const data = {
          ...snapshot,
          id: snapshot.id,
        };

        const parent = database.processData({ data });
        const created = database.processData({ data: data.created });
        const deleted = database.processData({ data: data.deleted });
        const updated = database.processData({ data: data.updated });
        const obtained = database.processData({ data: data.obtained });
        const claimed = database.processData({ data: data.claimed });
        const issued = database.processData({ data: data.issued });

        const processedData = {
          ...parent,
          created,
          deleted,
          updated,
          obtained,
          claimed,
          issued,
        };

        resolve(processedData);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

let listener = () => {};

export function listenObjects({ groupId = null, updateListener = () => {} }) {
  listener = database
    .readTable({
      ref: `${objectGroupName}Packaging0/${groupId}/${objectName}Packaging0`,
    })
    .where("deleted.by", "==", null)
    .onSnapshot((QuerySnapshot) => {
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
        const obtained = database.processData({ data: data.obtained });
        const claimed = database.processData({ data: data.claimed });
        const issued = database.processData({ data: data.issued });

        const processedData = {
          ...parent,
          created,
          deleted,
          updated,
          obtained,
          claimed,
          issued,
        };

        result.push(processedData);
      });
      updateListener(result);
    });
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
        id: snapshot.id,
      };

      const parent = database.processData({ data });
      const created = database.processData({ data: data.created });
      const deleted = database.processData({ data: data.deleted });
      const updated = database.processData({ data: data.updated });
      const obtained = database.processData({ data: data.obtained });
      const claimed = database.processData({ data: data.claimed });
      const issued = database.processData({ data: data.issued });

      const processedData = {
        ...parent,
        created,
        deleted,
        updated,
        obtained,
        claimed,
        issued,
      };

      updateListener(processedData);
    });
}

export function unlistenObject() {
  objectListener();
}

let ownRewardslistener = () => {};

export function listenOwnRewards({ uid = null, updateListener = () => {} }) {
  ownRewardslistener = database
    .readTable({ ref: `userPackaging0/${uid}/${objectName}Packaging0` })
    .orderBy("obtained.at", "desc")
    .onSnapshot((QuerySnapshot) => {
      const result = [];
      QuerySnapshot.forEach((snapshot) => {
        const data = {
          ...snapshot.data(),
          id: snapshot.id,
        };

        const parent = database.processData({ data });
        const created = database.processData({ data: data.created });
        const deleted = database.processData({ data: data.deleted });
        const updated = database.processData({ data: data.updated });
        const obtained = database.processData({ data: data.obtained });
        const claimed = database.processData({ data: data.claimed });
        const issued = database.processData({ data: data.issued });

        const processedData = {
          ...parent,
          created,
          deleted,
          updated,
          obtained,
          claimed,
          issued,
        };

        result.push(processedData);
      });
      updateListener(result);
    });
}

export function unlistenOwnRewards() {
  ownRewardslistener();
}
