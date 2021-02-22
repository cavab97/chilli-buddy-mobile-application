import { database } from "../../marslab-library-react-native/utils/helper";

var adsBegin = new Date();
adsBegin.setHours(0, 0, 0, 0);
var adsEnd = new Date();
const objectName = "shopPost";
// .where("d.endTime", "<=", adsEnd)
// .where("d.coverPhoto", "!=", null)
export function readObjects() {
  return new Promise((resolve, reject) => {
    database
      .readTable({ ref: `${objectName}Private0` })
      // .orderBy("d.coverPhoto")
      // .orderBy("d.coverPhoto", "asc")

      // .where("d.endTime", ">=", adsEnd)
      // .where("deleted.by", "==", null)
      // .where("d.coverPhoto")
      // .where("d.coverPhoto", "!=", null)
      // .limit(20)
      .where("d.started.boolean", "==", true)
      .where("d.ended.boolean", "==", false)
      .where("deleted.at", "==", null)
      .limit(20)
      .get()
      .then((QuerySnapshot) => {
        const result = [];
        // let temp;
        // console.log(QuerySnapshot.data().d);

        // temp = QuerySnapshot.filter((snapshot) => snapshot.data().d.endTime <= adsEnd);
        QuerySnapshot.forEach((snapshot) => {
          const data = {
            ...snapshot.data(),
            ...snapshot.data().d,
            id: snapshot.id,
          };
          delete data["d"];
          // var filteredDatasource = dataSourceAds.filter(
          //   (value) => value.imageUri !== undefined && value.shopId !== undefined
          // );
          // const parent = database.processData({ data });
          // console.log(data.endTime);
          const parent = database.processData({ data });

          const created = database.processData({ data: data.created });
          const deleted = database.processData({ data: data.deleted });
          const updated = database.processData({ data: data.updated });
          const processedData = { ...parent, created, deleted, updated };

          result.push(processedData);

          // result.push(processedData);
        });
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
