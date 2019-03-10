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
const MySQLTransaction_1 = require("./MySQLTransaction");
const logging_1 = require("../../../logging");
const mysql_1 = require("mysql");
const util_1 = require("util");
class MySQLStore {
    constructor(connectionOptions) {
        this.connectionOptions = connectionOptions;
        this.healthyState = false;
    }
    isHealthy() {
        return this.healthyState;
    }
    query(queryString, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connection) {
                try {
                    let queryResult = yield util_1.promisify(this.connection.query)(queryString, parameters);
                    return queryResult.results;
                }
                catch (e) {
                    if (e.fatal) {
                        if (this.logger) {
                            this.logger.error("MySQL Store encountered a fatal error", e);
                        }
                        this.healthyState = false;
                    }
                    throw e;
                }
            }
            else {
                throw new Error("The MySQLStore is not currently open and cannot be used. Check that the store has had .startup() called and that the Promise has successfully returned.");
            }
        });
    }
    createTransaction() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connection === undefined) {
                throw new Error("MySQL cannot open a transaction on a closed Pool. This usually happens from forgetting to call startup.");
            }
            let connection = yield util_1.promisify(this.connection.getConnection.bind(this.connection))();
            yield util_1.promisify(connection.beginTransaction.bind(this.connection))();
            return new MySQLTransaction_1.MySQLTransaction(this, connection, this.logger);
        });
    }
    startup(container) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connection === undefined) {
                if (container.isBound(logging_1.Logger)) {
                    this.logger = container.get(logging_1.Logger);
                }
                this.connection = mysql_1.createPool(this.connectionOptions);
                this.healthyState = true;
                container.bind(MySQLStore).toConstantValue(this);
            }
            else {
                throw new Error("A MySQL Pool already exists and cannot be reinstated without first being closed. This usually happens from calling startup on an existing Runtime.");
            }
        });
    }
    shutdown(container) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connection) {
                container.unbind(MySQLStore);
                yield util_1.promisify(this.connection.end.bind(this.connection))();
                this.connection = undefined;
                this.healthyState = false;
            }
        });
    }
}
exports.MySQLStore = MySQLStore;
//# sourceMappingURL=MySQLStore.js.map