"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StrontiumError {
    constructor(message) {
        this.message = message;
        let error = new Error();
        this.stack = error.stack;
    }
}
exports.StrontiumError = StrontiumError;
//# sourceMappingURL=StrontiumError.js.map