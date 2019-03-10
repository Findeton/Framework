"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Digest_1 = require("./Digest");
class HMAC extends Digest_1.Digest {
    constructor(secretKey) {
        super();
        this.secretKey = secretKey;
    }
}
exports.HMAC = HMAC;
//# sourceMappingURL=HMAC.js.map