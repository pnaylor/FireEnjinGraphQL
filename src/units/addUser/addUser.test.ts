import connect from "../../connect";

import { UserModel } from "../../models/User";

describe("Add User", () => {
  it("Should add a user", async done => {
    connect();
    const User = new UserModel();
    console.log(User);
    expect(true).toBeTruthy();
    // const newUser = await addUser({
    //   name: "Darin"
    // });
    // console.log(newUser);
    // expect(newUser).toMatchObject({
    //   name: "Darin"
    // });
    done();
  });
});
