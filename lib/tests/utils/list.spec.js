"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const list_1 = require("../../src/utils/list");
describe("compact", () => {
    it("should remove null and undefined elements", () => {
        const input = [0, 1, false, null, "", "hello", undefined, true, {}];
        chai_1.expect(list_1.compact(input)).to.deep.equal([
            0,
            1,
            false,
            "",
            "hello",
            true,
            {},
        ]);
    });
});
//# sourceMappingURL=list.spec.js.map