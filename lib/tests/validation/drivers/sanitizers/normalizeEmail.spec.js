"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExpectToThrowCustomClass_1 = require("../../../helpers/ExpectToThrowCustomClass");
const chai_1 = require("chai");
const src_1 = require("../../../../src");
describe("normalizeEmail", () => {
    it("should return the input email address if it is valid", () => {
        chai_1.expect(src_1.normalizeEmail({})("jamie@iscool.com")).to.equal("jamie@iscool.com");
        chai_1.expect(src_1.normalizeEmail({})("jamie+123@iscool.com")).to.equal("jamie+123@iscool.com");
    });
    it("should return a validation error if input is not a valid email", () => {
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.normalizeEmail({})("abc.com"), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.normalizeEmail({})("@abc.com"), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.normalizeEmail({})("jamie@abc"), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.normalizeEmail({})({}), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.normalizeEmail({})(1), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.normalizeEmail({})(0), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.normalizeEmail({})(true), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.normalizeEmail({})(false), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.normalizeEmail({})(null), src_1.ValidationError);
    });
});
//# sourceMappingURL=normalizeEmail.spec.js.map