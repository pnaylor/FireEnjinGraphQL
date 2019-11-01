"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const type_graphql_1 = require("type-graphql");
const auth_1 = require("./auth");
const connect_1 = require("./connect");
const env_1 = require("./env");
(async () => {
    connect_1.default();
    const server = new apollo_server_1.ApolloServer({
        context: env_1.default("graphql.tokenAuth", true)
            ? ({ req }) => ({
                token: req.headers && req.headers.authorization
                    ? req.headers.authorization.replace(env_1.default("graphql.tokenPrefix", "Bearer "), "")
                    : null,
                env: env_1.default("env")
            })
            : null,
        schema: await type_graphql_1.buildSchema({
            resolvers: [
                __dirname + "/models/**/*.ts",
                __dirname + "/resolvers/**/*.ts"
            ],
            emitSchemaFile: {
                path: __dirname + "/../schema.gql",
                commentDescriptions: true
            },
            authChecker: auth_1.default
        }),
        introspection: env_1.default("graphql.introspection", true)
    });
    const serverInfo = await server.listen({ port: env_1.default("graphql.port", 4000) });
    console.log(`🚀  Server running on ${env_1.default("env", "local")} and ready at ${serverInfo.url}`);
})().catch(error => console.log(error));
//# sourceMappingURL=index.js.map