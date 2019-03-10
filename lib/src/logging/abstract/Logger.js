"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogLevel_1 = require("./LogLevel");
class Logger {
    fatal(message, metadata) {
        this.log(message, LogLevel_1.LogLevel.FATAL, metadata);
    }
    error(message, metadata) {
        this.log(message, LogLevel_1.LogLevel.ERROR, metadata);
    }
    warn(message, metadata) {
        this.log(message, LogLevel_1.LogLevel.WARN, metadata);
    }
    info(message, metadata) {
        this.log(message, LogLevel_1.LogLevel.INFO, metadata);
    }
    debug(message, metadata) {
        this.log(message, LogLevel_1.LogLevel.DEBUG, metadata);
    }
}
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map