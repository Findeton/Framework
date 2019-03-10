"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExpectToThrowCustomClass_1 = require("../../../helpers/ExpectToThrowCustomClass");
const chai_1 = require("chai");
const src_1 = require("../../../../src");
describe("isNull", () => {
    it("should return null if the input is null", () => {
        chai_1.expect(src_1.isNull(null)).to.equal(null);
    });
    it("should return a validation error if input is not null", () => {
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isNull({}), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isNull("1"), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isNull("0"), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isNull("das"), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isNull("true"), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isNull("false"), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isNull([]), src_1.ValidationError);
    });
});
//# sourceMappingURL=isNull.spec.js.map