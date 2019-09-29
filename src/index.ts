import * as admin from "firebase-admin";
import { Initialize } from "fireorm";
import { ApolloServer, ApolloError, ValidationError, gql } from "apollo-server";
import * as glob from "glob";
import { buildSchema } from "type-graphql";

const serviceAccount = require("../service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
});
const firestore = admin.firestore();
Initialize(firestore);

const models: any = {};
let modelTypes = ``;
const resolvers = [];

glob("src/models/**/!(Model).ts", async (error, files) => {
  for (const file of files) {
    const importedFile = await import(
      file.replace("src/models", "./models").replace(".ts", "")
    );
    const importedModules = Object.keys(importedFile);
    models[importedModules[0]] = new importedFile[importedModules[1]]();
    if (importedModules[2] && importedModules[2].indexOf("Resolver") >= 0) {
      resolvers.push(importedModules[2]);
    }
    if (models[importedModules[0]].gql) {
      modelTypes += `${models[importedModules[0]].gql}
  `;
    }
  }

  const typeDefs = gql`
    ${modelTypes}

    type Query {
      jobs: [Job]
      job(id: String!): Job
      users: [User]
      user(id: String!): User
    }
  `;

  // const resolvers = {
  //   Query: {
  //     async job(_: null, args: { id: string }) {
  //       try {
  //         return (
  //           (await models.Job.find(args.id)) ||
  //           new ValidationError("Job with matching id not found")
  //         );
  //       } catch (error) {
  //         throw new ApolloError(error);
  //       }
  //     },
  //     async users() {
  //       try {
  //         return (
  //           (await models.User.ref()
  //             .limit(15)
  //             .get()).docs.map(doc => ({ ...doc.data(), id: doc.id })) ||
  //           new ValidationError("Users not found")
  //         );
  //       } catch (error) {
  //         throw new ApolloError(error);
  //       }
  //     },
  //     async user(_: null, args: { id: string }) {
  //       try {
  //         return (
  //           (await models.User.find(args.id)) ||
  //           new ValidationError("User with matching id not found")
  //         );
  //       } catch (error) {
  //         throw new ApolloError(error);
  //       }
  //     }
  //   },
  //   User: {
  //     async jobs(user) {
  //       try {
  //         return (
  //           (await models.User.jobsForId(models.Job, user.id)) ||
  //           new ValidationError("Jobs not found for user")
  //         );
  //       } catch (error) {
  //         throw new ApolloError(error);
  //       }
  //     }
  //   },
  //   Job: {
  //     async user(job) {
  //       try {
  //         return (
  //           (await models.User.find(job.user.id)) ||
  //           new ValidationError("User for Job not found")
  //         );
  //       } catch (error) {
  //         throw new ApolloError(error);
  //       }
  //     }
  //   }
  // };

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers
    }),
    typeDefs,
    engine: {
      apiKey: "service:MadnessLabs-9317:L-opKPzu2tawg5jcRTbEyg"
    },
    introspection: true
  });

  server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
});
