"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExpectToThrowCustomClass_1 = require("../../../helpers/ExpectToThrowCustomClass");
const chai_1 = require("chai");
const src_1 = require("../../../../src");
describe("isISODate", () => {
    it("should return the a Date object if input is valid ISO code", () => {
        chai_1.expect(src_1.isISODate("2018-10-07").getTime()).to.equal(1538870400000);
        chai_1.expect(src_1.isISODate("2016-01-12").getTime()).to.equal(1452556800000);
        chai_1.expect(src_1.isISODate("2018-10-07T19:21:40+00:00").getTime()).to.equal(1538940100000);
    });
    it("should return a validation error if input is not boolean", () => {
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isISODate("12-01-2016"), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isISODate("12/01/2016"), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isISODate("2016/01/12"), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isISODate("USA"), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isISODate({}), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isISODate(1), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isISODate(0), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isISODate("das"), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isISODate("true"), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isISODate("false"), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isISODate([]), src_1.ValidationError);
    });
});
//# sourceMappingURL=isISODate.spec.js.map