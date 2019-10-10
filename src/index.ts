import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";

import authChecker from "./auth";
import connect from "./connect";
import env from "./env";

(async () => {
  connect();
  const server = new ApolloServer({
    context: env("graphql.tokenAuth", true)
      ? ({ req }) => ({
          token:
            req.headers.authorization.replace(
              env("graphql.tokenPrefix", "Bearer "),
              ""
            ) || null,
          env: env("env")
        })
      : null,
    schema: await buildSchema({
      resolvers: [__dirname + "/models/**/*.ts"],
      emitSchemaFile: {
        path: __dirname + "/../schema.gql",
        commentDescriptions: true
      },
      authChecker
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
