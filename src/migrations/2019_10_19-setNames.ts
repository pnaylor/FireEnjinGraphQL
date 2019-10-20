import admin from "firebase-admin";

export default async (db: admin.firestore.Firestore, dryRun = false) => ({
  up: async () => {
    const usersCollection = await db.collection("users").get();
    const users = [];

    for (const user of usersCollection.docs) {
      users.push(
        await user.ref.update({
          email: ""
        })
      );
    }

    return {
      users
    };
  },
  down: async () => {
    return true;
  }
});
