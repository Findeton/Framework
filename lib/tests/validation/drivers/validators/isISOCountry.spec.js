"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExpectToThrowCustomClass_1 = require("../../../helpers/ExpectToThrowCustomClass");
const chai_1 = require("chai");
const src_1 = require("../../../../src");
describe("isISOAlpha2CountryCode", () => {
    it("should return the input ISO code if input is valid ISO code", () => {
        chai_1.expect(src_1.isISOAlpha2CountryCode("GB")).to.equal("GB");
        chai_1.expect(src_1.isISOAlpha2CountryCode("US")).to.equal("US");
        chai_1.expect(src_1.isISOAlpha2CountryCode("CN")).to.equal("CN");
    });
    it("should return a validation error if input is not boolean", () => {
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isISOAlpha2CountryCode("UQ"), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isISOAlpha2CountryCode("USA"), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isISOAlpha2CountryCode({}), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isISOAlpha2CountryCode(1), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isISOAlpha2CountryCode(0), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isISOAlpha2CountryCode("das"), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isISOAlpha2CountryCode("true"), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isISOAlpha2CountryCode("false"), src_1.ValidationError);
        ExpectToThrowCustomClass_1.expectToThrowCustomClass(() => src_1.isISOAlpha2CountryCode([]), src_1.ValidationError);
    });
});
//# sourceMappingURL=isISOCountry.spec.js.map