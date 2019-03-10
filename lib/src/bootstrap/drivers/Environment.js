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
const logging_1 = require("../../logging");
const validation_1 = require("../../validation");
class Environment {
    constructor(validator) {
        this.validator = validator;
    }
    getKey(key) {
        if (this.validatedEnvironment !== undefined) {
            return this.validatedEnvironment[key];
        }
        else {
            throw new Error("An environment value was accessed before the Environment container completed initialization.");
        }
    }
    isHealthy() {
        return this.validatedEnvironment !== undefined;
    }
    startup(container) {
        return __awaiter(this, void 0, void 0, function* () {
            container.bind(Environment).toConstantValue(this);
            try {
                this.validatedEnvironment = yield validation_1.isObject(this.validator)(process.env);
            }
            catch (e) {
                if (container.isBound(logging_1.Logger)) {
                    container.get(logging_1.Logger).error("Environment validation failed!", e);
                }
                else {
                    console.error(e);
                }
                throw e;
            }
        });
    }
    shutdown(container) {
        return __awaiter(this, void 0, void 0, function* () {
            container.unbind(Environment);
            this.validatedEnvironment = undefined;
        });
    }
}
exports.Environment = Environment;
//# sourceMappingURL=Environment.js.map