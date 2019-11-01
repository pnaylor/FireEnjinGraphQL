"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const fireorm_1 = require("fireorm");
function connect() {
    if (process && process.env && process.env.FIREBASE_CONFIG) {
        admin.initializeApp();
    }
    else {
        const serviceAccount = require("../service-account.json");
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
        });
    }
    const firestore = admin.firestore();
    fireorm_1.Initialize(firestore);
    return firestore;
}
exports.default = connect;
//# sourceMappingURL=connect.js.map