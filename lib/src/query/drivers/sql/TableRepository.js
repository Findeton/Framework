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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const PGQueryPostProcessor_1 = require("../pg/PGQueryPostProcessor");
const Repository_1 = require("../../abstract/Repository");
const datastore_1 = require("../../../datastore");
const inversify_1 = require("inversify");
const lodash_1 = require("lodash");
const __1 = require("../..");
let TableRepository = class TableRepository extends Repository_1.Repository {
    constructor(store, tableName, queryFields, primaryKeyField) {
        super();
        this.store = store;
        this.tableName = tableName;
        this.queryFields = queryFields;
        this.primaryKeyField = primaryKeyField;
        this.postProcessor = (q, p) => [q, p];
        if (store instanceof datastore_1.PGStore) {
            this.postProcessor = PGQueryPostProcessor_1.pgQueryPostProcessor;
            this.tableName = `"${this.tableName}"`;
        }
    }
    create(payload, connection = this.store) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = yield this.generateID();
            payload[this.primaryKeyField] = payload[this.primaryKeyField] || id;
            let filteredPayload = lodash_1.omitBy(payload, lodash_1.isUndefined);
            if (connection instanceof datastore_1.MySQLStore ||
                connection instanceof datastore_1.MySQLTransaction) {
                let insertQuery = `
                INSERT INTO
                    ??
                SET
                    ?
            `;
                let result = yield connection.query(insertQuery, [
                    this.tableName,
                    filteredPayload,
                ]);
                return result.insertId || id;
            }
            else {
                let query = `
                INSERT INTO
                    ?? (${Object.keys(filteredPayload).map(() => "??")})
                VALUES
                    (${Object.keys(filteredPayload).map(() => "?")})
                RETURNING ??
            `;
                let parameters = [this.tableName];
                Object.keys(filteredPayload).forEach((k) => {
                    parameters.push(k);
                });
                Object.keys(filteredPayload).forEach((k) => {
                    parameters.push(filteredPayload[k]);
                });
                parameters.push(this.primaryKeyField);
                let [processedQuery, processedParameters] = this.postProcessor(query, parameters);
                let results = yield connection.query(processedQuery, processedParameters);
                return results[0][this.primaryKeyField] || id;
            }
        });
    }
    read(filter, pagination = {}, connection = this.store) {
        return __awaiter(this, void 0, void 0, function* () {
            let [filterQuery, filterParameters] = __1.compileSQLFilter(filter);
            let parameters = [this.tableName, ...filterParameters];
            let lookupQuery = `	
            SELECT
                ${this.queryFields.join(", ")}	
            FROM
                ??
            ${filterQuery !== "" ? "WHERE" : ""}	
                ${filterQuery}	
        `;
            if (pagination.order) {
                lookupQuery = `${lookupQuery}	
            ORDER BY ?? ${pagination.order[1]}`;
                parameters.push(pagination.order[0]);
            }
            if (pagination.limit) {
                lookupQuery = `${lookupQuery}	
            LIMIT ${pagination.limit}`;
            }
            if (pagination.offset) {
                lookupQuery = `${lookupQuery}	
            OFFSET ${pagination.offset}`;
            }
            let [processedQuery, processedParameters] = this.postProcessor(lookupQuery, parameters);
            let results = yield connection.query(processedQuery, processedParameters);
            return results;
        });
    }
    update(payload, filter, connection = this.store) {
        return __awaiter(this, void 0, void 0, function* () {
            let filteredPayload = lodash_1.omitBy(payload, lodash_1.isUndefined);
            let [filterQuery, filterParameters] = __1.compileSQLFilter(filter);
            let lookupQuery = `	
            UPDATE
                ??
            SET
                ${Object.keys(filteredPayload).map(() => "?? = ?")}
            ${filterQuery !== "" ? "WHERE" : ""}	
                ${filterQuery}
        `;
            let payloadParameters = [];
            Object.keys(filteredPayload).forEach((k) => {
                payloadParameters.push(k);
                payloadParameters.push(filteredPayload[k]);
            });
            let [processedQuery, processedParameters] = this.postProcessor(lookupQuery, [this.tableName, ...payloadParameters, ...filterParameters]);
            yield connection.query(processedQuery, processedParameters);
        });
    }
    delete(filter, connection = this.store) {
        return __awaiter(this, void 0, void 0, function* () {
            let [filterQuery, filterParameters] = __1.compileSQLFilter(filter);
            let parameters = [this.tableName, ...filterParameters];
            let lookupQuery = `	
            DELETE FROM	
                ??
            ${filterQuery !== "" ? "WHERE" : ""}	
                ${filterQuery}	
        `;
            let [processedQuery, processedParameters] = this.postProcessor(lookupQuery, parameters);
            yield connection.query(processedQuery, processedParameters);
        });
    }
    generateID() {
        return __awaiter(this, void 0, void 0, function* () {
            return undefined;
        });
    }
};
TableRepository = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [Object, String, Array, Object])
], TableRepository);
exports.TableRepository = TableRepository;
//# sourceMappingURL=TableRepository.js.map