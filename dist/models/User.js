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
const fireorm_1 = require("fireorm");
const type_graphql_1 = require("type-graphql");
const Model_1 = require("./Model");
const Job_1 = require("./Job");
let User = class User {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Field(() => [Job_1.Job]),
    __metadata("design:type", Array)
], User.prototype, "jobs", void 0);
User = __decorate([
    fireorm_1.Collection("users"),
    type_graphql_1.ObjectType({ description: "The information for a user" })
], User);
exports.User = User;
let UserInput = class UserInput {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UserInput.prototype, "name", void 0);
UserInput = __decorate([
    type_graphql_1.InputType({ description: "Editable user data" })
], UserInput);
exports.UserInput = UserInput;
class UserModel extends Model_1.default {
    constructor() {
        super({
            docSchema: User,
            inputType: UserInput
        });
    }
    async jobsForId(id) {
        return (await new Job_1.JobModel()
            .ref()
            .where("user", "==", this.ref().doc(id))
            .get()).docs.map(doc => (Object.assign(Object.assign({}, doc.data()), { id: doc.id })));
    }
}
exports.UserModel = UserModel;
let UserResolver = class UserResolver extends new UserModel().Resolver {
    jobs(user) {
        return new UserModel().jobsForId(user.id);
    }
};
__decorate([
    type_graphql_1.FieldResolver({
        description: "A list of jobs the user is attached to."
    }),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "jobs", null);
UserResolver = __decorate([
    type_graphql_1.Resolver(of => User)
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=User.js.map