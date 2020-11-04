import { Actions } from "react-native-router-flux";

function notificationHandler(notification) {
  const { origin, data, remote } = notification;
  const { objectName, objectId, action } = data;
  console.log(data);

  if (origin === "selected") {
    switch (objectName) {
      case "route":
        if (action === "published" || action === "ongoing")
          Actions.RouteRanking({ routeId: objectId });
        break;
      case "reward":
        if (action === "obtained" || action === "issued")
          Actions.RedeemPage({ rewardId: objectId });
        break;
      case "event":
        if (action === "published")
          Actions.LuckyDrawWinnerRanking({eventId : objectId });
        break;
    }
  }

  if (origin === "received") {
  }
}

export { notificationHandler };
