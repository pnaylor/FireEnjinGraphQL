"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Job_1 = require("../../models/Job");
const User_1 = require("../../models/User");
/**
 * This will tie a user to a job ticket
 */
async function addUserToJobUnit(data) {
    const Jobs = new Job_1.JobModel();
    const Users = new User_1.UserModel();
    const updatedJob = (await Jobs.update(Object.assign(Object.assign({}, (await Jobs.find(data.job))), { user: Users.ref().doc(data.user) })));
    updatedJob.user = await Users.find(data.user);
    return updatedJob;
}
exports.default = addUserToJobUnit;
//# sourceMappingURL=addUserToJob.js.map