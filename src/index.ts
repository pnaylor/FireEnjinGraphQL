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
const resolvers = [];

console.log("wee");

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
  }

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers
    }),
    engine: {
      apiKey: "service:MadnessLabs-9317:L-opKPzu2tawg5jcRTbEyg"
    },
    introspection: true
  });

  server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
});
