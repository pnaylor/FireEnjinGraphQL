import Model from "./Model";

export class JobModel extends Model {
  collectionName = "jobs";
  gql = `# A Job Object
  type Jobs {
    id: ID!
    customer: String!
    address: String!
  }`;
  repo: any;

  constructor(protected firestore: FirebaseFirestore.Firestore) {
    super(firestore);
  }
}
