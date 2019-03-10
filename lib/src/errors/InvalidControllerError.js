"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StrontiumError_1 = require("./StrontiumError");
class InvalidControllerError extends StrontiumError_1.StrontiumError {
    constructor(route) {
        super(`The controller provided for the route (${route}) is invalid. Please double check that it is Injectable and is registered correctly with the Web Server.`);
    }
}
exports.InvalidControllerError = InvalidControllerError;
//# sourceMappingURL=InvalidControllerError.js.map