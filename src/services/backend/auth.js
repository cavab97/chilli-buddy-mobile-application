import { backend } from "../../marslab-library-react-native/utils/helper";

const objectName = "Auth";

export function updateProfile({ data }) {
  const {
    displayName,
    name,
    address,
    dateOfBirth,
    gender,
    email,
    photoURL,
    identityNumber
  } = data;
  const apiName = `http${objectName}Update`;
  return new Promise((resolve, reject) => {
    backend
      .callApi({
        apiName,
        data: {
          displayName,
          name,
          address,
          dateOfBirth,
          gender,
          email,
          photoURL,
          identityNumber
        },
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
