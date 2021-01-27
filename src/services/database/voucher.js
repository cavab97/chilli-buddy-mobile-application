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
      // .where("userIds", "==", [uid])
      .where("status", "==", true)
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
