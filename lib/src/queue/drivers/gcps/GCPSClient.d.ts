export interface GCPSMessage {
    data: any;
    attributes: {
        [key: string]: string;
    };
}
export interface GCPSSubscription {
    name: string;
    topic: string;
    pushConfig: {
        pushEndpoint?: string;
    };
    ackDeadlineSeconds: number;
    retainAckedMessages: boolean;
    messageRetentionDuration: string;
}
export declare class GCPSClient {
    private serviceAccountEmail;
    private keyId;
    private privateKey;
    private signer;
    constructor(serviceAccountEmail: string, keyId: string, privateKey: string);
    signRequest(audience: "https://pubsub.googleapis.com/google.pubsub.v1.Publisher" | "https://pubsub.googleapis.com/google.pubsub.v1.Subscriber"): Promise<string>;
    publish(topic: string, messages: Array<GCPSMessage>): Promise<void>;
    getSubscriptionData(subscriptionName: string): Promise<GCPSSubscription>;
    pullTasks(subscriptionName: string, maxMessages?: number, returnImmediately?: boolean): Promise<Array<{
        ackId: string;
        message: GCPSMessage;
    }>>;
    modifyAckDeadline(subscriptionName: string, ackIds: Array<string>, ackExtensionSeconds: number): Promise<void>;
    acknowledge(subscriptionName: string, ackIds: Array<string>): Promise<void>;
}
