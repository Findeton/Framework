"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationError_1 = require("../../../errors/http/ValidationError");
const Validator = require("validator");
exports.isISOAlpha2CountryCode = (input) => {
    if (Validator.isISO31661Alpha2(String(input))) {
        return String(input);
    }
    else {
        throw new ValidationError_1.ValidationError("IS_ISO_ALPHA_2_COUNTRY", "Value not an ISO Alpha-2 Country Code", "This value must be a valid ISO Alpha-2 Country Code.");
    }
};
//# sourceMappingURL=isISOCountry.js.map