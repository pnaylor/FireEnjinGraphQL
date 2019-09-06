import Model from "./Model";

export interface TweetModel {
  id: string;
  likes: number;
  text: string;
  userId: string;
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

  findById(id: string): Promise<TweetModel> {
    return super.findById(id);
  }
}
