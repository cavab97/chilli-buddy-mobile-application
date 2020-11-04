const notificationChannel = [
  {
    id: "eventpublished",
    name: "New Event",
    description: "Receive notification while new event published",
    priority: "default",
    sound: true,
    vibrate: [250, 250, 250, 250],
    badge: false,
  },
];

export { notificationChannel };
