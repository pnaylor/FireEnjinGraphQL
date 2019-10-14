import connect from "../../connect";
connect();

import addUserToJob from "./addUserToJob";

describe("Add User to Job", () => {
  it("Should add a user to a job", async done => {
    const job = await addUserToJob({
      user: "Fcvo4EPVu7d7K0z7A1H0oindJVU2",
      job: "dJVcvo4dPUFVu7d7K0z7A1Hloin2"
    });
    expect(job).toMatchObject({
      id: "dJVcvo4dPUFVu7d7K0z7A1Hloin2",
      user: {
        id: "Fcvo4EPVu7d7K0z7A1H0oindJVU2"
      }
    });
    done();
  });
});
