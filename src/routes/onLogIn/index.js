import store from "../../marslab-library-react-native/redux/store";
import { readFromDatabase as readBookmark } from "../../redux/bookmark/action";

export default onLogin = () => {
  return new Promise(async (resolve, reject) => {
    const bookmarkFetch = store.dispatch(readBookmark());
    await Promise.all([bookmarkFetch])
      .then(() => {
        resolve({ status: "success" });
      })
      .catch((error) => {
        reject(error);
      });
  });
};
