import { database } from "../../marslab-library-react-native/utils/helper";

const objectGroupName = "routeTicket";
const objectName = "transaction";

let objectListener = () => {};

export function listenObjectsByRouteTicket({ routeTicketId = null, updateListener = () => {} }) {
  objectListener = database
      .readTable({ ref: `${objectGroupName}Packaging0/${routeTicketId}/${objectName}Packaging0` })
      .where("deleted.at", "==", null)
      .onSnapshot(QuerySnapshot => {
        const result = [];
        QuerySnapshot.forEach(snapshot => {
          const data = {
            ...snapshot.data(),
            id: snapshot.id
          };
          
          const parent = database.processData({ data });

          const processedData = { ...parent };
          
          result.push(processedData);
        });
        updateListener(result);
      })
}

export function unlistenObjectsByRouteTicket() {
  objectListener();
}
