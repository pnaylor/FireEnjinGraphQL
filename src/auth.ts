import * as admin from "firebase-admin";

export default async function auth({ context }, roles) {
  if (context.env === "local") {
    return true;
  }
  if (!context.token) {
    return false;
  }

  const UserImport = await import("./models/User");
  const User = new UserImport.UserModel();
  const decodedToken = await admin.auth().verifyIdToken(context.token);
  const authUser = await User.find(decodedToken.uid);

  return !!authUser;
}
