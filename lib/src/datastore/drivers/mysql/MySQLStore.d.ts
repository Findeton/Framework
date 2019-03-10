import { MySQLTransaction } from "./MySQLTransaction";
import { SQLStore } from "../../abstract/SQLStore";
import { Container } from "inversify";
import { PoolConfig } from "mysql";
import { Process } from "../../../runtime";
export declare class MySQLStore implements Process, SQLStore {
    private connectionOptions;
    healthyState: boolean;
    private connection?;
    private logger?;
    constructor(connectionOptions: PoolConfig);
    isHealthy(): boolean;
    query<R>(queryString: string, parameters: Array<any>): Promise<Array<R>>;
    createTransaction(): Promise<MySQLTransaction>;
    startup(container: Container): Promise<void>;
    shutdown(container: Container): Promise<void>;
}
