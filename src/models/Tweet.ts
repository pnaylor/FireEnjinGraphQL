import Model from "./Model";

export interface TweetModel {
  id: string;
  likes: number;
  text: string;
  userId: string;
}
export interface TweetDocumentReference
  extends FirebaseFirestore.DocumentReference {
  get(): Promise<TweetDocumentSnapshot>;
}

export interface TweetDocumentSnapshot
  extends FirebaseFirestore.DocumentSnapshot {
  data(): TweetModel;
}

export interface TweetQueryDocumentSnapshot
  extends FirebaseFirestore.QueryDocumentSnapshot {
  data(): TweetModel;
}

export interface TweetQuerySnapshot extends FirebaseFirestore.QuerySnapshot {
  docs: TweetQueryDocumentSnapshot[];
}

export interface TweetCollection extends FirebaseFirestore.CollectionReference {
  get(): Promise<TweetQuerySnapshot>;
}

export class Tweet extends Model {
  collectionName = "tweets";
  gql = `# A Tweet Object
  type Tweets {
    id: ID!
    text: String!
    userId: String!
    user: User!
    likes: Int!
  }`;

  constructor(protected firestore: FirebaseFirestore.Firestore) {
    super(firestore);
  }

  collection(): TweetCollection {
    return this.firestore.collection(this.collectionName) as any;
  }

  doc(path: string): TweetDocumentReference {
    return this.collection().doc(path) as any;
  }

  findById(id: string): Promise<TweetModel> {
    return super.findById(id);
  }
}
