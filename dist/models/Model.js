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
    find(id) {
        return this.getRepo().findById(id);
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
}
exports.default = default_1;
//# sourceMappingURL=Model.js.map