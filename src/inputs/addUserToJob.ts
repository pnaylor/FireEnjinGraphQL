import { Field, InputType } from "type-graphql";

@InputType({ description: "The id of the job and user being tied together." })
export default class AddUserToJobInput {
  @Field()
  user: string;
  @Field()
  job: string;
}
