import * as admin from "firebase-admin";
import { Initialize } from "fireorm";
import { ApolloServer, ApolloError, ValidationError, gql } from "apollo-server";

const serviceAccount = require("../service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
});
const firestore = admin.firestore();
Initialize(firestore);

import { JobModel } from "./models/Job";
import { UserModel } from "./models/User";

const jobModel = new JobModel();
const userModel = new UserModel();

const typeDefs = gql`
  ${userModel.gql}

  ${jobModel.gql}

  type Query {
    jobs: [Job]
    job(id: String!): Job
    users: [User]
    user(id: String!): User
  }
`;

const resolvers = {
  Query: {
    async jobs() {
      try {
        return (
          (await jobModel
            .ref()
            .limit(15)
            .get()).docs.map(doc => ({ ...doc.data(), id: doc.id })) ||
          new ValidationError("Jobs not found")
        );
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    async job(_: null, args: { id: string }) {
      try {
        return (
          (await jobModel.find(args.id)) ||
          new ValidationError("Job with matching id not found")
        );
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    async users() {
      try {
        return (
          (await userModel
            .ref()
            .limit(15)
            .get()).docs.map(doc => ({ ...doc.data(), id: doc.id })) ||
          new ValidationError("Users not found")
        );
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    async user(_: null, args: { id: string }) {
      try {
        return (
          (await userModel.find(args.id)) ||
          new ValidationError("User with matching id not found")
        );
      } catch (error) {
        throw new ApolloError(error);
      }
    }
  },
  User: {
    async jobs(user) {
      try {
        return (
          (await userModel.jobsForId(jobModel, user.id)) ||
          new ValidationError("Jobs not found for user")
        );
      } catch (error) {
        throw new ApolloError(error);
      }
    }
  },
  Job: {
    async user(job) {
      try {
        return (
          (await userModel.find(job.user.id)) ||
          new ValidationError("User for Job not found")
        );
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
