"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExpectToThrowCustomClass_1 = require("../../../helpers/ExpectToThrowCustomClass");
const chai_1 = require("chai");
const src_1 = require("../../../../src");
describe("isBoolean", () => {
    it("should return the input boolean if input is boolean", () => {
        chai_1.expect(src_1.isBoolean(true)).to.equal(true);
        chai_1.expect(src_1.isBoolean(false)).to.equal(false);
    });
    it("should return a validation error if input is not boolean", () => {
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isBoolean({}), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isBoolean(1), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isBoolean(0), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isBoolean("das"), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isBoolean("true"), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isBoolean("false"), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isBoolean([]), src_1.ValidationError);
    });
});
//# sourceMappingURL=isBoolean.spec.js.map