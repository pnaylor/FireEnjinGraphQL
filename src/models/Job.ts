import { Collection } from "fireorm";

import Model from "./Model";

@Collection("jobs")
export class Job {
  id: string;
  customer: string;
  address: string;
}

export class JobModel extends Model {
  gql = `# A Job Object
  type Job {
    id: ID!
    customer: String
    address: String
    user: User
  }`;

  constructor() {
    super(Job);
  }
}
