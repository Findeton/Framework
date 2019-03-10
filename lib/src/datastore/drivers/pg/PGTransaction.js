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
const uuid_1 = require("uuid");
class PGTransaction {
    constructor(connection, logger) {
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
            let queryResult = yield this.connection.query(queryString, parameters);
            return queryResult.rows;
        });
    }
    commit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.query("COMMIT");
            yield this.finalizeTransaction();
        });
    }
    rollback() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.query("ROLLBACK");
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
            this.connection.release();
        });
    }
}
exports.PGTransaction = PGTransaction;
//# sourceMappingURL=PGTransaction.js.map