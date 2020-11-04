import { storage } from "../../marslab-library-react-native/utils/helper";
import { convertFileToBlob } from "../../marslab-library-react-native/utils/common";

const objectName = "transactions";

export function uploadFile({ id, name = null, file = null, progressListener = null }) {
  return new Promise(async (resolve, reject) => {
    const ref = `${objectName}/${id}`;

    const metadata = {
      contentType: 'image/jpeg',
    };

    const convertedFile = await convertFileToBlob({ file }).catch(error => {
      //console.log(error)
      reject(error)
    });

    storage
      .uploadFile({ ref, name, file: convertedFile, progressListener, metadata })
      .then(({ url }) => {
        resolve({ url });
      })
      .catch(error => {
        reject(error);
      });
  });
}
