"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const src_1 = require("../../../src");
describe("ValidationError", () => {
    it("should create a ValidationError", () => {
        let constraintName = "THING";
        let systemMessage = "a specific message";
        let userMessage = "a nice message.";
        let error = new src_1.ValidationError(constraintName, systemMessage, userMessage);
        chai_1.expect(error).to.be.instanceof(src_1.ValidationError);
        chai_1.expect(error.constraintName).to.equal(constraintName);
        chai_1.expect(error.internalMessage).to.equal(systemMessage);
        chai_1.expect(error.externalMessage).to.equal(userMessage);
        chai_1.expect(error.message).to.equal(systemMessage);
    });
    it("should default the friendly message to the system message", () => {
        let systemMessage = "a specific message";
        let error = new src_1.ValidationError("THING", systemMessage);
        chai_1.expect(error.externalMessage).to.equal(systemMessage);
    });
});
//# sourceMappingURL=ValidationError.spec.js.map