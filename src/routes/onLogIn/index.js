import store from "../../marslab-library-react-native/redux/store";
import { readFromDatabase as readBookmark } from "../../redux/bookmark/action";
import { readFromDatabase as readFavourite } from "../../redux/favourite/action";

export default onLogin = () => {
  return new Promise(async (resolve, reject) => {
    const bookmarkFetch = store.dispatch(readBookmark());
    const favouriteFetch = store.dispatch(readFavourite());

    await Promise.all([bookmarkFetch, favouriteFetch])
      .then(() => {
        resolve({ status: "success" });
      })
      .catch((error) => {
        reject(error);
      });
  });
};
