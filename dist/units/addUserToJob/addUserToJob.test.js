"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = require("../../connect");
const addUserToJob_1 = require("./addUserToJob");
describe("Add User to Job", () => {
    beforeAll(() => {
        connect_1.default();
    });
    it("Should add a user to a job", async (done) => {
        const job = await addUserToJob_1.default({
            user: "Fcvo4EPVu7d7K0z7A1H0oindJVU2",
            job: "dJVcvo4dPUFVu7d7K0z7A1Hloin2"
        });
        console.log(job);
        expect(job).toMatchObject({
            id: "dJVcvo4dPUFVu7d7K0z7A1Hloin2",
            user: {
                id: "Fcvo4EPVu7d7K0z7A1H0oindJVU2"
            }
        });
        done();
    });
});
//# sourceMappingURL=addUserToJob.test.js.map