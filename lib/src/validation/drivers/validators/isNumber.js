"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationError_1 = require("../../../errors/http/ValidationError");
exports.isNumber = (input) => {
    if (typeof input === "number" && !isNaN(input)) {
        return input;
    }
    if (typeof input === "string") {
        let parsedNumber = Number(input);
        if (!isNaN(parsedNumber)) {
            return parsedNumber;
        }
    }
    throw new ValidationError_1.ValidationError("IS_NUMBER", "Value not a number", "This value must be a number.");
};
//# sourceMappingURL=isNumber.js.map