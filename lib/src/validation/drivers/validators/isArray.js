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
const errors_1 = require("../../../errors");
exports.isArray = (innerValidator) => (input) => __awaiter(this, void 0, void 0, function* () {
    if (!Array.isArray(input)) {
        throw new errors_1.ValidationError("IS_ARRAY", "Value not an array", "This value must be an array.");
    }
    let validatedArray = yield Promise.all(input.map(innerValidator));
    return validatedArray;
});
//# sourceMappingURL=isArray.js.map