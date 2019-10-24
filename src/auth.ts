import * as admin from "firebase-admin";

export default async function auth({ context }, roles) {
  if (context.env === "local") {
    return true;
  }
  if (!context.token) {
    return false;
  }

  const decodedToken = await admin.auth().verifyIdToken(context.token);
  const user = await admin.auth().getUser(decodedToken.uid);

  const canAccessData =
    roles && roles.length > 0
      ? user && user.customClaims && user.customClaims["role"]
        ? roles.indexOf(user.customClaims["role"]) >= 0
        : false
      : true;

  return canAccessData;
}
