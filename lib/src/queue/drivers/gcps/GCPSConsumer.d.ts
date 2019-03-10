import { QueueHandler } from "../../abstract/QueueHandler";
import { SerializedTask } from "../../abstract/SerializedTask";
import { Container } from "inversify";
import { Process } from "../../../runtime";
import { ConstructorOf } from "../../../utils/types";
export declare class GCPSConsumer implements Process {
    subscriptionName: string;
    taskHandler: ConstructorOf<QueueHandler<any>>;
    prefetchCount: number;
    isEnabled: boolean;
    private ackDeadlineSeconds;
    private client;
    private logger?;
    constructor(serviceAccountEmail: string, keyId: string, privateKey: string, subscriptionName: string, taskHandler: ConstructorOf<QueueHandler<any>>, prefetchCount?: number);
    isHealthy(): boolean;
    shutdown(container: Container): Promise<void>;
    startup(container: Container): Promise<void>;
    ack(ackId: string): Promise<void>;
    nack(ackId: string, requeue?: boolean): Promise<void>;
    extendAck(ackId: string): Promise<void>;
    pollAndExecute(container: Container): Promise<void>;
    executeTask(ackId: string, task: SerializedTask, applicationContainer: Container): Promise<void>;
}
