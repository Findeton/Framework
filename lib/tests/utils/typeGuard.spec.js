"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const typeGuard_1 = require("../../src/utils/typeGuard");
describe("notMissing", () => {
    it("should return true for value that isn't null or undefined", () => {
        chai_1.expect(typeGuard_1.notMissing({})).to.equal(true);
        chai_1.expect(typeGuard_1.notMissing(1)).to.equal(true);
        chai_1.expect(typeGuard_1.notMissing(0)).to.equal(true);
        chai_1.expect(typeGuard_1.notMissing(false)).to.equal(true);
        chai_1.expect(typeGuard_1.notMissing("abc")).to.equal(true);
        chai_1.expect(typeGuard_1.notMissing([])).to.equal(true);
        chai_1.expect(typeGuard_1.notMissing([1, null])).to.equal(true);
        chai_1.expect(typeGuard_1.notMissing([undefined, null])).to.equal(true);
    });
    it("should return false for value that is null", () => {
        chai_1.expect(typeGuard_1.notMissing(null)).to.equal(false);
    });
    it("should return false for value that is undefined", () => {
        chai_1.expect(typeGuard_1.notMissing(undefined)).to.equal(false);
    });
});
//# sourceMappingURL=typeGuard.spec.js.map