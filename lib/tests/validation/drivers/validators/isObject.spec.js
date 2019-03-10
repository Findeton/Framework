"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const combineValidators_1 = require("../../../../src/validation/drivers/helpers/combineValidators");
const either_1 = require("../../../../src/validation/drivers/helpers/either");
const src_1 = require("../../../../src");
describe("isNull", () => {
    const objectFilter = src_1.isObject({
        test: either_1.either(src_1.isString, src_1.isUndefined),
        otherTest: combineValidators_1.combineValidators(src_1.isString, src_1.isISOAlpha2CountryCode),
    });
    it("should return the validated object if all keys pass validation", () => __awaiter(this, void 0, void 0, function* () {
        chai_1.expect(yield objectFilter({
            test: "TEST",
            otherTest: "GB",
        })).to.deep.equal({
            test: "TEST",
            otherTest: "GB",
        });
        chai_1.expect(yield objectFilter({
            otherTest: "GB",
        })).to.deep.equal({
            otherTest: "GB",
        });
    }));
    it("should return a validation error if the input is not an object", () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield objectFilter("string");
            chai_1.expect(false).to.equal(true);
        }
        catch (e) {
            chai_1.expect(e).to.be.instanceOf(src_1.ValidationError);
            chai_1.expect(e.constraintName).to.equal("IS_OBJECT");
        }
    }));
    it("should return a validation error if any of the keys fail their own validations", () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield objectFilter({
                test: "My Test",
                otherTest: null,
            });
            chai_1.expect(false).to.equal(true);
        }
        catch (e) {
            chai_1.expect(e).to.be.instanceOf(src_1.ValidationError);
            chai_1.expect(e.constraintName).to.equal("IS_STRING");
        }
    }));
    it("should return a required validation error if a key is absent", () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield objectFilter({
                test: "Test Value",
            });
            chai_1.expect(false).to.equal(true);
        }
        catch (e) {
            chai_1.expect(e).to.be.instanceOf(src_1.ValidationError);
            chai_1.expect(e.constraintName).to.equal("IS_STRING");
        }
    }));
});
//# sourceMappingURL=isObject.spec.js.map