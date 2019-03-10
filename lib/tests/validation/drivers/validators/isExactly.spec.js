"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExpectToThrowCustomClass_1 = require("../../../helpers/ExpectToThrowCustomClass");
const chai_1 = require("chai");
const isExactly_1 = require("../../../../src/validation/drivers/validators/isExactly");
const src_1 = require("../../../../src");
describe("isExactly", () => {
    it("should return the input if the input is included in the allowed set", () => {
        let testValidator = isExactly_1.isExactly(["test", "other-test", "more-test"]);
        chai_1.expect(testValidator("other-test")).to.equal("other-test");
        chai_1.expect(testValidator("test")).to.equal("test");
        chai_1.expect(testValidator("more-test")).to.equal("more-test");
    });
    it("should return a validation error if input is not in the allowed set", () => {
        let testValidator = isExactly_1.isExactly(["test", "other-test", "more-test"]);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => testValidator({}), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => testValidator(1), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => testValidator(0), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => testValidator("das"), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => testValidator("true"), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => testValidator(false), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => testValidator([]), src_1.ValidationError);
    });
});
//# sourceMappingURL=isExactly.spec.js.map