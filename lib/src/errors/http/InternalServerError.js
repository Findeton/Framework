"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HTTPError_1 = require("./HTTPError");
class InternalServerError extends HTTPError_1.HTTPError {
    constructor() {
        super(500, "An internal error occurred. The system administrator has been notified.", "Internal Error occurred.");
    }
}
exports.InternalServerError = InternalServerError;
//# sourceMappingURL=InternalServerError.js.map