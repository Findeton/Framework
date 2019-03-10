"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HTTPError_1 = require("./HTTPError");
class ValidationError extends HTTPError_1.HTTPError {
    constructor(constraintName, internalMessage, externalMessage = internalMessage, fieldPath) {
        super(400, externalMessage, internalMessage);
        this.constraintName = constraintName;
        this.fieldPath = fieldPath;
    }
    toResponseBody() {
        return {
            statusCode: this.statusCode,
            errorMessage: this.externalMessage,
            path: this.fieldPath,
        };
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=ValidationError.js.map