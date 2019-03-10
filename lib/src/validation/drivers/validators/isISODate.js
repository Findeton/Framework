"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationError_1 = require("../../../errors/http/ValidationError");
const Validator = require("validator");
exports.isISODate = (input) => {
    if (Validator.isISO8601(String(input))) {
        return new Date(String(input));
    }
    else {
        throw new ValidationError_1.ValidationError("IS_ISO_8601", "Value not an ISO Date", "This value must be a valid ISO 8601 Date string.");
    }
};
//# sourceMappingURL=isISODate.js.map