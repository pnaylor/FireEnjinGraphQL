"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const Job_1 = require("../models/Job");
const addUserToJob_1 = require("../inputs/addUserToJob");
const addUserToJob_2 = require("../units/addUserToJob/addUserToJob");
let AddUserToJobResolver = class AddUserToJobResolver {
    async addUserToJob(data) {
        return addUserToJob_2.default(data);
    }
};
__decorate([
    type_graphql_1.Mutation(() => Job_1.Job),
    __param(0, type_graphql_1.Arg("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [addUserToJob_1.default]),
    __metadata("design:returntype", Promise)
], AddUserToJobResolver.prototype, "addUserToJob", null);
AddUserToJobResolver = __decorate([
    type_graphql_1.Resolver()
], AddUserToJobResolver);
exports.AddUserToJobResolver = AddUserToJobResolver;
//# sourceMappingURL=AddUserToJob.js.map