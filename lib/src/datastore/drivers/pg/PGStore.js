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
const PGIsolationLevel_1 = require("../../abstract/PGIsolationLevel");
const PGTransaction_1 = require("./PGTransaction");
const logging_1 = require("../../../logging");
const pg_1 = require("pg");
class PGStore {
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
                let queryResult = yield this.connection.query(queryString, parameters);
                return queryResult.rows;
            }
            else {
                throw new Error("The PGStore is not currently open and cannot be used. Check that the store has had .startup() called and that the Promise has successfully returned.");
            }
        });
    }
    createTransaction(isolationLevel) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connection === undefined) {
                throw new Error("PGStore cannot open a transaction on a closed Pool. This usually happens from forgetting to call startup.");
            }
            let connection = yield this.connection.connect();
            let query;
            switch (isolationLevel) {
                case PGIsolationLevel_1.PGIsolationLevel.SERIALIZABLE:
                    query = "BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE";
                    break;
                case PGIsolationLevel_1.PGIsolationLevel.REPEATABLE_READ:
                    query = "BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ";
                    break;
                case PGIsolationLevel_1.PGIsolationLevel.READ_COMMITED:
                    query = "BEGIN TRANSACTION ISOLATION LEVEL READ COMMITTED";
                    break;
                case PGIsolationLevel_1.PGIsolationLevel.READ_UNCOMMITTED:
                    query = "BEGIN TRANSACTION ISOLATION LEVEL READ UNCOMMITTED";
                    break;
                default:
                    query = "BEGIN";
                    break;
            }
            yield connection.query(query);
            return new PGTransaction_1.PGTransaction(connection, this.logger);
        });
    }
    startup(container) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connection === undefined) {
                this.connection = new pg_1.Pool(this.connectionOptions);
                this.healthyState = true;
                this.connection.on("error", (err) => {
                    if (container.isBound(logging_1.Logger)) {
                        this.logger = container.get(logging_1.Logger);
                        this.logger.error("PGStore encountered an error", err);
                    }
                    this.healthyState = false;
                });
                container.bind(PGStore).toConstantValue(this);
            }
            else {
                throw new Error("A PG Pool already exists and cannot be reinstated without first being closed. This usually happens from calling startup on an existing Runtime.");
            }
        });
    }
    shutdown(container) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connection) {
                container.unbind(PGStore);
                yield this.connection.end();
                this.connection = undefined;
                this.healthyState = false;
            }
        });
    }
}
exports.PGStore = PGStore;
//# sourceMappingURL=PGStore.js.map