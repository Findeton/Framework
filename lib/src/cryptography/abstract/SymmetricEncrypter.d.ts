/// <reference types="node" />
export declare abstract class SymmetricEncrypter {
    protected secretKey: Buffer;
    constructor(secretKey: Buffer);
    abstract encrypt(plaintext: Buffer): Promise<Buffer>;
    abstract decrypt(ciphertext: Buffer): Promise<Buffer>;
}
