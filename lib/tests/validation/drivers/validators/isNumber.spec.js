"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExpectToThrowCustomClass_1 = require("../../../helpers/ExpectToThrowCustomClass");
const chai_1 = require("chai");
const src_1 = require("../../../../src");
describe("isNumber", () => {
    it("should return the input number if input is number", () => {
        chai_1.expect(src_1.isNumber(0)).to.equal(0);
        chai_1.expect(src_1.isNumber(1)).to.equal(1);
        chai_1.expect(src_1.isNumber(-999)).to.equal(-999);
        chai_1.expect(src_1.isNumber(123456789)).to.equal(123456789);
    });
    it("should parse a string containing a number into a number", () => {
        chai_1.expect(src_1.isNumber("1")).to.equal(1);
        chai_1.expect(src_1.isNumber("0")).to.equal(0);
        chai_1.expect(src_1.isNumber("0.001")).to.equal(0.001);
        chai_1.expect(src_1.isNumber("-12423435.1")).to.equal(-12423435.1);
        chai_1.expect(src_1.isNumber("+100")).to.equal(100);
    });
    it("should return a validation error if input is not a number", () => {
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isNumber({}), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isNumber("das"), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isNumber("true"), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isNumber("false"), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isNumber([]), src_1.ValidationError);
    });
});
//# sourceMappingURL=isNumber.spec.js.map