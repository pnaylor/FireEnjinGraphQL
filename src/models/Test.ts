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

@Collection("tests")
@ObjectType({
  description: "The information for a job ticket"
})
export class Test {
  @Field(() => ID)
  id: string;
}

@InputType({ description: "Editable test data" })
export class TestInput implements Partial<Test> {

}

export class TestModel extends Model {
  constructor() {
    super({
      docSchema: Test,
      inputType: JobInput
    });
  }
}

// @Resolver(of => Test)
// export class TestResolver extends new TestModel().Resolver {
//   @FieldResolver()
//   user(@Root() data: Test): Promise<User> {
//     return new UserModel().find(data.user.id);
//   }
// }
