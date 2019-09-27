"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fireorm_1 = require("fireorm");
class default_1 {
    constructor(collection) {
        this.collection = collection;
    }
    create(modelObject) {
        return this.getRepo().create(modelObject);
    }
    delete(id) {
        return this.getRepo().delete(id);
    }
    execute(queries, limitVal, orderByObj) {
        return this.getRepo().execute(queries, limitVal, orderByObj);
    }
    async find(id) {
        return Object.assign(Object.assign({}, (await this.getRepo().findById(id))), { id });
    }
    getRepo() {
        return fireorm_1.GetRepository(this.collection);
    }
    limit(limitTo) {
        return this.getRepo().limit(limitTo);
    }
    orderByAscending(prop) {
        return this.getRepo().orderByAscending(prop);
    }
    orderByDescending(prop) {
        return this.getRepo().orderByDescending(prop);
    }
    whereEqualTo(prop, value) {
        return this.getRepo().whereEqualTo(prop, value);
    }
    whereGreaterThan(prop, value) {
        return this.getRepo().whereGreaterThan(prop, value);
    }
    whereLessThan(prop, value) {
        return this.getRepo().whereLessThan(prop, value);
    }
    whereLessOrEqualThan(prop, value) {
        return this.getRepo().whereLessOrEqualThan(prop, value);
    }
    whereArrayContains(prop, value) {
        return this.getRepo().whereArrayContains(prop, value);
    }
    runTransaction(executor) {
        return this.getRepo().runTransaction(executor);
    }
}
exports.default = default_1;
//# sourceMappingURL=Model.js.map