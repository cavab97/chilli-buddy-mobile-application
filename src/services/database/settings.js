import * as database from "../../marslab-library-react-native/utils/helper/database";

export function readCategories() {
    const ref = "settings/shops/categories";
    return new Promise((resolve, reject) => {
        database
            .readTable({ref})
            .orderBy("no", "asc")
            .where("deleted_at", "==", null)
            .get()
            .then(QuerySnapshot => {
                const categories = [{ id: "", title: "All", tags: ["All"] }]

                QuerySnapshot.forEach(snapshot=>{
                    const tags = snapshot.data().tags;
                    tags.push("All");
                    categories.push({...snapshot.data(), id:snapshot.id, tags})
                })
                
                resolve(categories);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export function readTags() {
    const ref = "settings/shops/tags";
    return new Promise((resolve, reject) => {
        database
            .readTable({ref})
            .where("deleted_at", "==", null)
            .get()
            .then(QuerySnapshot => {
                const tags = [{ id: "All", title: "All" }]

                QuerySnapshot.forEach(snapshot=>{
                    tags.push({...snapshot.data(), id:snapshot.id})
                })
                
                resolve(tags);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export function readInfo() {
    const ref = "settingPackaging0/info";
    return new Promise((resolve, reject) => {
        database
            .readData({ref})
            .then(info => {
                
                resolve(info);
            })
            .catch(error => {
                reject(error);
            });
    });
}