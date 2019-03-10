/// <reference types="node" />
export declare abstract class AsymmetricSigner {
    protected publicKey: Buffer;
    protected privateKey?: Buffer | undefined;
    constructor(publicKey: Buffer, privateKey?: Buffer | undefined);
    abstract sign(plaintext: Buffer): Promise<Buffer>;
    abstract verify(plaintext: Buffer, signature: Buffer): Promise<Buffer>;
}
