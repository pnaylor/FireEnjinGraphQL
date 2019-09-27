"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const fireorm_1 = require("fireorm");
const apollo_server_1 = require("apollo-server");
const serviceAccount = require("../service-account.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
});
const firestore = admin.firestore();
fireorm_1.Initialize(firestore);
const Job_1 = require("./models/Job");
const User_1 = require("./models/User");
const jobModel = new Job_1.JobModel();
const userModel = new User_1.UserModel();
const typeDefs = apollo_server_1.gql `
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
                return ((await jobModel
                    .ref()
                    .limit(15)
                    .get()).docs.map(doc => (Object.assign(Object.assign({}, doc.data()), { id: doc.id }))) ||
                    new apollo_server_1.ValidationError("Jobs not found"));
            }
            catch (error) {
                throw new apollo_server_1.ApolloError(error);
            }
        },
        async job(_, args) {
            try {
                return ((await jobModel.find(args.id)) ||
                    new apollo_server_1.ValidationError("Job with matching id not found"));
            }
            catch (error) {
                throw new apollo_server_1.ApolloError(error);
            }
        },
        async users() {
            try {
                return ((await userModel
                    .ref()
                    .limit(15)
                    .get()).docs.map(doc => (Object.assign(Object.assign({}, doc.data()), { id: doc.id }))) ||
                    new apollo_server_1.ValidationError("Users not found"));
            }
            catch (error) {
                throw new apollo_server_1.ApolloError(error);
            }
        },
        async user(_, args) {
            try {
                return ((await userModel.find(args.id)) ||
                    new apollo_server_1.ValidationError("User with matching id not found"));
            }
            catch (error) {
                throw new apollo_server_1.ApolloError(error);
            }
        }
    },
    User: {
        async jobs(user) {
            try {
                return ((await userModel.jobsForId(jobModel, user.id)) ||
                    new apollo_server_1.ValidationError("Jobs not found for user"));
            }
            catch (error) {
                throw new apollo_server_1.ApolloError(error);
            }
        }
    },
    Job: {
        async user(job) {
            try {
                return ((await userModel.find(job.user.id)) ||
                    new apollo_server_1.ValidationError("User for Job not found"));
            }
            catch (error) {
                throw new apollo_server_1.ApolloError(error);
            }
        }
    }
};
const server = new apollo_server_1.ApolloServer({
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
//# sourceMappingURL=index.js.map