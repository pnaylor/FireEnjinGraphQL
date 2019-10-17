import {
  GetRepository,
  IFireOrmQueryLine,
  IFirestoreVal,
  IOrderByParams
} from "fireorm";
import { Arg, ClassType, Mutation, Query, Resolver } from "type-graphql";
import { firestore } from "firebase-admin";
import * as pluralize from "pluralize";

/**
 * Add capitalization on the first letter of a string
 * @param str The string being capped
 */
function capFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Remove capitalization of the first letter of a string
 * @param str The string being uncapped
 */
function uncapFirstLetter(str: string) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

/**
 * Create basic CRUD functionality with resolvers
 * @param suffix The name of the model
 * @param returnType The model types
 * @param model The actual model class
 * @param inputType The input types
 */
function createResolver<T extends ClassType>(
  modelName: string,
  collectionName: string,
  returnType: T,
  model: any,
  inputType: any
) {
  if (inputType) {
    @Resolver(of => returnType)
    class CrudResolver {
      @Query(returns => returnType, {
        nullable: true,
        description: `Get a specific ${modelName} document from the ${collectionName} collection.`
      })
      async [`${uncapFirstLetter(modelName)}`](
        @Arg("id") id: string
      ): Promise<T> {
        return await model.find(id);
      }

      @Query(returns => [returnType], {
        nullable: true,
        description: `Get a list of ${modelName} documents from the ${collectionName} collection.`
      })
      async [`${uncapFirstLetter(collectionName)}`](): Promise<any[]> {
        return (await model
          .ref()
          .limit(15)
          .get()).docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));
      }

      @Mutation(returns => returnType)
      async [`add${modelName}`](
        @Arg("data", () => inputType, {
          description: `Add a new ${modelName} document to the ${collectionName} collection.`
        })
        data: any
      ) {
        return await model.create(data);
      }

      @Mutation(returns => returnType)
      async [`delete${modelName}`](
        @Arg("id", () => String, {
          description: `The ID of the ${modelName} document being deleted in the ${collectionName} collection`
        })
        id: string
      ) {
        const modelBefore = await model.find(id);
        await model.delete(id);

        return modelBefore;
      }

      @Mutation(returns => returnType)
      async [`edit${modelName}`](
        @Arg("id", () => String, {
          description: `The ID of the ${modelName} document in the ${collectionName} collection`
        })
        id: string,
        @Arg("data", () => inputType, {
          description: `Update a ${modelName} document in the ${collectionName} collection.`
        })
        data: any
      ) {
        return await model.update({ id, ...data });
      }
    }

    return CrudResolver;
  } else {
    @Resolver(of => returnType)
    class BaseResolver {
      @Query(returns => returnType, {
        nullable: true,
        description: `Get a specific ${modelName} document from the ${collectionName} collection.`
      })
      async [`${uncapFirstLetter(modelName)}`](
        @Arg("id") id: string
      ): Promise<T> {
        return await model.find(id);
      }

      @Query(returns => [returnType], {
        nullable: true,
        description: `Get a list of ${modelName} documents from the ${collectionName} collection.`
      })
      async [`${uncapFirstLetter(collectionName)}`](): Promise<any[]> {
        return (await model
          .ref()
          .limit(15)
          .get()).docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));
      }
    }

    return BaseResolver;
  }
}

export default class {
  Resolver: any;
  collectionName: string;

  constructor(
    protected options: {
      docSchema: any;
      inputType?: any;
      collectionName?: string;
    }
  ) {
    if (options) {
      this.collectionName = options.collectionName
        ? options.collectionName
        : pluralize(options.docSchema.name);
    }
    if (options && options.docSchema) {
      this.Resolver = createResolver(
        capFirstLetter(options.docSchema.name),
        this.collectionName,
        options.docSchema,
        this,
        options.inputType
      );
    }
  }

  /**
   * Create a new document and add it to the collection
   * @param modelObject The data to add to the document
   */
  create(modelObject) {
    return this.repo().create(modelObject);
  }

  /**
   * Delete a document from a collection
   * @param id The id of the document to delete
   */
  delete(id) {
    return this.repo().delete(id);
  }

  /**
   * Execute a query on a collection
   * @param queries A list of queries
   * @param limitVal The limit of records to return
   * @param orderByObj The order of the records
   */
  execute(
    queries: Array<IFireOrmQueryLine>,
    limitVal?: number,
    orderByObj?: IOrderByParams
  ) {
    return this.repo().execute(queries, limitVal, orderByObj);
  }

  /**
   * Get a specific document's data
   * @param id The id of the document
   */
  async find(id: string) {
    const data = await this.repo().findById(id);
    data.id = id;

    return data;
  }

  /**
   * Get the name of the collection the model is attached to
   */
  getCollectionName() {
    return this.collectionName;
  }

  /**
   * Get the Firestore reference to the collection
   */
  ref(): firestore.CollectionReference {
    return (this.repo() as any).firestoreColRef;
  }

  /**
   * Get the FireORM repo reference for the collection
   * @see https://fireorm.js.org/#/classes/basefirestorerepository
   */
  repo() {
    return GetRepository(this.options.docSchema);
  }

  /**
   * Run a transaction on the collection
   * @param executor The transaction executor function
   */
  runTransaction(executor) {
    return this.repo().runTransaction(executor);
  }

  /**
   * Limit the number of records returned
   * @param limitTo The limit of data to return
   */
  limit(limitTo: number) {
    return this.repo().limit(limitTo);
  }

  /**
   * Order a list of documents by a specific property in ascending order
   * @param prop The property to order ascending by
   */
  orderByAscending(prop) {
    return this.repo().orderByAscending(prop);
  }

  /**
   * Order a list of documents by a specific property in descending order
   * @param prop The property to order descending by
   */
  orderByDescending(prop) {
    return this.repo().orderByDescending(prop);
  }

  /**
   * Update the data on a document from the collection
   * @param data The data to update on the document
   */
  update(data: any) {
    return this.repo().update(data);
  }

  /**
   * Get a list of documents where property equals value
   * @param prop The property to check eqaulity of
   * @param value The value to be equal to
   */
  whereEqualTo(prop, value: IFirestoreVal) {
    return this.repo().whereEqualTo(prop, value);
  }

  /**
   * Get a list of documents where property greater than value
   * @param prop The property to check eqaulity of
   * @param value The value to be greater than to
   */
  whereGreaterThan(prop, value: IFirestoreVal) {
    return this.repo().whereGreaterThan(prop, value);
  }

  /**
   * Get a list of documents where property less than value
   * @param prop The property to check eqaulity of
   * @param value The value to be less than to
   */
  whereLessThan(prop, value: IFirestoreVal) {
    return this.repo().whereLessThan(prop, value);
  }

  /**
   * Get a list of documents where property less than or equal to value
   * @param prop The property to check eqaulity of
   * @param value The value to be less than or equal to
   */
  whereLessOrEqualThan(prop, value: IFirestoreVal) {
    return this.repo().whereLessOrEqualThan(prop, value);
  }

  /**
   * Get a list of documents where property is equal to one of a list of values
   * @param prop The property to search for values
   * @param value The values to check for
   */
  whereArrayContains(prop, value: IFirestoreVal) {
    return this.repo().whereArrayContains(prop, value);
  }
}
