"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const either_1 = require("./either");
const isUndefined_1 = require("../validators/isUndefined");
exports.isOptional = (validator) => either_1.either(isUndefined_1.isUndefined, validator);
//# sourceMappingURL=isOptional.js.map