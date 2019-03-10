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
const runtime_1 = require("../../../src/runtime");
const sinon_1 = require("sinon");
class TestProcess {
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
describe("Runtime", () => {
    let testProcess1 = new TestProcess();
    let testProcess2 = new TestProcess();
    beforeEach(() => {
        testProcess1 = new TestProcess();
        testProcess2 = new TestProcess();
    });
    describe("startup", () => {
        it("Should call startup on each of the provided processes", () => __awaiter(this, void 0, void 0, function* () {
            let spy1 = sinon_1.stub(testProcess1, "startup");
            let spy2 = sinon_1.stub(testProcess2, "startup");
            let runtime = new runtime_1.Runtime([testProcess1, testProcess2]);
            yield runtime.startup();
            chai_1.expect(spy1.called).to.equal(true);
            chai_1.expect(spy2.called).to.equal(true);
        }));
    });
    describe("shutdown", () => {
        it("Should call shutdown on each of the provided processes", () => __awaiter(this, void 0, void 0, function* () {
            let spy1 = sinon_1.stub(testProcess1, "shutdown");
            let spy2 = sinon_1.stub(testProcess2, "shutdown");
            let runtime = new runtime_1.Runtime([testProcess1, testProcess2]);
            yield runtime.shutdown();
            chai_1.expect(spy1.called).to.equal(true);
            chai_1.expect(spy2.called).to.equal(true);
        }));
    });
    describe("isHealthy", () => {
        it("should return true if all loggers are healthy", () => {
            sinon_1.stub(testProcess1, "isHealthy").returns(true);
            sinon_1.stub(testProcess2, "isHealthy").returns(true);
            let runtime = new runtime_1.Runtime([testProcess1, testProcess2]);
            chai_1.expect(runtime.isHealthy()).to.equal(true);
        });
        it("should return false if any loggers are un-healthy", () => {
            sinon_1.stub(testProcess1, "isHealthy").returns(true);
            sinon_1.stub(testProcess2, "isHealthy").returns(false);
            let runtime = new runtime_1.Runtime([testProcess1, testProcess2]);
            chai_1.expect(runtime.isHealthy()).to.equal(false);
        });
    });
});
//# sourceMappingURL=Runtime.spec.js.map