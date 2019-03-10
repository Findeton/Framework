"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationError_1 = require("../../../errors/http/ValidationError");
exports.isBoolean = (input) => {
    if (typeof input === "boolean") {
        return input;
    }
    throw new ValidationError_1.ValidationError("IS_BOOLEAN", "Value not a boolean", "This value must be a boolean.");
};
//# sourceMappingURL=isBoolean.js.map