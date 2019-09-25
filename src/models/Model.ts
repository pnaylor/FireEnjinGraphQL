import {
  GetRepository,
  IFireOrmQueryLine,
  IFirestoreVal,
  IOrderByParams
} from "fireorm";

export default class {
  constructor(protected collection: any) {}

  create(modelObject) {
    return this.getRepo().create(modelObject);
  }

  delete(id) {
    return this.getRepo().delete(id);
  }

  execute(
    queries: Array<IFireOrmQueryLine>,
    limitVal?: number,
    orderByObj?: IOrderByParams
  ) {
    return this.getRepo().execute(queries, limitVal, orderByObj);
  }

  find(id: string) {
    return this.getRepo().findById(id);
  }

  getRepo() {
    return GetRepository(this.collection);
  }

  limit(limitTo: number) {
    return this.getRepo().limit(limitTo);
  }

  orderByAscending(prop) {
    return this.getRepo().orderByAscending(prop);
  }

  orderByDescending(prop) {
    return this.getRepo().orderByDescending(prop);
  }

  whereEqualTo(prop, value: IFirestoreVal) {
    return this.getRepo().whereEqualTo(prop, value);
  }

  whereGreaterThan(prop, value: IFirestoreVal) {
    return this.getRepo().whereGreaterThan(prop, value);
  }

  whereLessThan(prop, value: IFirestoreVal) {
    return this.getRepo().whereLessThan(prop, value);
  }

  whereLessOrEqualThan(prop, value: IFirestoreVal) {
    return this.getRepo().whereLessOrEqualThan(prop, value);
  }

  whereArrayContains(prop, value: IFirestoreVal) {
    return this.getRepo().whereArrayContains(prop, value);
  }
}
