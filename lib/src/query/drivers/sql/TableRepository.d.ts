import { Repository } from "../../abstract/Repository";
import { SQLStore } from "../../../datastore";
import { Filter } from "../..";
export declare abstract class TableRepository<T extends any, K extends keyof T> extends Repository<T, K> {
    protected store: SQLStore;
    protected tableName: string;
    protected queryFields: Array<keyof T>;
    protected primaryKeyField: K;
    protected postProcessor: (query: string, parameters: Array<any>) => [string, Array<any>];
    constructor(store: SQLStore, tableName: string, queryFields: Array<keyof T>, primaryKeyField: K);
    create(payload: Partial<T>, connection?: SQLStore): Promise<T[K]>;
    read(filter: Filter<T>, pagination?: {
        order?: [keyof T, "DESC" | "ASC"];
        limit?: number;
        offset?: number;
    }, connection?: SQLStore): Promise<Array<T>>;
    update(payload: Partial<T>, filter: Filter<T>, connection?: SQLStore): Promise<void>;
    delete(filter: Filter<T>, connection?: SQLStore): Promise<void>;
    generateID(): Promise<any>;
}
