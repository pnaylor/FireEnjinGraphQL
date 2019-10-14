import { Job, JobModel } from "../../models/Job";
import { UserModel } from "../../models/User";

import AddUserToJobInput from "../../inputs/addUserToJob";

/**
 * This will tie a user to a job ticket
 */
export default async function addUserToJobUnit(
  data: AddUserToJobInput
): Promise<Job> {
  const Jobs = new JobModel();

  return (await Jobs.update({
    ...(await Jobs.find(data.job)),
    user: new UserModel().ref().doc(data.user)
  })) as any;
}
