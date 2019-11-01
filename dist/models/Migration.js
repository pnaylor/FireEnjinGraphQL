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
Object.defineProperty(exports, "__esModule", { value: true });
const fireorm_1 = require("fireorm");
const type_graphql_1 = require("type-graphql");
const Model_1 = require("./Model");
let Migration = class Migration {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Migration.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], Migration.prototype, "createdAt", void 0);
Migration = __decorate([
    fireorm_1.Collection("migrations"),
    type_graphql_1.ObjectType({
        description: "The information for a migration"
    })
], Migration);
exports.Migration = Migration;
class MigrationModel extends Model_1.default {
    constructor() {
        super({
            docSchema: Migration
        });
    }
}
exports.MigrationModel = MigrationModel;
let MigrationResolver = class MigrationResolver extends new MigrationModel().Resolver {
};
MigrationResolver = __decorate([
    type_graphql_1.Resolver(of => Migration)
], MigrationResolver);
exports.MigrationResolver = MigrationResolver;
//# sourceMappingURL=Migration.js.map