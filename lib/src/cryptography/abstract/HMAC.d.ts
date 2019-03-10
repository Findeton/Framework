/// <reference types="node" />
import { Digest } from "./Digest";
export declare abstract class HMAC extends Digest {
    protected secretKey: Buffer;
    constructor(secretKey: Buffer);
}
