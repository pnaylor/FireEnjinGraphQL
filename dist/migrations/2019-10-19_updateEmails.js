"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = async (db, dryRun = false) => ({
    up: async () => {
        const usersCollection = await db.collection("users").get();
        const users = {};
        for (const user of usersCollection.docs) {
            const email = user.data().email;
            try {
                await user.ref.set({
                    email: "test@email.com"
                }, { merge: true });
                users[user.id] = {
                    email
                };
            }
            catch (error) {
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
//# sourceMappingURL=2019-10-19_updateEmails.js.map