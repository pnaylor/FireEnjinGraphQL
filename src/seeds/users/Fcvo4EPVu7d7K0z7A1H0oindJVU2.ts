import admin from "firebase-admin";

import { User } from "../../models/User";

export default function(db: admin.firestore.Firestore): Partial<User> {
  return {
    email: "bobby@madnesslabs.net",
    name: "Bobby Johnson"
  };
}
