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
const src_1 = require("../../../../src");
describe("SHA256Digest", () => {
    describe("Cryptographic Test Vectors", () => {
        let hasher;
        before(() => {
            hasher = new src_1.SHA256Digest();
        });
        const testHash = (plaintext, digest) => __awaiter(this, void 0, void 0, function* () {
            let result = yield hasher.calculate(new Buffer(plaintext, "utf8"));
            chai_1.expect(result.toString("hex")).to.equal(digest);
        });
        it('"abc", the bit string (0x)616263 of length 24 bits', () => __awaiter(this, void 0, void 0, function* () {
            yield testHash("abc", "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
        }));
        it('the empty string "", the bit string of length 0', () => __awaiter(this, void 0, void 0, function* () {
            yield testHash("", "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
        }));
        it('"abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq" (length 448 bits)', () => __awaiter(this, void 0, void 0, function* () {
            yield testHash("abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq", "248d6a61d20638b8e5c026930c3e6039a33ce45964ff2167f6ecedd419db06c1");
        }));
        it('one million (1,000,000) repetitions of the character "a" (0x61).', () => __awaiter(this, void 0, void 0, function* () {
            let testString = "";
            for (let i = 0; i < 100000; i++) {
                testString += "aaaaaaaaaa";
            }
            yield testHash(testString, "cdc76e5c9914fb9281a1c7e284d73e67f1809a48a497200e046d39ccc7112cd0");
        }));
    });
});
//# sourceMappingURL=SHA256Digest.spec.js.map