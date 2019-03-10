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
const inversify_1 = require("inversify");
class Runtime {
    constructor(processes) {
        this.processes = processes;
        this.container = new inversify_1.Container();
    }
    startup() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let p of this.processes) {
                yield p.startup(this.container);
            }
        });
    }
    shutdown() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let p of this.processes.reverse()) {
                yield p.shutdown(this.container);
            }
        });
    }
    isHealthy() {
        return this.processes.reduce((memo, p) => {
            return memo && p.isHealthy();
        }, true);
    }
}
exports.Runtime = Runtime;
//# sourceMappingURL=Runtime.js.map