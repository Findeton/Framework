"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationError_1 = require("../../../errors/http/ValidationError");
exports.isString = (input) => {
    if (typeof input === "string") {
        return input;
    }
    throw new ValidationError_1.ValidationError("IS_STRING", "Value not a string", "This value must be a string.");
};
//# sourceMappingURL=isString.js.map