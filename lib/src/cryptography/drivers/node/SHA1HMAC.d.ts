/// <reference types="node" />
import { HMAC } from "../../abstract/HMAC";
export declare class SHA1HMAC extends HMAC {
    calculate(input: Buffer): Promise<Buffer>;
}
