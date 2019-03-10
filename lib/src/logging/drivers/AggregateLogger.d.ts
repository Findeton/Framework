import { Logger } from "../abstract/Logger";
import { Container } from "inversify";
import { Process } from "../../runtime";
import { LogLevel } from "..";
export declare class AggregateLogger extends Logger implements Process {
    private loggers;
    constructor(loggers: Array<Logger>);
    isHealthy(): boolean;
    shutdown(container: Container): Promise<void>;
    startup(container: Container): Promise<void>;
    log(message: string, level: LogLevel, metadata?: Object): void;
}
