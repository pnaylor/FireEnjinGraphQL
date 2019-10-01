import * as admin from "firebase-admin";
import { Initialize } from "fireorm";
import { ApolloServer, ApolloError, ValidationError, gql } from "apollo-server";
import { buildSchema } from "type-graphql";

const serviceAccount = require("../service-account.json");

(async () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
  });
  const firestore = admin.firestore();
  Initialize(firestore);

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + "/models/**/*.ts"],
      emitSchemaFile: {
        path: __dirname + "/../schema.gql",
        commentDescriptions: true
      }
    }),
    engine: {
      apiKey: "service:MadnessLabs-9317:L-opKPzu2tawg5jcRTbEyg"
    },
    introspection: true
  });

  const serverInfo = await server.listen({ port: process.env.PORT || 4000 });
  console.log(`🚀  Server ready at ${serverInfo.url}`);
})();
