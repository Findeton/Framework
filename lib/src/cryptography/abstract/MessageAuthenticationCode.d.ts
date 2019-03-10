/// <reference types="node" />
export declare abstract class MessageAuthenticationCode {
    protected secretKey: Buffer;
    constructor(secretKey: Buffer);
    abstract calculate(input: Buffer): Promise<Buffer>;
}
