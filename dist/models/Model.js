"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fireorm_1 = require("fireorm");
class default_1 {
    constructor(collection) {
        this.collection = collection;
    }
    create(modelObject) {
        return this.repo().create(modelObject);
    }
    delete(id) {
        return this.repo().delete(id);
    }
    execute(queries, limitVal, orderByObj) {
        return this.repo().execute(queries, limitVal, orderByObj);
    }
    async find(id) {
        return Object.assign(Object.assign({}, (await this.repo().findById(id))), { id });
    }
    ref() {
        return this.repo().firestoreColRef;
    }
    repo() {
        return fireorm_1.GetRepository(this.collection);
    }
    runTransaction(executor) {
        return this.repo().runTransaction(executor);
    }
    limit(limitTo) {
        return this.repo().limit(limitTo);
    }
    orderByAscending(prop) {
        return this.repo().orderByAscending(prop);
    }
    orderByDescending(prop) {
        return this.repo().orderByDescending(prop);
    }
    whereEqualTo(prop, value) {
        return this.repo().whereEqualTo(prop, value);
    }
    whereGreaterThan(prop, value) {
        return this.repo().whereGreaterThan(prop, value);
    }
    whereLessThan(prop, value) {
        return this.repo().whereLessThan(prop, value);
    }
    whereLessOrEqualThan(prop, value) {
        return this.repo().whereLessOrEqualThan(prop, value);
    }
    whereArrayContains(prop, value) {
        return this.repo().whereArrayContains(prop, value);
    }
}
exports.default = default_1;
//# sourceMappingURL=Model.js.map