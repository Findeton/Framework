import { LogLevel } from "./LogLevel";
export declare abstract class Logger {
    fatal(message: string, metadata?: Object): void;
    error(message: string, metadata?: Object): void;
    warn(message: string, metadata?: Object): void;
    info(message: string, metadata?: Object): void;
    debug(message: string, metadata?: Object): void;
    abstract log(message: string, level: LogLevel, metadata?: Object): void;
}
