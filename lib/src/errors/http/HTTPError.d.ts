import { StrontiumError } from "../StrontiumError";
export declare abstract class HTTPError extends StrontiumError {
    statusCode: number;
    externalMessage: string;
    internalMessage?: string | undefined;
    constructor(statusCode: number, externalMessage: string, internalMessage?: string | undefined);
    toResponseBody(): {
        statusCode: number;
        errorMessage: string;
    };
}
