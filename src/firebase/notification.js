import { messaging, getToken } from "../firebase/initialization";
import { db, ref, set } from "firebase/database";

export const requestNotificationPermission = async (userId) => {
  try {
    const token = await getToken(messaging, { vapidKey: "YOUR_PUBLIC_VAPID_KEY" });
    if (token) {
      set(ref(db, `users/${userId}/fcmToken`), token);
      console.log("Notification Token:", token);
    }
  } catch (error) {
    console.error("FCM Permission Denied:", error);
  }
};
