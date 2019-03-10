import { HTTPError } from "./HTTPError";
export declare class ValidationError extends HTTPError {
    constraintName: string;
    fieldPath?: string | undefined;
    constructor(constraintName: string, internalMessage: string, externalMessage?: string, fieldPath?: string | undefined);
    toResponseBody(): {
        statusCode: number;
        errorMessage: string;
        path?: string;
    };
}
