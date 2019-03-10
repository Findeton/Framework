"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultValue = (defaultValue) => (input) => {
    if (input === undefined) {
        return defaultValue;
    }
    return input;
};
//# sourceMappingURL=defaultValue.js.map