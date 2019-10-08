import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";

import connect from "./connect";
import env from "./env";

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
    introspection: env("graphql.introspection", true)
  });

  const serverInfo = await server.listen({ port: env("graphql.port", 4000) });
  console.log(
    `🚀  Server running on ${env("env", "local")} and ready at ${
      serverInfo.url
    }`
  );
})();
