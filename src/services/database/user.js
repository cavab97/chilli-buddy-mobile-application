import * as database from "../../marslab-library-react-native/utils/helper/database";

export function readOwnInfo({uid}) {
    const ref = `userPrivate0/${uid}`;
    return new Promise((resolve, reject) => {
        database
            .readData({ref})
            .then(user => {
                resolve(user);
            })
            .catch(error => {
                reject(error);
            });
    });
}