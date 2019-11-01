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
const User_1 = require("./User");
let Job = class Job {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Job.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Job.prototype, "customer", void 0);
__decorate([
    type_graphql_1.Field({
        description: "The address of the job"
    }),
    __metadata("design:type", String)
], Job.prototype, "address", void 0);
__decorate([
    type_graphql_1.Field({
        nullable: true,
        description: "The primary phone number to contact for the job"
    }),
    __metadata("design:type", String)
], Job.prototype, "phone", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User),
    __metadata("design:type", User_1.User)
], Job.prototype, "user", void 0);
Job = __decorate([
    fireorm_1.Collection("jobs"),
    type_graphql_1.ObjectType({
        description: "The information for a job ticket"
    })
], Job);
exports.Job = Job;
let JobInput = class JobInput {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], JobInput.prototype, "customer", void 0);
JobInput = __decorate([
    type_graphql_1.InputType({ description: "Editable job data" })
], JobInput);
exports.JobInput = JobInput;
class JobModel extends Model_1.default {
    constructor() {
        super({
            docSchema: Job,
            inputType: JobInput
        });
    }
    async find(id) {
        return Object.assign(Object.assign({}, (await this.ref()
            .doc(id)
            .get()).data()), { id });
    }
}
exports.JobModel = JobModel;
let JobResolver = class JobResolver extends new JobModel().Resolver {
    user(job) {
        return new User_1.UserModel().find(job.user.id);
    }
};
__decorate([
    type_graphql_1.FieldResolver(),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Job]),
    __metadata("design:returntype", Promise)
], JobResolver.prototype, "user", null);
JobResolver = __decorate([
    type_graphql_1.Resolver(of => Job)
], JobResolver);
exports.JobResolver = JobResolver;
//# sourceMappingURL=Job.js.map