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
const AsymmetricSigner_1 = require("../../abstract/AsymmetricSigner");
const InvalidSignatureError_1 = require("../../../errors/InvalidSignatureError");
const JWA = require("jwa");
class RSASHA256Signer extends AsymmetricSigner_1.AsymmetricSigner {
    constructor(publicKey, privateKey, algorithm = "RS256") {
        super(publicKey, privateKey);
        this.publicKey = publicKey;
        this.privateKey = privateKey;
        this.algorithm = algorithm;
        this.signer = JWA(this.algorithm);
    }
    sign(plaintext) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.signer.sign(plaintext, this.privateKey);
        });
    }
    verify(plaintext, signature) {
        return __awaiter(this, void 0, void 0, function* () {
            let isValid = yield this.signer.verify(plaintext, signature.toString(), this.publicKey);
            if (!isValid) {
                throw new InvalidSignatureError_1.InvalidSignatureError();
            }
            return Buffer.from([]);
        });
    }
}
exports.RSASHA256Signer = RSASHA256Signer;
//# sourceMappingURL=RSASHA256Signer.js.map