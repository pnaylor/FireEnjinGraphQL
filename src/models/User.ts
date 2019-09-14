import { Collection } from "fireorm";

import Model from "./Model";

@Collection("users")
export class User {
  id: string;
  name: string;
}

export class UserModel extends Model {
  gql = `# A User Object
  type User {
    id: ID!
    name: String!
    jobs: [Job]!
  }`;

  constructor() {
    super(User);
  }
}
