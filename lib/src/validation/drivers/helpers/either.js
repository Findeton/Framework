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
function either(V1, V2, V3, V4, V5) {
    return (i) => __awaiter(this, void 0, void 0, function* () {
        let errors = [];
        for (let validator of [V1, V2, V3, V4, V5]) {
            if (validator !== undefined) {
                try {
                    return yield validator(i);
                }
                catch (e) {
                    errors.push(e);
                }
            }
        }
        let failedConstraints = [];
        let failedInternalMessages = [];
        let failedExternalMessages = [];
        for (let error of errors) {
            if (error instanceof ValidationError_1.ValidationError) {
                failedConstraints.push(error.constraintName);
                if (error.internalMessage) {
                    failedInternalMessages.push(error.internalMessage);
                }
                if (error.externalMessage) {
                    failedExternalMessages.push(error.externalMessage);
                }
            }
            else {
                throw error;
            }
        }
        throw new ValidationError_1.ValidationError(`EITHER(${failedConstraints.join(",")})`, `No compatible validators found: (${failedInternalMessages.join(", ")})`, `This value did not match any of the following validators: (${failedExternalMessages.join(" | ")})`);
    });
}
exports.either = either;
//# sourceMappingURL=either.js.map