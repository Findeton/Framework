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
const chai_1 = require("chai");
const inversify_1 = require("inversify");
const sinon_1 = require("sinon");
const src_1 = require("../../../src");
class TestLogger extends src_1.Logger {
    log() { }
}
class TestProcessLogger extends src_1.Logger {
    log() { }
    startup() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve();
        });
    }
    shutdown() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve();
        });
    }
    isHealthy() {
        return true;
    }
}
describe("AggregateLogger", () => {
    let fakeLogger;
    let fakeProcessLogger1;
    let fakeProcessLogger2;
    let aggregateLogger;
    beforeEach(() => {
        fakeLogger = new TestLogger();
        fakeProcessLogger1 = new TestProcessLogger();
        fakeProcessLogger2 = new TestProcessLogger();
        aggregateLogger = new src_1.AggregateLogger([
            fakeLogger,
            fakeProcessLogger1,
            fakeProcessLogger2,
        ]);
    });
    describe("isHealthy", () => {
        it("should return true if all loggers are healthy", () => {
            sinon_1.stub(fakeProcessLogger1, "isHealthy").returns(true);
            sinon_1.stub(fakeProcessLogger2, "isHealthy").returns(true);
            chai_1.expect(aggregateLogger.isHealthy()).to.equal(true);
        });
        it("should return false if any loggers are un-healthy", () => {
            sinon_1.stub(fakeProcessLogger1, "isHealthy").returns(true);
            sinon_1.stub(fakeProcessLogger2, "isHealthy").returns(false);
            chai_1.expect(aggregateLogger.isHealthy()).to.equal(false);
        });
    });
    describe("startup", () => {
        it("should call startup on each logger", () => __awaiter(this, void 0, void 0, function* () {
            let processLogger1Stub = sinon_1.stub(fakeProcessLogger1, "startup").returns(Promise.resolve());
            let processLogger2Stub = sinon_1.stub(fakeProcessLogger2, "startup").returns(Promise.resolve());
            yield aggregateLogger.startup(new inversify_1.Container());
            chai_1.expect(processLogger1Stub.called).to.equal(true);
            chai_1.expect(processLogger2Stub.called).to.equal(true);
        }));
    });
    describe("shutdown", () => {
        it("should call shutdown on each logger", () => __awaiter(this, void 0, void 0, function* () {
            let processLogger1Stub = sinon_1.stub(fakeProcessLogger1, "shutdown").returns(Promise.resolve());
            let processLogger2Stub = sinon_1.stub(fakeProcessLogger2, "shutdown").returns(Promise.resolve());
            let container = new inversify_1.Container();
            yield aggregateLogger.startup(container);
            yield aggregateLogger.shutdown(container);
            chai_1.expect(processLogger1Stub.called).to.equal(true);
            chai_1.expect(processLogger2Stub.called).to.equal(true);
        }));
    });
    describe("log", () => {
        it("should call log on each logger", () => __awaiter(this, void 0, void 0, function* () {
            let loggerStub = sinon_1.stub(fakeLogger, "log");
            let processLogger1Stub = sinon_1.stub(fakeProcessLogger1, "log");
            let processLogger2Stub = sinon_1.stub(fakeProcessLogger2, "log");
            let message = "hello world";
            let level = src_1.LogLevel.DEBUG;
            let metadata = { foo: true };
            aggregateLogger.log(message, level, metadata);
            chai_1.expect(loggerStub.calledWith(message, level, metadata)).to.equal(true);
            chai_1.expect(processLogger1Stub.calledWith(message, level, metadata)).to.equal(true);
            chai_1.expect(processLogger2Stub.calledWith(message, level, metadata)).to.equal(true);
        }));
    });
});
//# sourceMappingURL=AggregateLogger.spec.js.map