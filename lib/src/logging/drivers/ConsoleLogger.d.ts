import { LogLevel } from "../abstract/LogLevel";
import { Logger } from "../abstract/Logger";
export declare class ConsoleLogger extends Logger {
    private level;
    private injectedConsole;
    constructor(level: LogLevel, injectedConsole?: Console);
    log(message: string, level: LogLevel, metadata: Object): void;
    private shouldLog;
}
