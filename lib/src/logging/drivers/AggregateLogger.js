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
const Logger_1 = require("../abstract/Logger");
const runtime_1 = require("../../runtime");
class AggregateLogger extends Logger_1.Logger {
    constructor(loggers) {
        super();
        this.loggers = loggers;
    }
    isHealthy() {
        return this.loggers.reduce((memo, l) => {
            if (runtime_1.isProcess(l)) {
                return memo && l.isHealthy();
            }
            else {
                return memo;
            }
        }, true);
    }
    shutdown(container) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let l of this.loggers) {
                if (runtime_1.isProcess(l)) {
                    yield l.shutdown(container);
                }
            }
            container.unbind(Logger_1.Logger);
        });
    }
    startup(container) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let l of this.loggers) {
                if (runtime_1.isProcess(l)) {
                    yield l.startup(container);
                }
            }
            container.bind(Logger_1.Logger).toConstantValue(this);
        });
    }
    log(message, level, metadata) {
        for (let l of this.loggers) {
            l.log(message, level, metadata);
        }
    }
}
exports.AggregateLogger = AggregateLogger;
//# sourceMappingURL=AggregateLogger.js.map