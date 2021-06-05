import { PushNotificationToken } from "@capacitor/core";

export interface User {
  uid: string;
  email: string;
  displayName: string;
  emailVerified: boolean;
  tokenNotification?: PushNotificationToken
}
