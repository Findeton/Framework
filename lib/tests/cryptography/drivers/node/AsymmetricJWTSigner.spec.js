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
const chai_1 = require("chai");
const cryptography_1 = require("../../../../src/cryptography");
const publicKey = new Buffer(`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDdlatRjRjogo3WojgGHFHYLugd
UWAY9iR3fy4arWNA1KoS8kVw33cJibXr8bvwUAUparCwlvdbH6dvEOfou0/gCFQs
HUfQrSDv+MuSUMAe8jzKE4qW+jK+xQU9a03GUnKHkkle+Q0pX/g6jXZ7r1/xAK5D
o2kQ+X5xK9cipRgEKwIDAQAB
-----END PUBLIC KEY-----
`);
const privateKey = new Buffer(`-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgQDdlatRjRjogo3WojgGHFHYLugdUWAY9iR3fy4arWNA1KoS8kVw
33cJibXr8bvwUAUparCwlvdbH6dvEOfou0/gCFQsHUfQrSDv+MuSUMAe8jzKE4qW
+jK+xQU9a03GUnKHkkle+Q0pX/g6jXZ7r1/xAK5Do2kQ+X5xK9cipRgEKwIDAQAB
AoGAD+onAtVye4ic7VR7V50DF9bOnwRwNXrARcDhq9LWNRrRGElESYYTQ6EbatXS
3MCyjjX2eMhu/aF5YhXBwkppwxg+EOmXeh+MzL7Zh284OuPbkglAaGhV9bb6/5Cp
uGb1esyPbYW+Ty2PC0GSZfIXkXs76jXAu9TOBvD0ybc2YlkCQQDywg2R/7t3Q2OE
2+yo382CLJdrlSLVROWKwb4tb2PjhY4XAwV8d1vy0RenxTB+K5Mu57uVSTHtrMK0
GAtFr833AkEA6avx20OHo61Yela/4k5kQDtjEf1N0LfI+BcWZtxsS3jDM3i1Hp0K
Su5rsCPb8acJo5RO26gGVrfAsDcIXKC+bQJAZZ2XIpsitLyPpuiMOvBbzPavd4gY
6Z8KWrfYzJoI/Q9FuBo6rKwl4BFoToD7WIUS+hpkagwWiz+6zLoX1dbOZwJACmH5
fSSjAkLRi54PKJ8TFUeOP15h9sQzydI8zJU+upvDEKZsZc/UhT/SySDOxQ4G/523
Y0sz/OZtSWcol/UMgQJALesy++GdvoIDLfJX5GBQpuFgFenRiRDabxrE9MNUZ2aP
FaFp+DyAe+b4nDwuJaW2LURbr8AEZga7oQj0uYxcYw==
-----END RSA PRIVATE KEY-----
`);
describe("AsymmetricJWTSigner", () => {
    const jwtSigner = new cryptography_1.AsymmetricJWTSigner(new cryptography_1.RSASHA256Signer(publicKey, privateKey), "RS256");
    describe("Sign", () => {
        it("Should generate a valid JWT representing the claim", () => __awaiter(this, void 0, void 0, function* () {
            let token = yield jwtSigner.sign({
                name: "Hello World",
                admin: true,
            });
            chai_1.expect(token).to.equal("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9" +
                "." +
                "eyJuYW1lIjoiSGVsbG8gV29ybGQiLCJhZG1pbiI6dHJ1ZX0" +
                "." +
                "kMTtIIVjOHvWn0MriZ846b9xUpiLczu0N2JdzAt6sDR1ZY87e3JGriVmP-7h8zXLFwp0ElDq4Q0urPv_MROBEc_ZV2-AmjoAvzHjZNeGFajTTfdzEd9kgQ6BzKtLrrv3WsU2P_ZQk920_ySNmjG0RukWnaRgwKJTn75UNsh8eLw");
        }));
    });
    describe("Verify", () => {
        it("Should throw if the JWT is malformed (too many sections)", () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield jwtSigner.verify("a.b.c.d");
                chai_1.expect(true).to.equal(false);
            }
            catch (e) {
                chai_1.expect(e.message).to.equal("JWT supplied the incorrect number of components to verify.");
            }
        }));
        it("Should throw if the JWT is using a different algorithm to the one supported", () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield jwtSigner.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" +
                    "." +
                    "eyJuYW1lIjoiSGVsbG8gV29ybGQiLCJhZG1pbiI6dHJ1ZX0" +
                    "." +
                    "1WT_DHWL_7pvzCfBdzzC3i0XqBsiz7wPvZzua1CezCM");
                chai_1.expect(true).to.equal(false);
            }
            catch (e) {
                chai_1.expect(e.message).to.equal("JWT supplied a signing algorithm that is not supported by this validator.");
            }
        }));
        it("Should return the validated claim if the token is valid", () => __awaiter(this, void 0, void 0, function* () {
            let claim = yield jwtSigner.verify("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9" +
                "." +
                "eyJuYW1lIjoiSGVsbG8gV29ybGQiLCJhZG1pbiI6dHJ1ZX0" +
                "." +
                "kMTtIIVjOHvWn0MriZ846b9xUpiLczu0N2JdzAt6sDR1ZY87e3JGriVmP-7h8zXLFwp0ElDq4Q0urPv_MROBEc_ZV2-AmjoAvzHjZNeGFajTTfdzEd9kgQ6BzKtLrrv3WsU2P_ZQk920_ySNmjG0RukWnaRgwKJTn75UNsh8eLw");
            chai_1.expect(claim).to.deep.equal({
                name: "Hello World",
                admin: true,
            });
        }));
        it("Should throw if the JWT is invalid", () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield jwtSigner.verify("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9" +
                    "." +
                    "eyJuYW1lIjoiSGVsbG8gV29ybGQiLCJhZG1pbiI6dHJ1ZX0" +
                    "." +
                    "abcdefg");
                chai_1.expect(true).to.equal(false);
            }
            catch (e) {
                chai_1.expect(e.message).to.equal("The signature provided was not valid.");
            }
        }));
    });
});
//# sourceMappingURL=AsymmetricJWTSigner.spec.js.map