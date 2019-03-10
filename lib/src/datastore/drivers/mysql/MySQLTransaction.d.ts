import { MySQLStore } from "./MySQLStore";
import { SQLStore } from "../../abstract/SQLStore";
import { Logger } from "../../../logging";
import { PoolConnection } from "mysql";
export declare class MySQLTransaction implements SQLStore {
    private store;
    private connection;
    private logger?;
    private transactionId;
    constructor(store: MySQLStore, connection: PoolConnection, logger?: Logger | undefined);
    query<R>(queryString: string, parameters: Array<any>): Promise<Array<R>>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
    finalizeTransaction(): Promise<void>;
}
