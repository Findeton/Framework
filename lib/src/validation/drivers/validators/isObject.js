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
const ValidationError_1 = require("../../../errors/http/ValidationError");
exports.isObject = (validator) => (i) => __awaiter(this, void 0, void 0, function* () {
    if (typeof i !== "object" || i === null) {
        throw new ValidationError_1.ValidationError("IS_OBJECT", "Object validation failed", "This value should be an object.");
    }
    let response = {};
    for (let p in validator) {
        if (validator.hasOwnProperty(p)) {
            let rawValue = i[p];
            try {
                let validatedOutput = yield validator[p](rawValue);
                if (validatedOutput !== undefined) {
                    response[p] = validatedOutput;
                }
            }
            catch (e) {
                if (e instanceof ValidationError_1.ValidationError) {
                    if (e.fieldPath) {
                        e.fieldPath = `${p}.${e.fieldPath}`;
                    }
                    else {
                        e.fieldPath = p;
                    }
                }
                throw e;
            }
        }
    }
    return response;
});
//# sourceMappingURL=isObject.js.map