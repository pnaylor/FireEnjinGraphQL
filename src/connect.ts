import * as admin from "firebase-admin";
import { Initialize } from "fireorm";

export default function connect() {
  if (process && process.env && process.env.FIREBASE_CONFIG) {
    admin.initializeApp();
  } else {
    const serviceAccount = require("../service-account.json");
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
    });
  }

  const firestore = admin.firestore();
  Initialize(firestore);

  return firestore;
}
