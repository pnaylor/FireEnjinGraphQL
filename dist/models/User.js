"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fireorm_1 = require("fireorm");
const Model_1 = require("./Model");
let User = class User {
};
User = __decorate([
    fireorm_1.Collection("users")
], User);
exports.User = User;
class UserModel extends Model_1.default {
    constructor() {
        super(User);
        this.gql = `# A User Object
  type User {
    id: ID!
    name: String
    jobs: [Job]
  }`;
    }
}
exports.UserModel = UserModel;
//# sourceMappingURL=User.js.map