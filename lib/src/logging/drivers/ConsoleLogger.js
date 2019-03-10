"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogLevel_1 = require("../abstract/LogLevel");
const Logger_1 = require("../abstract/Logger");
class ConsoleLogger extends Logger_1.Logger {
    constructor(level, injectedConsole = console) {
        super();
        this.level = level;
        this.injectedConsole = injectedConsole;
    }
    log(message, level, metadata) {
        if (!this.shouldLog(level)) {
            return;
        }
        switch (level) {
            case LogLevel_1.LogLevel.DEBUG:
                this.injectedConsole.log(message, metadata);
                break;
            case LogLevel_1.LogLevel.INFO:
                this.injectedConsole.info(message, metadata);
                break;
            case LogLevel_1.LogLevel.WARN:
                this.injectedConsole.warn(message, metadata);
                break;
            case LogLevel_1.LogLevel.ERROR:
            case LogLevel_1.LogLevel.FATAL:
                this.injectedConsole.error(message, metadata);
                break;
        }
    }
    shouldLog(level) {
        return level >= this.level;
    }
}
exports.ConsoleLogger = ConsoleLogger;
//# sourceMappingURL=ConsoleLogger.js.map