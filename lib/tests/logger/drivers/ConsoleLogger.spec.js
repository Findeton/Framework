"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon_1 = require("sinon");
const src_1 = require("../../../src");
describe("ConsoleLogger", () => {
    let fakeLogger;
    let logStub;
    let infoStub;
    let warnStub;
    let errorStub;
    beforeEach(() => {
        fakeLogger = {
            log: () => { },
            info: () => { },
            warn: () => { },
            error: () => { },
        };
        logStub = sinon_1.stub(fakeLogger, "log");
        infoStub = sinon_1.stub(fakeLogger, "info");
        warnStub = sinon_1.stub(fakeLogger, "warn");
        errorStub = sinon_1.stub(fakeLogger, "error");
    });
    describe("Basic logging functionality", () => {
        let logger;
        beforeEach(() => {
            logger = new src_1.ConsoleLogger(src_1.LogLevel.DEBUG, fakeLogger);
        });
        it("should log a debug message to console.log", () => {
            const testArgs = { hello: "world" };
            const testMessage = "test message";
            logger.debug(testMessage, testArgs);
            chai_1.expect(logStub.called).to.equal(true);
            chai_1.expect(logStub.args[0]).to.deep.equal([testMessage, testArgs]);
        });
        it("should log a info message to console.info", () => {
            const testArgs = { hello: "world" };
            const testMessage = "test message";
            logger.info(testMessage, testArgs);
            chai_1.expect(infoStub.called).to.equal(true);
            chai_1.expect(infoStub.args[0]).to.deep.equal([testMessage, testArgs]);
        });
        it("should log a warn message to console.warn", () => {
            const testArgs = { hello: "world" };
            const testMessage = "test message";
            logger.warn(testMessage, testArgs);
            chai_1.expect(warnStub.called).to.equal(true);
            chai_1.expect(warnStub.args[0]).to.deep.equal([testMessage, testArgs]);
        });
        it("should log a error message to console.error", () => {
            const testArgs = { hello: "world" };
            const testMessage = "test message";
            logger.error(testMessage, testArgs);
            chai_1.expect(errorStub.called).to.equal(true);
            chai_1.expect(errorStub.args[0]).to.deep.equal([testMessage, testArgs]);
        });
        it("should log a fatal message to console.error", () => {
            const testArgs = { hello: "world" };
            const testMessage = "test message";
            logger.fatal(testMessage, testArgs);
            chai_1.expect(errorStub.called).to.equal(true);
            chai_1.expect(errorStub.args[0]).to.deep.equal([testMessage, testArgs]);
        });
    });
    describe("Level precedence checks", () => {
        it("should not log a message of lower precedence", () => {
            const logger = new src_1.ConsoleLogger(src_1.LogLevel.FATAL, fakeLogger);
            logger.debug("blah", {});
            chai_1.expect(logStub.called).to.equal(false);
            logger.info("blah", {});
            chai_1.expect(infoStub.called).to.equal(false);
            logger.warn("blah", {});
            chai_1.expect(warnStub.called).to.equal(false);
            logger.error("blah", {});
            chai_1.expect(errorStub.called).to.equal(false);
        });
        it("should log a message of equal precedence", () => {
            const logger = new src_1.ConsoleLogger(src_1.LogLevel.WARN, fakeLogger);
            logger.warn("blah", {});
            chai_1.expect(warnStub.called).to.equal(true);
        });
        it("should log a message of higher precedence", () => {
            const logger = new src_1.ConsoleLogger(src_1.LogLevel.WARN, fakeLogger);
            logger.error("blah", {});
            chai_1.expect(errorStub.called).to.equal(true);
            logger.fatal("blah", {});
            chai_1.expect(errorStub.called).to.equal(true);
        });
    });
});
//# sourceMappingURL=ConsoleLogger.spec.js.map