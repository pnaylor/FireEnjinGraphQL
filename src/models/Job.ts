import { Collection } from "fireorm";
import {
  Arg,
  Field,
  ID,
  ObjectType,
  Resolver,
  Root,
  Query,
  FieldResolver
} from "type-graphql";

import Model from "./Model";
import { User, UserModel } from "./User";

@Collection("jobs")
@ObjectType()
export class Job {
  @Field(() => ID)
  id: string;
  @Field()
  customer: string;
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

export class JobModel extends Model {
  constructor() {
    super(Job);
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
export class JobResolver {
  @Query(returns => Job, {
    nullable: true,
    description: "Get a specific job document from the database"
  })
  job(@Arg("id") id: string): Promise<Job> {
    return new JobModel().find(id);
  }

  @Query(returns => [Job])
  async jobs(): Promise<Job[]> {
    return (await new JobModel()
      .ref()
      .limit(15)
      .get()).docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));
  }

  @FieldResolver()
  user(@Root() job: Job): Promise<User> {
    return new UserModel().find(job.user.id);
  }
}
