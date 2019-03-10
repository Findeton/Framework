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
const Digest_1 = require("../../abstract/Digest");
const crypto_1 = require("crypto");
class SHA256Digest extends Digest_1.Digest {
    calculate(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashBuilder = crypto_1.createHash("sha256");
            hashBuilder.update(input);
            return hashBuilder.digest();
        });
    }
}
exports.SHA256Digest = SHA256Digest;
//# sourceMappingURL=SHA256Digest.js.map