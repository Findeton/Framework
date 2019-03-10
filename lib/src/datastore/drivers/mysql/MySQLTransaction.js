"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const uuid_1 = require("uuid");
class MySQLTransaction {
    constructor(store, connection, logger) {
        this.store = store;
        this.connection = connection;
        this.logger = logger;
        this.transactionId = uuid_1.v4();
        if (this.logger) {
            this.logger.debug("Transaction Opened", {
                transactionId: this.transactionId,
            });
        }
    }
    query(queryString, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let queryResult = yield util_1.promisify(this.connection.query.bind(this.connection))(queryString, parameters);
                return queryResult.results;
            }
            catch (e) {
                if (e.fatal) {
                    if (this.logger) {
                        this.logger.error("MySQL Transaction encountered a fatal error", e);
                    }
                    this.store.healthyState = false;
                }
                throw e;
            }
        });
    }
    commit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield util_1.promisify(this.connection.commit.bind(this.connection))();
            yield this.finalizeTransaction();
        });
    }
    rollback() {
        return __awaiter(this, void 0, void 0, function* () {
            yield util_1.promisify(this.connection.rollback.bind(this.connection))();
            yield this.finalizeTransaction();
        });
    }
    finalizeTransaction() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.logger) {
                this.logger.debug(`Transaction Closed`, {
                    transactionId: this.transactionId,
                });
            }
            yield util_1.promisify(this.connection.release.bind(this.connection))();
        });
    }
}
exports.MySQLTransaction = MySQLTransaction;
//# sourceMappingURL=MySQLTransaction.js.map