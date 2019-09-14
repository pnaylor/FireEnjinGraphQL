import { GetRepository } from "fireorm";

export default class {
  constructor(protected collection: any) {}

  getRepo() {
    return GetRepository(this.collection);
  }

  async findById(id: string) {
    return await this.getRepo().findById(id);
  }
}
