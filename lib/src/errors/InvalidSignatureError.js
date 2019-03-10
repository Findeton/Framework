"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StrontiumError_1 = require("./StrontiumError");
class InvalidSignatureError extends StrontiumError_1.StrontiumError {
    constructor() {
        super(`The signature provided was not valid.`);
    }
}
exports.InvalidSignatureError = InvalidSignatureError;
//# sourceMappingURL=InvalidSignatureError.js.map