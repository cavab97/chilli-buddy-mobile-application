import { database } from "../../marslab-library-react-native/utils/helper";

export function readObjects() {
  return new Promise((resolve, reject) => {
    database
      .readTable({ ref: `posts` })
      .where("deleted_at", "==", null)
      .get()
      .then(QuerySnapshot => {
        const result = [];
        QuerySnapshot.forEach(snapshot => {
          const data = {
            ...snapshot.data(),
            // ...snapshot.data().d,
            id: snapshot.id
          };
          // delete data["d"];

          const parent = database.processData({ data });
          // const created = database.processData({ data: data.created });
          // const deleted = database.processData({ data: data.deleted });
          // const updated = database.processData({ data: data.updated });

          //const processedData = { ...parent, created, deleted, updated };
          const processedData = { ...parent };

          result.push(processedData);
        });
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

