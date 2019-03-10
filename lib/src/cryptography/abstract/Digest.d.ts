/// <reference types="node" />
export declare abstract class Digest {
    abstract calculate(input: Buffer): Promise<Buffer>;
}
