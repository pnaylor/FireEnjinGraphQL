import { Collection } from "fireorm";
import {
  Arg,
  ArgsType,
  Field,
  ID,
  ObjectType,
  Resolver,
  Query
} from "type-graphql";

import Model from "./Model";

@Collection("jobs")
@ObjectType()
export class Job {
  @Field(() => ID)
  id: string;
  @Field(() => String)
  customer: string;
  @Field(() => String)
  address: string;
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

@Resolver()
export class JobsResolver {
  @Query(returns => Job)
  async job(@Arg("id") id: string): Promise<Job> {
    return await new JobModel().find(id);
  }

  @Query(returns => [Job])
  async jobs(): Promise<Job[]> {
    return (await new JobModel()
      .ref()
      .limit(15)
      .get()).docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));
  }
}

@ArgsType()
class GetJobArgs {
  @Field(type => String)
  customer: string;
}
