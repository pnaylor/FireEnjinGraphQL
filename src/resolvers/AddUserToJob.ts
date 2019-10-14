import { Arg, Mutation, Resolver } from "type-graphql";

import { Job } from "../models/Job";

import AddUserToJobInput from "../inputs/addUserToJob";

import addUserToJobUnit from "../units/addUserToJob/addUserToJob";

@Resolver()
class AddUserToJobResolver {
  @Mutation(() => Job)
  async addUserToJob(@Arg("data") data: AddUserToJobInput): Promise<Job> {
    return addUserToJobUnit(data);
  }
}
