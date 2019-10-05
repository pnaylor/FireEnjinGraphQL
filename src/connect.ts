import * as admin from "firebase-admin";
import { Initialize } from "fireorm";

const serviceAccount = require("../service-account.json");

export default function connect() {
  console.log("wee", serviceAccount);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
  });
  const firestore = admin.firestore();
  Initialize(firestore);

  return firestore;
}
