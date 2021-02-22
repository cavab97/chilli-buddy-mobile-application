import { proc } from "react-native-reanimated";
import { database } from "../../marslab-library-react-native/utils/helper";

const userName = "user";
const objectGroupName = "shop";
const objectName = "favourite";

export function geoReadObjects({ l, radius, limit, selectedCategory, selectedTag, groupId }) {
  return new Promise((resolve, reject) => {
    let databaseRef = database.geoReadTable({
      ref: `${userName}Packaging0/${groupId}/${objectName}Packaging0`,
    });
    // if (selectedCategory)
    //   databaseRef = databaseRef.where("shop.categories", "array-contains-any", [selectedCategory]);
    databaseRef
      .where("isFavourite", "==", true)
      .where("deleted.at", "==", null)
      .limit(limit)
      .near({
        center: database.GeoPoint(l.latitude, l.longtitude),
        radius: radius,
      })
      .get()
      .then((QuerySnapshot) => {
        const result = [];
        QuerySnapshot.forEach((snapshot) => {
          const data = {
            ...snapshot.data(),
            id: snapshot.id,
            distance: snapshot.distance,
          };
          const parent = database.processData({ data });

          const processedData = { ...parent };

          if (selectedTag) {
            const isValidData = processedData.shop.tags.filter((data) => data === selectedTag);

            if (isValidData.length > 0) result.push(processedData);
          } else {
            result.push(processedData);
          }
        });
        result.sort((a, b) => a.distance - b.distance);
        resolve(result);
      })
      .catch((error) => {
        console.log("database error: " + error);
        reject(error);
      });
  });
}

export function readObjects({ groupId }) {
  return new Promise((resolve, reject) => {
    database
      .readTable({
        ref: `${objectName}Private0`,
      })
      .where("d.userIds", "array-contains-any", [groupId])
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
