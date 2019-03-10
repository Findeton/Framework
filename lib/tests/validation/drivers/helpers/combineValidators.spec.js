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
const src_1 = require("../../../../src");
describe("combineValidators", () => {
    describe("Two Validators", () => {
        it("should apply two validators to a value sequentially and throw the first error encountered", () => __awaiter(this, void 0, void 0, function* () {
            let testVariable;
            let testValidator = src_1.combineValidators(src_1.isString, src_1.isISOAlpha2CountryCode);
            try {
                let testOutput = yield testValidator(testVariable);
                chai_1.expect(false).to.equal(true);
            }
            catch (e) {
                chai_1.expect(e instanceof src_1.ValidationError).to.equal(true);
                chai_1.expect(e.message === "Value was undefined");
            }
        }));
        it("should correctly apply the validations in the sequence provided", () => __awaiter(this, void 0, void 0, function* () {
            let testVariable = "GB";
            let testValidator = src_1.combineValidators(src_1.isString, src_1.isISOAlpha2CountryCode);
            let testOutput = yield testValidator(testVariable);
            chai_1.expect(testOutput).to.equal("GB");
        }));
    });
    describe("Three Validators", () => {
        it("should apply three validators to a value sequentially and throw the first error encountered", () => __awaiter(this, void 0, void 0, function* () {
            let testVariable;
            let testValidator = src_1.combineValidators(src_1.isString, src_1.isISOAlpha2CountryCode, (i) => {
                throw new src_1.ValidationError("TEST_CONSTRAINT", "This is a test");
            });
            try {
                let testOutput = yield testValidator(testVariable);
                chai_1.expect(false).to.equal(true);
            }
            catch (e) {
                chai_1.expect(e instanceof src_1.ValidationError).to.equal(true);
                chai_1.expect(e.message === "Value was undefined");
            }
        }));
        it("should correctly apply the validations in the sequence provided", () => __awaiter(this, void 0, void 0, function* () {
            let testVariable = "GB";
            let testValidator = src_1.combineValidators(src_1.isString, src_1.isISOAlpha2CountryCode, (i) => "test");
            let testOutput = yield testValidator(testVariable);
            chai_1.expect(testOutput).to.equal("test");
        }));
    });
    describe("Four Validators", () => {
        it("should apply four validators to a value sequentially and throw the first error encountered", () => __awaiter(this, void 0, void 0, function* () {
            let testVariable;
            let testValidator = src_1.combineValidators(src_1.isString, src_1.isISOAlpha2CountryCode, (i) => i, (i) => {
                throw new src_1.ValidationError("TEST_CONSTRAINT", "This is a test");
            });
            try {
                let testOutput = yield testValidator(testVariable);
                chai_1.expect(false).to.equal(true);
            }
            catch (e) {
                chai_1.expect(e instanceof src_1.ValidationError).to.equal(true);
                chai_1.expect(e.message === "Value was undefined");
            }
        }));
        it("should correctly apply the validations in the sequence provided", () => __awaiter(this, void 0, void 0, function* () {
            let testVariable = "GB";
            let testValidator = src_1.combineValidators(src_1.isString, src_1.isISOAlpha2CountryCode, (i) => "test", (i) => "other test");
            let testOutput = yield testValidator(testVariable);
            chai_1.expect(testOutput).to.equal("other test");
        }));
    });
    describe("Five Validators", () => {
        it("should apply five validators to a value sequentially and throw the first error encountered", () => __awaiter(this, void 0, void 0, function* () {
            let testVariable = "GB";
            let testValidator = src_1.combineValidators(src_1.isString, src_1.isISOAlpha2CountryCode, (i) => i, (i) => {
                throw new src_1.ValidationError("TEST_CONSTRAINT", "This is a test");
            }, (i) => i);
            try {
                let testOutput = yield testValidator(testVariable);
                chai_1.expect(false).to.equal(true);
            }
            catch (e) {
                chai_1.expect(e instanceof src_1.ValidationError).to.equal(true);
                chai_1.expect(e.message === "Value was undefined");
            }
        }));
        it("should correctly apply the validations in the sequence provided", () => __awaiter(this, void 0, void 0, function* () {
            let testVariable = "GB";
            let testValidator = src_1.combineValidators(src_1.isString, src_1.isISOAlpha2CountryCode, (i) => "test", (i) => "other test", (i) => "final test");
            let testOutput = yield testValidator(testVariable);
            chai_1.expect(testOutput).to.equal("final test");
        }));
    });
});
//# sourceMappingURL=combineValidators.spec.js.map