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
exports.expectToThrowCustomClass = (candidateFunction, classContructor) => {
    try {
        candidateFunction();
        chai_1.expect(false).to.equal(true);
    }
    catch (e) {
        chai_1.expect(e).to.be.instanceOf(classContructor);
    }
};
exports.expectToThrowCustomClassAsync = (candidateFunction, classContructor) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield candidateFunction();
        chai_1.expect(false).to.equal(true);
    }
    catch (e) {
        chai_1.expect(e).to.be.instanceOf(classContructor);
    }
});
//# sourceMappingURL=ExpectToThrowCustomClass.js.map