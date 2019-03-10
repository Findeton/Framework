"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationError_1 = require("../../../errors/http/ValidationError");
exports.isNull = (input) => {
    if (input === null) {
        return null;
    }
    throw new ValidationError_1.ValidationError("IS_NULL", "Value was not null", "This value must be `null`. It's possible you sent undefined, no value or the string null instead.");
};
//# sourceMappingURL=isNull.js.map