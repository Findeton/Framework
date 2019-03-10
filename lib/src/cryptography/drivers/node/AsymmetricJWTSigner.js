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
const JWTSigner_1 = require("../../abstract/JWTSigner");
const base64url_1 = require("base64url");
class AsymmetricJWTSigner extends JWTSigner_1.JWTSigner {
    constructor(signer, algorithmCode, keyId) {
        super();
        this.signer = signer;
        this.algorithmCode = algorithmCode;
        this.keyId = keyId;
    }
    sign(claim) {
        return __awaiter(this, void 0, void 0, function* () {
            let stringifiedClaim = JSON.stringify(claim);
            let encodedClaim = base64url_1.encode(stringifiedClaim);
            let stringifiedHeader = JSON.stringify({
                alg: this.algorithmCode,
                typ: "JWT",
                kid: this.keyId,
            });
            let encodedHeader = base64url_1.encode(stringifiedHeader);
            let signature = yield this.signer.sign(new Buffer(`${encodedHeader}.${encodedClaim}`));
            return `${encodedHeader}.${encodedClaim}.${base64url_1.fromBase64(signature.toString("base64"))}`;
        });
    }
    verify(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let claimComponents = token.split(".");
            if (claimComponents.length !== 3) {
                throw new Error("JWT supplied the incorrect number of components to verify.");
            }
            let claimHeader = claimComponents[0];
            let parsedClaimHeader = JSON.parse(base64url_1.decode(claimHeader));
            if (parsedClaimHeader.alg !== this.algorithmCode) {
                throw new Error("JWT supplied a signing algorithm that is not supported by this validator.");
            }
            let claimBody = claimComponents[1];
            let claimSignature = claimComponents[2];
            yield this.signer.verify(new Buffer(`${claimHeader}.${claimBody}`), new Buffer(claimSignature));
            let parsedClaimBody = JSON.parse(base64url_1.decode(claimBody));
            return parsedClaimBody;
        });
    }
}
exports.AsymmetricJWTSigner = AsymmetricJWTSigner;
//# sourceMappingURL=AsymmetricJWTSigner.js.map