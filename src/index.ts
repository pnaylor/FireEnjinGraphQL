import * as admin from "firebase-admin";
import { ApolloServer, ApolloError, ValidationError, gql } from "apollo-server";

import { Tweet, TweetModel } from "./models/Tweet";
import { User, UserModel } from "./models/User";

const serviceAccount = require("../service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
});
const firestore = admin.firestore();
firestore.settings({
  timestampsInSnapshots: true
});

const userModel = new User(firestore);
const tweetModel = new Tweet(firestore);

const typeDefs = gql`
  ${userModel.gql}

  ${tweetModel.gql}

  type Query {
    tweets: [Tweets]
    user(id: String!): User
  }
`;

const resolvers = {
  Query: {
    async tweets() {
      const tweets = await admin
        .firestore()
        .collection("tweets")
        .get();
      return tweets.docs.map(tweet => tweet.data()) as TweetModel[];
    },
    async user(_: null, args: { id: string }) {
      try {
        return (
          (await userModel.findById(args.id)) ||
          new ValidationError("User ID not found")
        );
      } catch (error) {
        throw new ApolloError(error);
      }
    }
  },
  User: {
    async tweets(user) {
      try {
        const userTweets = await admin
          .firestore()
          .collection("tweets")
          .where("userId", "==", user.id)
          .get();
        return userTweets.docs.map(tweet => tweet.data()) as TweetModel[];
      } catch (error) {
        throw new ApolloError(error);
      }
    }
  },
  Tweets: {
    async user(tweet) {
      try {
        const tweetAuthor = await admin
          .firestore()
          .doc(`users/${tweet.userId}`)
          .get();
        return tweetAuthor.data() as UserModel;
      } catch (error) {
        throw new ApolloError(error);
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  engine: {
    apiKey: "service:MadnessLabs-9317:L-opKPzu2tawg5jcRTbEyg"
  },
  introspection: true
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
