import { UserInput, UserModel } from "../../models/User";

/**
 * This will add a new user document to the collection
 */
export default async function addUser(data: UserInput) {
  return new UserModel().create(data);
}
