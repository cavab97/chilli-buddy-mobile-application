import { database } from "../../marslab-library-react-native/utils/helper";

const objectGroupName = "shop";
const objectName = "shopPost";

export const GeoPoint = database.GeoPoint;

export function readObjects(groupId) {
  return new Promise((resolve, reject) => {
    database
      .readTable({
        ref: `${objectGroupName}Packaging0/${groupId}/${objectName}Packaging0`,
      })
      .where("deleted.by", "==", null)
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
let objectListener = () => {};

export function readObject({ objectId, updateListener = () => {} }) {
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
      // const winner = database.processData({ data: data.winner });
      // const created = database.processData({ data: data.created });
      // const deleted = database.processData({ data: data.deleted });
      // const updated = database.processData({ data: data.updated });

      const processedData = { ...parent };

      updateListener(processedData);
    });
}

// export function listenObject({ objectId = null, updateListener = () => {} }) {
//   objectListener = database
//     .readRecord({ ref: `${objectName}Private0/${objectId}` })
//     .onSnapshot((snapshot) => {
//       const data = {
//         ...snapshot.data(),
//         ...snapshot.data().d,
//         id: snapshot.id,
//       };
//       delete data["d"];

//       const parent = database.processData({ data });
//       const winner = database.processData({ data: data.winner });
//       const created = database.processData({ data: data.created });
//       const deleted = database.processData({ data: data.deleted });
//       const updated = database.processData({ data: data.updated });

//       const processedData = { ...parent, created, deleted, updated, winner };

//       updateListener(processedData);
//     });
// }
// export function readObject({ id }) {
//   return new Promise((resolve, reject) => {
//     database
//       .readData({ ref: `${objectName}Private0/${id}` })
//       .then((snapshot) => {
//         const data = {
//           ...snapshot,
//           ...snapshot.d,
//           id: snapshot.id,
//         };

//         delete data["d"];

//         const parent = database.processData({ data });
//         const winner = database.processData({ data: data.winner });
//         const created = database.processData({ data: data.created });
//         const deleted = database.processData({ data: data.deleted });
//         const updated = database.processData({ data: data.updated });

//         const processedData = { ...parent, created, deleted, updated ,winner};

//         resolve(processedData);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// }

// let listener = () => {};

// export function listenObjects({ groupId = null, updateListener = () => {} }) {
//   const twoWeeks = new Date();
//   twoWeeks.setDate(new Date().getDate() - 14);

//   listener = database
//     .readTable({
//       ref: `${objectName}Private0`,
//     })
//     .where("routeGroupId", "array-contains", groupId)
//     .where("deleted.by", "==", null)
//     .where("published.boolean", "==", true)
//     .where("terminated.by", "==", null)
//     .where("endTime", ">", twoWeeks)
//     .onSnapshot((QuerySnapshot) => {
//       const result = [];
//       QuerySnapshot.forEach((snapshot) => {
//         const data = {
//           ...snapshot.data(),
//           ...snapshot.data().d,
//           id: snapshot.id,
//         };
//         delete data["d"];

//         const parent = database.processData({ data });
//         const winner = database.processData({ data: data.winner });
//         const created = database.processData({ data: data.created });
//         const deleted = database.processData({ data: data.deleted });
//         const updated = database.processData({ data: data.updated });

//         const processedData = { ...parent, created, deleted, updated, winner };

//         result.push(processedData);
//       });
//       updateListener(result);
//     });
// }

// export function unlistenObjects() {
//   listener();
// }

// let objectListener = () => {};

// export function listenObject({ objectId = null, updateListener = () => {} }) {
//   objectListener = database
//     .readRecord({ ref: `${objectName}Private0/${objectId}` })
//     .onSnapshot((snapshot) => {
//       const data = {
//         ...snapshot.data(),
//         ...snapshot.data().d,
//         id: snapshot.id,
//       };
//       delete data["d"];

//       const parent = database.processData({ data });
//       const winner = database.processData({ data: data.winner });
//       const created = database.processData({ data: data.created });
//       const deleted = database.processData({ data: data.deleted });
//       const updated = database.processData({ data: data.updated });

//       const processedData = { ...parent, created, deleted, updated,winner };

//       updateListener(processedData);
//     });
// }

// export function unlistenObject() {
//   objectListener();
// }

// export function readExpiredRoutes() {
//   return new Promise((resolve, reject) => {
//     database
//       .readTable({ ref: `${objectName}Packaging0` })
//       .where("deleted.by", "==", null)
//       .where("published.boolean", "==", true)
//       .where("endTime", "<", new Date(Date.now()))
//       .where("terminated.by", "==", null)
//       .get()
//       .then((QuerySnapshot) => {
//         const result = [];
//         QuerySnapshot.forEach((snapshot) => {
//           const data = {
//             ...snapshot.data(),
//             id: snapshot.id,
//           };

//           const parent = database.processData({ data });
//           const created = database.processData({ data: data.created });
//           const deleted = database.processData({ data: data.deleted });
//           const updated = database.processData({ data: data.updated });

//           const winner = database.processData({ data: data.winner });
//           const published = database.processData({ data: data.published });
//           const terminated = database.processData({ data: data.terminated });
//           const pending = database.processData({ data: data.pending });
//           const ongoing = database.processData({ data: data.ongoing });
//           const ended = database.processData({ data: data.ended });

//           const processedData = {
//             ...parent,
//             created,
//             deleted,
//             updated,
//             winner,
//             published,
//             terminated,
//             pending,
//             ongoing,
//             ended
//           };

//           result.push(processedData);
//         });
//         resolve(result);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// }

// export function readEndedRoutes() {
//   return new Promise((resolve, reject) => {
//     const twoWeeks = new Date();
//     twoWeeks.setDate(new Date().getDate() - 14);

//     database
//       .readTable({ ref: `${objectName}Packaging0` })
//       .where("deleted.by", "==", null)
//       .where("assignCompleted", "==", true)
//       .where("ended.at", ">", twoWeeks)
//       .where("terminated.by", "==", null)
//       .get()
//       .then((QuerySnapshot) => {
//         const result = [];
//         QuerySnapshot.forEach((snapshot) => {
//           const data = {
//             ...snapshot.data(),
//             id: snapshot.id,
//           };

//           const parent = database.processData({ data });
//           const created = database.processData({ data: data.created });
//           const deleted = database.processData({ data: data.deleted });
//           const updated = database.processData({ data: data.updated });

//           const winner = database.processData({ data: data.winner });
//           const published = database.processData({ data: data.published });
//           const terminated = database.processData({ data: data.terminated });
//           const pending = database.processData({ data: data.pending });
//           const ongoing = database.processData({ data: data.ongoing });
//           const ended = database.processData({ data: data.ended });

//           const processedData = {
//             ...parent,
//             created,
//             deleted,
//             updated,
//             winner,
//             published,
//             terminated,
//             pending,
//             ongoing,
//             ended
//           };

//           result.push(processedData);
//         });
//         resolve(result);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// }
