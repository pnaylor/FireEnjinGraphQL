import connect from "../../connect";
connect();

import addUser from "./addUser";

describe("Add User", () => {
  it("Should add a user", async done => {
    const newUser = await addUser({
      name: "Darin"
    });
    expect(newUser).toMatchObject({
      name: "Darin"
    });
    done();
  });
});
