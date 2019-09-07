import Model from "./Model";

export interface UserModel {
  id: string;
  name: string;
  screenName: string;
  statusesCount: number;
}

export interface UserDocumentReference
  extends FirebaseFirestore.DocumentReference {
  get(): Promise<UserDocumentSnapshot>;
}

export interface UserDocumentSnapshot
  extends FirebaseFirestore.DocumentSnapshot {
  data(): UserModel;
}

export interface UserQueryDocumentSnapshot
  extends FirebaseFirestore.QueryDocumentSnapshot {
  data(): UserModel;
}

export interface UserQuerySnapshot extends FirebaseFirestore.QuerySnapshot {
  docs: UserQueryDocumentSnapshot[];
}

export interface UserCollection extends FirebaseFirestore.CollectionReference {
  get(): Promise<UserQuerySnapshot>;
}

export class User extends Model {
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

  collection(): UserCollection {
    return this.firestore.collection(this.collectionName) as any;
  }

  doc(path: string): UserDocumentReference {
    return this.collection().doc(path) as any;
  }

  findById(id: string): Promise<UserModel> {
    return super.findById(id);
  }
}
