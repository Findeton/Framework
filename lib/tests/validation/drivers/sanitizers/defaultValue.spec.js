"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const src_1 = require("../../../../src");
describe("defaultValue", () => {
    it("should return the default value if input is undefined", () => {
        chai_1.expect(src_1.defaultValue("default")(undefined)).to.equal("default");
        chai_1.expect(src_1.defaultValue(null)(undefined)).to.equal(null);
        chai_1.expect(src_1.defaultValue(undefined)(undefined)).to.equal(undefined);
    });
    it("should return the input value if input is isn't undefined", () => {
        chai_1.expect(src_1.defaultValue("notthing")(true)).to.equal(true);
        chai_1.expect(src_1.defaultValue("notthing")(false)).to.equal(false);
        chai_1.expect(src_1.defaultValue("notthing")(null)).to.equal(null);
        chai_1.expect(src_1.defaultValue("notthing")("abc")).to.equal("abc");
        chai_1.expect(src_1.defaultValue("notthing")({})).to.deep.equal({});
    });
});
//# sourceMappingURL=defaultValue.spec.js.map