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
import { Job, JobModel } from "./Job";

@Collection("users")
@ObjectType({ description: "The information for a user" })
export class User {
  @Field(() => ID)
  id: string;
  @Field()
  name?: string;
  @Field(() => [Job])
  jobs?: Job[];
}

@InputType({ description: "Editable user data" })
class UserInput implements Partial<User> {
  @Field({ nullable: true })
  name?: string;
}

export class UserModel extends Model {
  constructor() {
    super(User, UserInput);
  }

  async jobsForId(id: string): Promise<Job[]> {
    return (await new JobModel()
      .ref()
      .where("user", "==", this.ref().doc(id))
      .get()).docs.map(doc => ({ ...doc.data(), id: doc.id })) as any;
  }
}

@Resolver(of => User)
export class UserResolver extends new UserModel().baseResolver {
  @FieldResolver()
  jobs(@Root() user: User): Promise<Job[]> {
    return new UserModel().jobsForId(user.id);
  }
}
