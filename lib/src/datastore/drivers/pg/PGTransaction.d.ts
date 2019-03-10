import { SQLStore } from "../../abstract/SQLStore";
import { Logger } from "../../../logging";
import { PoolClient } from "pg";
export declare class PGTransaction implements SQLStore {
    private connection;
    private logger?;
    private transactionId;
    constructor(connection: PoolClient, logger?: Logger | undefined);
    query<R>(queryString: string, parameters: Array<any>): Promise<Array<R>>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
    finalizeTransaction(): Promise<void>;
}
