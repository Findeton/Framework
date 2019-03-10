"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../../errors");
exports.isExactly = (values) => (i) => {
    for (let value of values) {
        if (value === i) {
            return value;
        }
    }
    throw new errors_1.ValidationError("IS_EXACTLY", "Value not in permitted set", `The provided value was not allowed for this field. Allowed values are: '${values.join("', '")}'`);
};
//# sourceMappingURL=isExactly.js.map