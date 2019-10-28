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

@Collection("ems")
@ObjectType({
description: "The information for a Em document"
})
export class Em {
@Field(() => ID)
id: string;
}

@InputType({ description: "Editable em data" })
export class EmInput implements Partial<Em> {

  }

  export class EmModel extends Model {
  constructor() {
  super({
  docSchema: Em,
  inputType: EmInput
  });
  }
  }

  // @Resolver(of => Em)
  // export class EmResolver extends new EmModel().Resolver {
  // @FieldResolver()
  // user(@Root() data: Em): Promise<User> {
    // return new UserModel().find(data.user.id);
    // }
    // }