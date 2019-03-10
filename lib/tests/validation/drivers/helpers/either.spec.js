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
describe("either", () => {
    it("should return the first validator that passes", () => __awaiter(this, void 0, void 0, function* () {
        let testVariable = false;
        let testValidator = src_1.either(src_1.isNumber, src_1.isBoolean, src_1.isISOAlpha2CountryCode);
        let testOutput = yield testValidator(testVariable);
        chai_1.expect(testOutput).to.equal(false);
        testVariable = 26;
        testOutput = yield testValidator(testVariable);
        chai_1.expect(testOutput).to.equal(26);
    }));
});
//# sourceMappingURL=either.spec.js.map