"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
async function auth({ context }, roles) {
    if (context.env === "local") {
        return true;
    }
    if (!context.token) {
        return false;
    }
    const decodedToken = await admin.auth().verifyIdToken(context.token);
    // await admin.auth().setCustomUserClaims(decodedToken.uid, {
    //   role: "admin"
    // });
    const user = await admin.auth().getUser(decodedToken.uid);
    const canAccessData = roles && roles.length > 0
        ? user && user.customClaims && user.customClaims["role"]
            ? roles.indexOf(user.customClaims["role"]) >= 0
            : false
        : true;
    return canAccessData;
}
exports.default = auth;
//# sourceMappingURL=auth.js.map