import { ValidatorFunction } from "../../validation";
export declare abstract class QueueHandler<P> {
    abstract inputValidator: ValidatorFunction<any, P>;
    abstract handle(message: P): Promise<void>;
}
export declare type QueueHanderPayload<Q extends QueueHandler<any>> = Q extends QueueHandler<infer P> ? P : never;
