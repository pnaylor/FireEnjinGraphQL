import admin from "firebase-admin";

import { Job } from "../../models/Job";

export default function(db: admin.firestore.Firestore): Partial<Job> {
  return {
    customer: "Bobby Johnson",
    user: db.collection("users").doc("Fcvo4EPVu7d7K0z7A1H0oindJVU2")
  };
}
