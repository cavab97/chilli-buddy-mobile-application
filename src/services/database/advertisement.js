import { database } from "../../marslab-library-react-native/utils/helper";

var adsBegin = new Date();
adsBegin.setHours(0, 0, 0, 0);
var adsEnd = new Date();

export function readObjects() {
  return new Promise((resolve, reject) => {
    database
      .readTable({ ref: `posts` })
      .where("deleted_at", "==", null)
      .where("endDate", ">=", adsEnd)
      .get()
      .then((QuerySnapshot) => {
        const result = [];
        QuerySnapshot.forEach((snapshot) => {
          const data = {
            ...snapshot.data(),
            // ...snapshot.data().d,
            id: snapshot.id,
          };
          // delete data["d"];
          if (data.startDate.seconds <= Math.floor(adsEnd / 1000)) {
            const parent = database.processData({ data });

            const processedData = { ...parent };

            result.push(processedData);
          }
        });
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
