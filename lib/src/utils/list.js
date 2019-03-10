"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeGuard_1 = require("./typeGuard");
exports.compact = (input) => {
    return input.filter(typeGuard_1.notMissing);
};
//# sourceMappingURL=list.js.map