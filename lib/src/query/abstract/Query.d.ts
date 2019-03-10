export declare abstract class Query<R> {
    abstract execute(...args: Array<any>): Promise<R>;
}
