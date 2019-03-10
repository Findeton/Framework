"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StrontiumError_1 = require("../StrontiumError");
class HTTPError extends StrontiumError_1.StrontiumError {
    constructor(statusCode, externalMessage, internalMessage) {
        super(internalMessage);
        this.statusCode = statusCode;
        this.externalMessage = externalMessage;
        this.internalMessage = internalMessage;
    }
    toResponseBody() {
        return {
            statusCode: this.statusCode,
            errorMessage: this.externalMessage,
        };
    }
}
exports.HTTPError = HTTPError;
//# sourceMappingURL=HTTPError.js.map