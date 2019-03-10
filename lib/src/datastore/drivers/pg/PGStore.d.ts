import { PGIsolationLevel } from "../../abstract/PGIsolationLevel";
import { PGTransaction } from "./PGTransaction";
import { SQLStore } from "../../abstract/SQLStore";
import { Container } from "inversify";
import { PoolConfig } from "pg";
import { Process } from "../../../runtime";
export declare class PGStore implements Process, SQLStore {
    private connectionOptions;
    private connection?;
    private logger?;
    private healthyState;
    constructor(connectionOptions: PoolConfig);
    isHealthy(): boolean;
    query<R>(queryString: string, parameters: Array<any>): Promise<Array<R>>;
    createTransaction(isolationLevel?: PGIsolationLevel): Promise<PGTransaction>;
    startup(container: Container): Promise<void>;
    shutdown(container: Container): Promise<void>;
}
