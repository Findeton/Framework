import { Filter } from "./Filter";
export declare abstract class Repository<T, K extends keyof T> {
    abstract create(payload: Partial<T>): Promise<T[K]>;
    abstract read(filter: Filter<T>): Promise<Array<T>>;
    abstract update(payload: Partial<T>, filter: Filter<T>): Promise<void>;
    abstract delete(filter: Filter<T>): Promise<void>;
}
