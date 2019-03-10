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
const ExpectToThrowCustomClass_1 = require("../../../helpers/ExpectToThrowCustomClass");
const chai_1 = require("chai");
const either_1 = require("../../../../src/validation/drivers/helpers/either");
const isArray_1 = require("../../../../src/validation/drivers/validators/isArray");
const src_1 = require("../../../../src");
describe("isArray", () => {
    it("should return the validated array if all values are valid", () => __awaiter(this, void 0, void 0, function* () {
        let testValidator = isArray_1.isArray(src_1.isObject({
            test: src_1.isString,
            otherTest: src_1.isNumber,
            optionalTest: either_1.either(src_1.isUndefined, src_1.isBoolean),
        }));
        chai_1.expect(yield testValidator([
            {
                test: "test",
                otherTest: 15,
            },
            {
                test: "more test",
                otherTest: 15,
                optionalTest: false,
            },
        ])).to.deep.equal([
            {
                test: "test",
                otherTest: 15,
            },
            {
                test: "more test",
                otherTest: 15,
                optionalTest: false,
            },
        ]);
        chai_1.expect(yield testValidator([])).to.deep.equal([]);
    }));
    it("should return a validation error if input is not boolean", () => __awaiter(this, void 0, void 0, function* () {
        let testValidator = isArray_1.isArray(src_1.isObject({
            test: src_1.isString,
            otherTest: src_1.isNumber,
            optionalTest: either_1.either(src_1.isUndefined, src_1.isBoolean),
        }));
        yield ExpectToThrowCustomClass_1.expectToThrowCustomClassAsync(() => __awaiter(this, void 0, void 0, function* () { return yield testValidator({}); }), src_1.ValidationError);
        yield ExpectToThrowCustomClass_1.expectToThrowCustomClassAsync(() => __awaiter(this, void 0, void 0, function* () { return yield testValidator("false"); }), src_1.ValidationError);
        yield ExpectToThrowCustomClass_1.expectToThrowCustomClassAsync(() => __awaiter(this, void 0, void 0, function* () { return yield testValidator("true"); }), src_1.ValidationError);
        yield ExpectToThrowCustomClass_1.expectToThrowCustomClassAsync(() => __awaiter(this, void 0, void 0, function* () { return yield testValidator(false); }), src_1.ValidationError);
        yield ExpectToThrowCustomClass_1.expectToThrowCustomClassAsync(() => __awaiter(this, void 0, void 0, function* () { return yield testValidator([{}]); }), src_1.ValidationError);
        yield ExpectToThrowCustomClass_1.expectToThrowCustomClassAsync(() => __awaiter(this, void 0, void 0, function* () {
            return yield testValidator([
                {
                    test: "test",
                    otherTest: 15,
                },
                {
                    test: "test",
                    otherTest: 15,
                    optionalTest: "wrong",
                },
            ]);
        }), src_1.ValidationError);
    }));
});
//# sourceMappingURL=isArray.spec.js.map