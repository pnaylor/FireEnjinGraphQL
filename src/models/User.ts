import { Collection } from "fireorm";

import Model from "./Model";
import { JobModel } from "./Job";

@Collection("users")
export class User {
  id: string;
  name: string;
}

export class UserModel extends Model {
  gql = `# A User Object
  type User {
    id: ID!
    name: String
    jobs: [Job]
  }`;

  constructor() {
    super(User);
  }

  async jobsForId(jobModel: JobModel, id: string) {
    return (await jobModel
      .ref()
      .where("user", "==", this.ref().doc(id))
      .get()).docs.map(doc => ({ ...doc.data(), id: doc.id }));
  }
}
