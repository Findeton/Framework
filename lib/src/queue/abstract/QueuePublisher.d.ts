import { QueueHanderPayload, QueueHandler } from "./QueueHandler";
export declare abstract class QueuePublisher {
    abstract publish<Q extends QueueHandler<any>>(queueName: string, eventName: string, message: QueueHanderPayload<Q>): Promise<void>;
}
