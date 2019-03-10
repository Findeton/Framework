"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExpectToThrowCustomClass_1 = require("../../../helpers/ExpectToThrowCustomClass");
const chai_1 = require("chai");
const src_1 = require("../../../../src");
describe("isString", () => {
    it("should return the input string if input is string", () => {
        chai_1.expect(src_1.isString("abc")).to.equal("abc");
        chai_1.expect(src_1.isString("")).to.equal("");
        chai_1.expect(src_1.isString("undefined")).to.equal("undefined");
    });
    it("should return a validation error if input is not a string", () => {
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isString({}), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isString(1), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isString(0), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isString(true), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isString(false), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isString(null), src_1.ValidationError);
    });
});
//# sourceMappingURL=isString.spec.js.map