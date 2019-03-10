"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationError_1 = require("../../../errors/http/ValidationError");
const Validator = require("validator");
exports.normalizeEmail = (options) => (input) => {
    let normalizedEmail = Validator.normalizeEmail(String(input), options);
    let isValid = Validator.isEmail(String(normalizedEmail));
    if (isValid && typeof normalizedEmail === "string") {
        return normalizedEmail;
    }
    else {
        throw new ValidationError_1.ValidationError("NORMALIZE_EMAIL", "Invalid Email provided", "This value must be a valid email address.");
    }
};
//# sourceMappingURL=normalizeEmail.js.map