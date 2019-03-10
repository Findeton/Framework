"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const HMAC_1 = require("../../abstract/HMAC");
const crypto_1 = require("crypto");
class SHA1HMAC extends HMAC_1.HMAC {
    calculate(input) {
        return __awaiter(this, void 0, void 0, function* () {
            let hmacBuilder = crypto_1.createHmac("sha1", this.secretKey);
            hmacBuilder.update(input);
            return hmacBuilder.digest();
        });
    }
}
exports.SHA1HMAC = SHA1HMAC;
//# sourceMappingURL=SHA1HMAC.js.map