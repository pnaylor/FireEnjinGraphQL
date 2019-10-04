import { Collection } from "fireorm";
import {
  Field,
  ID,
  ObjectType,
  Resolver,
  Root,
  FieldResolver,
  InputType
} from "type-graphql";

import Model from "./Model";
import { User, UserModel } from "./User";

@Collection("jobs")
@ObjectType({
  description: "The information for a job ticket"
})
export class Job {
  @Field(() => ID)
  id: string;
  @Field({ nullable: true })
  customer?: string;
  @Field({
    description: "The address of the job"
  })
  address: string;
  @Field({
    nullable: true,
    description: "The primary phone number to contact for the job"
  })
  phone?: string;
  @Field()
  user: User;
}

@InputType({ description: "Editable job data" })
class JobInput implements Partial<User> {
  @Field(() => ID)
  id: string;
  @Field({ nullable: true })
  customer?: string;
}

export class JobModel extends Model {
  constructor() {
    super(Job, JobInput);
  }

  async find(id: string): Promise<Job> {
    return {
      ...((await this.ref()
        .doc(id)
        .get()).data() as any),
      id
    };
  }
}

@Resolver(of => Job)
export class JobResolver extends new JobModel().baseResolver {
  @FieldResolver()
  user(@Root() job: Job): Promise<User> {
    return new UserModel().find(job.user.id);
  }
}
