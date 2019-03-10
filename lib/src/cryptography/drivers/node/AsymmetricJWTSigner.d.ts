import { AsymmetricSigner } from "../../abstract/AsymmetricSigner";
import { JWTSigner } from "../../abstract/JWTSigner";
export declare class AsymmetricJWTSigner extends JWTSigner {
    private signer;
    private algorithmCode;
    private keyId?;
    constructor(signer: AsymmetricSigner, algorithmCode: string, keyId?: string | undefined);
    sign(claim: any): Promise<string>;
    verify(token: string): Promise<unknown>;
}
