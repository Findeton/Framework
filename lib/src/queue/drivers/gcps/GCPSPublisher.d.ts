import { QueuePublisher } from "../../abstract/QueuePublisher";
import { Container } from "inversify";
import { Process } from "../../../runtime";
export declare class GCPSPublisher extends QueuePublisher implements Process {
    private client;
    constructor(serviceAccountEmail: string, keyId: string, privateKey: string);
    isHealthy(): boolean;
    publish<Q extends {}>(queueName: string, eventName: string, messages: Q | Array<Q>): Promise<void>;
    shutdown(container: Container): Promise<void>;
    startup(container: Container): Promise<void>;
}
