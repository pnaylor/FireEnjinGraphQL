import { Arg, ClassType, Query, Resolver } from "type-graphql";

function createResolver<T extends ClassType>(
  suffix: string,
  returnType: T,
  entity: any
) {
  @Resolver({ isAbstract: true })
  abstract class BaseResolver {
    @Query(returns => returnType, {
      nullable: true,
      description: `Get a specific ${suffix.toLowerCase()} document from the database`
    })
    [suffix.toLowerCase()](@Arg("id") id: string): Promise<T> {
      console.log(suffix, entity);
      return new entity().find(id);
    }
  }

  return BaseResolver;
}
