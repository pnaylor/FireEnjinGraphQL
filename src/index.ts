import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";

import connect from "./connect";

(async () => {
  connect();
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
