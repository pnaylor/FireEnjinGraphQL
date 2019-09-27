import {
  GetRepository,
  IFireOrmQueryLine,
  IFirestoreVal,
  IOrderByParams
} from "fireorm";
import { firestore } from "firebase-admin";

export default class {
  constructor(protected collection: any) {}

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
    return { ...(await this.repo().findById(id)), id };
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
