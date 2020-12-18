import store from "../../marslab-library-react-native/redux/store";
import { readFromDatabase as readSettings } from "@redux/settings/action";

export default onBoot = async () => {
  return new Promise(async (resolve, reject) => {
    const settingFetch = store.dispatch(readSettings());
    await Promise.all([settingFetch])
      .then(() => {
        resolve({ status: "success" });
      })
      .catch((error) => {
        reject(error);
      });
  });
};
