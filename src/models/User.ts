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
import { Job, JobModel } from "./Job";

@Collection("users")
@ObjectType()
export class User {
  @Field(() => ID)
  id: string;
  @Field()
  name?: string;
  @Field(() => [Job])
  jobs?: Job[];
}

export class UserModel extends Model {
  constructor() {
    super(User);
  }

  async jobsForId(id: string): Promise<Job[]> {
    return (await new JobModel()
      .ref()
      .where("user", "==", this.ref().doc(id))
      .get()).docs.map(doc => ({ ...doc.data(), id: doc.id })) as any;
  }
}

@Resolver(of => User)
export class UserResolver {
  @Query(returns => User, { nullable: true })
  user(@Arg("id") id: string): Promise<User> {
    return new UserModel().find(id);
  }

  @Query(returns => [User])
  async users(): Promise<User[]> {
    return (await new UserModel()
      .ref()
      .limit(15)
      .get()).docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));
  }

  @FieldResolver()
  jobs(@Root() user: User): Promise<Job[]> {
    return new UserModel().jobsForId(user.id);
  }
}
