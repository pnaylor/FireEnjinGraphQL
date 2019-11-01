"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const fireorm_1 = require("fireorm");
const type_graphql_1 = require("type-graphql");
const pluralize = require("pluralize");
/**
 * Add capitalization on the first letter of a string
 * @param str The string being capped
 */
function capFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
/**
 * Remove capitalization of the first letter of a string
 * @param str The string being uncapped
 */
function uncapFirstLetter(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
}
/**
 * Create basic CRUD functionality with resolvers
 * @param suffix The name of the model
 * @param returnType The model types
 * @param model The actual model class
 * @param inputType The input types
 */
function createResolver(modelName, collectionName, returnType, model, inputType) {
    var _a, _b, _c, _d, _e, _f, _g;
    if (inputType) {
        let CrudResolver = class CrudResolver {
            async [_a = `${uncapFirstLetter(modelName)}`](id) {
                return await model.find(id);
            }
            async [_b = `${uncapFirstLetter(collectionName)}`]() {
                return (await model
                    .ref()
                    .limit(15)
                    .get()).docs.map((doc) => (Object.assign(Object.assign({}, doc.data()), { id: doc.id })));
            }
            async [_c = `add${modelName}`](data) {
                return await model.create(data);
            }
            async [_d = `delete${modelName}`](id) {
                const modelBefore = await model.find(id);
                await model.delete(id);
                return modelBefore;
            }
            async [_e = `edit${modelName}`](id, data) {
                return await model.update(Object.assign({ id }, data));
            }
        };
        __decorate([
            type_graphql_1.Query(returns => returnType, {
                nullable: true,
                description: `Get a specific ${modelName} document from the ${collectionName} collection.`
            }),
            __param(0, type_graphql_1.Arg("id")),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [String]),
            __metadata("design:returntype", Promise)
        ], CrudResolver.prototype, _a, null);
        __decorate([
            type_graphql_1.Query(returns => [returnType], {
                nullable: true,
                description: `Get a list of ${modelName} documents from the ${collectionName} collection.`
            }),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", Promise)
        ], CrudResolver.prototype, _b, null);
        __decorate([
            type_graphql_1.Mutation(returns => returnType),
            __param(0, type_graphql_1.Arg("data", () => inputType, {
                description: `Add a new ${modelName} document to the ${collectionName} collection.`
            })),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", Promise)
        ], CrudResolver.prototype, _c, null);
        __decorate([
            type_graphql_1.Mutation(returns => returnType),
            __param(0, type_graphql_1.Arg("id", () => String, {
                description: `The ID of the ${modelName} document being deleted in the ${collectionName} collection`
            })),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [String]),
            __metadata("design:returntype", Promise)
        ], CrudResolver.prototype, _d, null);
        __decorate([
            type_graphql_1.Mutation(returns => returnType),
            __param(0, type_graphql_1.Arg("id", () => String, {
                description: `The ID of the ${modelName} document in the ${collectionName} collection`
            })),
            __param(1, type_graphql_1.Arg("data", () => inputType, {
                description: `Update a ${modelName} document in the ${collectionName} collection.`
            })),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [String, Object]),
            __metadata("design:returntype", Promise)
        ], CrudResolver.prototype, _e, null);
        CrudResolver = __decorate([
            type_graphql_1.Resolver(of => returnType)
        ], CrudResolver);
        return CrudResolver;
    }
    else {
        let BaseResolver = class BaseResolver {
            async [_f = `${uncapFirstLetter(modelName)}`](id) {
                return await model.find(id);
            }
            async [_g = `${uncapFirstLetter(collectionName)}`]() {
                return (await model
                    .ref()
                    .limit(15)
                    .get()).docs.map((doc) => (Object.assign(Object.assign({}, doc.data()), { id: doc.id })));
            }
        };
        __decorate([
            type_graphql_1.Query(returns => returnType, {
                nullable: true,
                description: `Get a specific ${modelName} document from the ${collectionName} collection.`
            }),
            __param(0, type_graphql_1.Arg("id")),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [String]),
            __metadata("design:returntype", Promise)
        ], BaseResolver.prototype, _f, null);
        __decorate([
            type_graphql_1.Query(returns => [returnType], {
                nullable: true,
                description: `Get a list of ${modelName} documents from the ${collectionName} collection.`
            }),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", Promise)
        ], BaseResolver.prototype, _g, null);
        BaseResolver = __decorate([
            type_graphql_1.Resolver(of => returnType)
        ], BaseResolver);
        return BaseResolver;
    }
}
class default_1 {
    constructor(options) {
        this.options = options;
        if (options) {
            this.collectionName = options.collectionName
                ? options.collectionName
                : pluralize(options.docSchema.name);
        }
        if (options && options.docSchema) {
            this.Resolver = createResolver(capFirstLetter(options.docSchema.name), this.collectionName, options.docSchema, this, options.inputType);
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
    execute(queries, limitVal, orderByObj) {
        return this.repo().execute(queries, limitVal, orderByObj);
    }
    /**
     * Get a specific document's data
     * @param id The id of the document
     */
    async find(id) {
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
    ref() {
        return this.repo().firestoreColRef;
    }
    /**
     * Get the FireORM repo reference for the collection
     * @see https://fireorm.js.org/#/classes/basefirestorerepository
     */
    repo() {
        return fireorm_1.GetRepository(this.options.docSchema);
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
    limit(limitTo) {
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
    update(data) {
        return this.repo().update(data);
    }
    /**
     * Get a list of documents where property equals value
     * @param prop The property to check eqaulity of
     * @param value The value to be equal to
     */
    whereEqualTo(prop, value) {
        return this.repo().whereEqualTo(prop, value);
    }
    /**
     * Get a list of documents where property greater than value
     * @param prop The property to check eqaulity of
     * @param value The value to be greater than to
     */
    whereGreaterThan(prop, value) {
        return this.repo().whereGreaterThan(prop, value);
    }
    /**
     * Get a list of documents where property less than value
     * @param prop The property to check eqaulity of
     * @param value The value to be less than to
     */
    whereLessThan(prop, value) {
        return this.repo().whereLessThan(prop, value);
    }
    /**
     * Get a list of documents where property less than or equal to value
     * @param prop The property to check eqaulity of
     * @param value The value to be less than or equal to
     */
    whereLessOrEqualThan(prop, value) {
        return this.repo().whereLessOrEqualThan(prop, value);
    }
    /**
     * Get a list of documents where property is equal to one of a list of values
     * @param prop The property to search for values
     * @param value The values to check for
     */
    whereArrayContains(prop, value) {
        return this.repo().whereArrayContains(prop, value);
    }
}
exports.default = default_1;
//# sourceMappingURL=Model.js.map