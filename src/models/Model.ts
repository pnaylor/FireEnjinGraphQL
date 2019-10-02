import {
  GetRepository,
  IFireOrmQueryLine,
  IFirestoreVal,
  IOrderByParams
} from "fireorm";
import {
  Arg,
  ClassType,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  ArgsType
} from "type-graphql";
import { firestore } from "firebase-admin";

function createResolver<T extends ClassType>(
  suffix: string,
  returnType: T,
  model: any
) {
  @Resolver(of => returnType)
  class BaseResolver {
    @Query(returns => returnType, {
      nullable: true,
      description: `Get a specific ${suffix.toLowerCase()} document from the collection.`
    })
    async [`${suffix.toLowerCase()}`](@Arg("id") id: string): Promise<T> {
      return await model.find(id);
    }

    @Query(returns => [returnType], {
      nullable: true,
      description: `Get a list of ${suffix.toLowerCase()} documents from the collection.`
    })
    async [`${suffix.toLowerCase()}s`](): Promise<any[]> {
      return (await model
        .ref()
        .limit(15)
        .get()).docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));
    }

    // @Mutation(returns => returnType)
    // async [`add${suffix.toLowerCase()}`](
    //   @Arg("data", () => modelData, {
    //     description: `Add a new document to the ${suffix.toLowerCase()} collection.`
    //   })
    //   data: any
    // ) {
    //   return await model.create(data);
    // }
  }

  return BaseResolver;
}

export default class {
  baseResolver: any;

  constructor(protected collection: any) {
    this.baseResolver = this.getBaseResolver(collection.name, collection);
  }

  getBaseResolver(name, collection) {
    return createResolver(name, collection, this);
  }

  create(modelObject) {
    return this.repo().create(modelObject);
  }

  delete(id) {
    return this.repo().delete(id);
  }

  execute(
    queries: Array<IFireOrmQueryLine>,
    limitVal?: number,
    orderByObj?: IOrderByParams
  ) {
    return this.repo().execute(queries, limitVal, orderByObj);
  }

  async find(id: string) {
    const data = await this.repo().findById(id);
    data.id = id;

    return data;
  }

  ref(): firestore.CollectionReference {
    return (this.repo() as any).firestoreColRef;
  }

  repo() {
    return GetRepository(this.collection);
  }

  runTransaction(executor) {
    return this.repo().runTransaction(executor);
  }

  limit(limitTo: number) {
    return this.repo().limit(limitTo);
  }

  orderByAscending(prop) {
    return this.repo().orderByAscending(prop);
  }

  orderByDescending(prop) {
    return this.repo().orderByDescending(prop);
  }

  whereEqualTo(prop, value: IFirestoreVal) {
    return this.repo().whereEqualTo(prop, value);
  }

  whereGreaterThan(prop, value: IFirestoreVal) {
    return this.repo().whereGreaterThan(prop, value);
  }

  whereLessThan(prop, value: IFirestoreVal) {
    return this.repo().whereLessThan(prop, value);
  }

  whereLessOrEqualThan(prop, value: IFirestoreVal) {
    return this.repo().whereLessOrEqualThan(prop, value);
  }

  whereArrayContains(prop, value: IFirestoreVal) {
    return this.repo().whereArrayContains(prop, value);
  }
}
