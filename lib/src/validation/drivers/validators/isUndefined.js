"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../../errors");
exports.isUndefined = (input) => {
    if (input === undefined) {
        return undefined;
    }
    throw new errors_1.ValidationError("IS_UNDEFINED", "Value not undefined", "This value must be undefined.");
};
//# sourceMappingURL=isUndefined.js.map