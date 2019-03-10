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
function combineValidators(V1, V2, V3, V4, V5) {
    if (V5 !== undefined && V4 !== undefined && V3 !== undefined) {
        return (i) => __awaiter(this, void 0, void 0, function* () {
            let r1 = yield V1(i);
            let r2 = yield V2(r1);
            let r3 = yield V3(r2);
            let r4 = yield V4(r3);
            return yield V5(r4);
        });
    }
    else if (V4 !== undefined && V3 !== undefined) {
        return (i) => __awaiter(this, void 0, void 0, function* () {
            let r1 = yield V1(i);
            let r2 = yield V2(r1);
            let r3 = yield V3(r2);
            return yield V4(r3);
        });
    }
    else if (V3 !== undefined) {
        return (i) => __awaiter(this, void 0, void 0, function* () {
            let r1 = yield V1(i);
            let r2 = yield V2(r1);
            return yield V3(r2);
        });
    }
    else {
        return (i) => __awaiter(this, void 0, void 0, function* () {
            let r1 = yield V1(i);
            return yield V2(r1);
        });
    }
}
exports.combineValidators = combineValidators;
//# sourceMappingURL=combineValidators.js.map