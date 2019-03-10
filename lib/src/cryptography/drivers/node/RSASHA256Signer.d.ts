/// <reference types="node" />
import { AsymmetricSigner } from "../../abstract/AsymmetricSigner";
export declare class RSASHA256Signer extends AsymmetricSigner {
    publicKey: Buffer;
    privateKey?: Buffer | undefined;
    private algorithm;
    private signer;
    constructor(publicKey: Buffer, privateKey?: Buffer | undefined, algorithm?: "RS256" | "PS256");
    sign(plaintext: Buffer): Promise<Buffer>;
    verify(plaintext: Buffer, signature: Buffer): Promise<Buffer>;
}
