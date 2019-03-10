"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExpectToThrowCustomClass_1 = require("../../../helpers/ExpectToThrowCustomClass");
const chai_1 = require("chai");
const src_1 = require("../../../../src");
describe("isString", () => {
    it("should return the input string if input is string", () => {
        chai_1.expect(src_1.isUndefined(undefined)).to.equal(undefined);
    });
    it("should return a validation error if input is not a string", () => {
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isUndefined({}), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isUndefined(1), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isUndefined(0), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isUndefined(true), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isUndefined(false), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isUndefined(null), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isUndefined("Test"), src_1.ValidationError);
    });
});
//# sourceMappingURL=isUndefined.spec.js.map