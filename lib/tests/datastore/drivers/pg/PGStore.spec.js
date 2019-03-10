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
const PGQueryPostProcessor_1 = require("../../../../src/query/drivers/pg/PGQueryPostProcessor");
const PGStore_1 = require("../../../../src/datastore/drivers/pg/PGStore");
const chai_1 = require("chai");
const inversify_1 = require("inversify");
describe("PGStore", () => {
    const testStore = new PGStore_1.PGStore({
        host: process.env.PG_HOST,
        port: process.env.PG_PORT ? Number(process.env.PG_PORT) : undefined,
        database: process.env.PG_DATABASE,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
    });
    const container = new inversify_1.Container();
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        yield testStore.startup(container);
    }));
    afterEach(() => __awaiter(this, void 0, void 0, function* () {
        yield testStore.shutdown(container);
    }));
    describe("startup", () => {
        it("should register the PG Driver implementation with the container", () => {
            let store = container.get(PGStore_1.PGStore);
            chai_1.expect(store).to.equal(testStore);
        });
    });
    describe("shutdown", () => {
        it("should unregister the PG Driver implementation with the container", () => __awaiter(this, void 0, void 0, function* () {
            yield testStore.shutdown(container);
            chai_1.expect(container.isBound(PGStore_1.PGStore)).to.equal(false);
        }));
    });
    describe("query", () => {
        it("should submit queries to the PG database and return their results as an array of rows", () => __awaiter(this, void 0, void 0, function* () {
            let testQueryResults = yield testStore.query("SELECT 15 AS test", []);
            chai_1.expect(testQueryResults).to.deep.equal([{ test: 15 }]);
        }));
    });
    describe("Transaction Builder", () => {
        beforeEach(() => __awaiter(this, void 0, void 0, function* () {
            yield testStore.query(`CREATE TABLE trxIntegrationTest (
                id SERIAL,
                testcolumn VARCHAR
            )`, []);
        }));
        afterEach(() => __awaiter(this, void 0, void 0, function* () {
            yield testStore.query(`DROP TABLE trxIntegrationTest`, []);
        }));
        it("should create a SQL transaction", () => __awaiter(this, void 0, void 0, function* () {
            let trx = yield testStore.createTransaction();
            let [finalQuery, finalParameters] = PGQueryPostProcessor_1.pgQueryPostProcessor("INSERT INTO trxIntegrationTest (??) VALUES (?)", ["testcolumn", "Hello Integration Test!"]);
            yield trx.query(finalQuery, finalParameters);
            let preCommitResults = yield testStore.query("SELECT * FROM trxIntegrationTest", []);
            chai_1.expect(preCommitResults).to.deep.equal([]);
            yield trx.commit();
            let postCommitResults = yield testStore.query("SELECT * FROM trxIntegrationTest", []);
            chai_1.expect(postCommitResults.length).to.equal(1);
            chai_1.expect(postCommitResults[0].testcolumn).to.equal("Hello Integration Test!");
        }));
    });
});
//# sourceMappingURL=PGStore.spec.js.map