"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var graphql_1 = require("graphql");
var graphql_tag_1 = require("graphql-tag");
exports.AddUserToJobDocument = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    mutation AddUserToJob($data: AddUserToJobInput!) {\n  addUserToJob(data: $data) {\n    id\n    customer\n    user {\n      id\n      name\n    }\n  }\n}\n    "], ["\n    mutation AddUserToJob($data: AddUserToJobInput!) {\n  addUserToJob(data: $data) {\n    id\n    customer\n    user {\n      id\n      name\n    }\n  }\n}\n    "])));
exports.EditUserDocument = graphql_tag_1["default"](templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    mutation EditUser($id: String!, $data: UserInput!) {\n  editUser(id: $id, data: $data) {\n    id\n  }\n}\n    "], ["\n    mutation EditUser($id: String!, $data: UserInput!) {\n  editUser(id: $id, data: $data) {\n    id\n  }\n}\n    "])));
exports.FindUserDocument = graphql_tag_1["default"](templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    query findUser($userId: String!) {\n  user(id: $userId) {\n    id\n    name\n  }\n}\n    "], ["\n    query findUser($userId: String!) {\n  user(id: $userId) {\n    id\n    name\n  }\n}\n    "])));
function getSdk(client) {
    return {
        AddUserToJob: function (variables) {
            return client.request(graphql_1.print(exports.AddUserToJobDocument), variables);
        },
        EditUser: function (variables) {
            return client.request(graphql_1.print(exports.EditUserDocument), variables);
        },
        findUser: function (variables) {
            return client.request(graphql_1.print(exports.FindUserDocument), variables);
        }
    };
}
exports.getSdk = getSdk;
var templateObject_1, templateObject_2, templateObject_3;
