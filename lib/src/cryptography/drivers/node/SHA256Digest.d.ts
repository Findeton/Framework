/// <reference types="node" />
import { Digest } from "../../abstract/Digest";
export declare class SHA256Digest extends Digest {
    calculate(input: Buffer): Promise<Buffer>;
}
