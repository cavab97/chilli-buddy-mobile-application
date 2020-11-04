import { database } from "../../marslab-library-react-native/utils/helper";

const objectName = "event";

export function readObjects() {
  return new Promise((resolve, reject) => {
    database
      .readTable({ ref: `${objectName}Packaging0` })
      .where("deleted.by", "==", null)
      .where("published.boolean", "==", true)
      .where("terminated.by", "==", null)
      .orderBy("endTime","desc")
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
