export declare abstract class JWTSigner {
    abstract sign(claim: any): Promise<string>;
    abstract verify(token: string): Promise<unknown>;
}
