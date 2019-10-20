import admin from "firebase-admin";

export default async (db: admin.firestore.Firestore, dryRun = false) => ({
  up: async () => {
    const usersCollection = await db.collection("users").get();
    const users = {};

    for (const user of usersCollection.docs) {
      const email = user.data().email;
      try {
        await user.ref.set(
          {
            email: "test@email.com"
          },
          { merge: true }
        );
        users[user.id] = {
          email
        };
      } catch (error) {
        console.log(error);
      }
    }

    return {
      users
    };
  },
  down: async () => {
    return true;
  }
});
