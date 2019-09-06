import Model from "./Model";

export interface UserModel {
  id: string;
  name: string;
  screenName: string;
  statusesCount: number;
}

export class User extends Model implements UserModel {
  id: string;
  name: string;
  screenName: string;
  statusesCount: number;
  collectionName = "users";
  gql = `# A User Object
  type User {
    id: ID!
    name: String!
    screenName: String!
    statusesCount: Int!
    tweets: [Tweets]!
  }`;

  constructor(protected firestore: FirebaseFirestore.Firestore) {
    super(firestore);
  }

  findById(id: string): Promise<UserModel> {
    return super.findById(id);
  }
}
