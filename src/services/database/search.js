import { database } from "../../marslab-library-react-native/utils/helper";

const objectName = "shop";
const objectName2 = "promotion";

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

      const processedData = { ...parent, created, deleted, updated };

      updateListener(processedData);
    });
}

export function geoReadObjects({
  l,
  radius,
  limit,
  selectedCategory,
  selectedTag,
  shopName,
  address,
}) {
  return new Promise((resolve, reject) => {
    let databaseRef = database.geoReadTable({
      ref: `${objectName}Packaging0`,
    });

    if (selectedCategory !== "null" || selectedCategory.toLowerCase() == "near me") {
      if (selectedCategory)
        databaseRef = databaseRef.where("categories", "array-contains-any", selectedCategory);
    }
    databaseRef
      .where("deleted.at", "==", null)
      .limit(limit)
      .near({
        center: database.GeoPoint(l.latitude, l.longtitude),
        radius: radius,
      })
      .get()
      .then((QuerySnapshot) => {
        console.log(QuerySnapshot.size);
        const result = [];
        let uniqueData = [];
        QuerySnapshot.forEach((snapshot) => {
          // console.log(snapshot.d);
          const data = {
            ...snapshot.data(),
            ...snapshot.data().d,
            id: snapshot.id,
            distance: snapshot.distance,
          };
          const parent = database.processData({ data });
          // console.log(selectedCategory);
          const processedData = { ...parent };

          if (shopName.toLowerCase() === "near me") {
            result.push(processedData);
          } else {
            if (
              processedData.address.country.toLowerCase().includes(shopName.toLowerCase()) ||
              processedData.address.line1.toLowerCase().includes(shopName.toLowerCase()) ||
              processedData.address.line2.toLowerCase().includes(shopName.toLowerCase()) ||
              processedData.address.postcode.toLowerCase().includes(shopName.toLowerCase()) ||
              processedData.address.state.toLowerCase().includes(shopName.toLowerCase()) ||
              processedData.displayTitle.toLowerCase().includes(shopName.toLowerCase())
            ) {
              result.push(processedData);
            }
            if (selectedCategory !== null) {
              if (selectedCategory.length > 0) {
                for (let i = 0; i < selectedCategory.length; i++) {
                  if (processedData.categories[0].includes(selectedCategory[i])) {
                    result.push(processedData);
                  }
                }
              }
            }

            // console.log(processedData.tags);
            if (selectedTag !== null) {
              if (processedData.tags.length > 1) {
                for (let i = 0; i < processedData.tags.length; i++) {
                  for (let k = 0; k < selectedTag.length; k++) {
                    if (processedData.tags[i] === selectedTag[k]) {
                      result.push(processedData);
                    }
                  }
                }
              }
            }
          }
        });
        uniqueData = [...new Set(result)];

        uniqueData.sort((a, b) => a.distance - b.distance);
        resolve(uniqueData);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function ReadObjects({ l, radius, limit, selectedCategory, selectedTag, shopName }) {
  return new Promise((resolve, reject) => {
    let databaseRef = database.geoReadTable({ ref: `${objectName2}Packaging0` });
    // console.log(selectedCategory);
    // if (selectedCategory)
    //   databaseRef = databaseRef.where("categories", "array-contains-any", [selectedCategory]);

    databaseRef
      .where("started.boolean", "==", true)
      .where("ended.boolean", "==", false)
      .where("deleted.at", "==", null)
      .limit(limit)
      .near({
        center: database.GeoPoint(l.latitude, l.longtitude),
        radius: radius,
      })
      .get()
      .then((QuerySnapshot) => {
        const result = [];
        let uniqueData = [];

        QuerySnapshot.forEach((snapshot) => {
          const data = {
            ...snapshot.data(),
            id: snapshot.id,
            distance: snapshot.distance,
          };
          const parent = database.processData({ data });

          const processedData = { ...parent };
          // console.log(processedData.shop.displayTitle);

          if (
            processedData.shop.displayTitle.toLowerCase().includes(shopName.toLowerCase()) ||
            processedData.shop.address.country.toLowerCase().includes(shopName.toLowerCase()) ||
            processedData.shop.address.line1.toLowerCase().includes(shopName.toLowerCase()) ||
            processedData.shop.address.line2.toLowerCase().includes(shopName.toLowerCase()) ||
            processedData.shop.address.postcode.toLowerCase().includes(shopName.toLowerCase()) ||
            processedData.shop.address.state.toLowerCase().includes(shopName.toLowerCase())
          ) {
            result.push(processedData);
          }
          if (selectedCategory !== null) {
            if (selectedCategory.length > 0) {
              for (let i = 0; i < selectedCategory.length; i++) {
                if (processedData.shop.categories[0].includes(selectedCategory[i])) {
                  result.push(processedData);
                }
              }
            }
          }

          // console.log(processedData.tags);
          if (selectedTag !== null) {
            if (processedData.shop.tags.length > 1) {
              for (let i = 0; i < processedData.shop.tags.length; i++) {
                for (let k = 0; k < selectedTag.length; k++) {
                  if (processedData.shop.tags[i] === selectedTag[k]) {
                    result.push(processedData);
                  }
                }
              }
            }
          }
        });
        uniqueData = [...new Set(result)];

        uniqueData.sort((a, b) => a.distance - b.distance);
        resolve(uniqueData);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function removeListenerToRecord() {
  objectListener();
}
