import { ObjectValidator, ValidatedObject, ValidatorFunction, ValidatorOutput } from "../../validation";
export declare abstract class EndpointController {
    abstract inputValidator: {
        body: ValidatorFunction<unknown, any>;
        headers: ObjectValidator;
        query: ObjectValidator;
        params: ObjectValidator;
        meta: ObjectValidator;
    };
    abstract outputValidator: ValidatorFunction<any, any>;
    abstract handle(input: any): Promise<any>;
}
export declare type ControllerInput<E extends EndpointController> = {
    body: ValidatorOutput<unknown, E["inputValidator"]["body"]>;
    headers: ValidatedObject<E["inputValidator"]["headers"]>;
    query: ValidatedObject<E["inputValidator"]["query"]>;
    params: ValidatedObject<E["inputValidator"]["params"]>;
    meta: ValidatedObject<E["inputValidator"]["meta"]>;
};
export declare type ControllerOutput<E extends EndpointController> = ValidatorOutput<unknown, E["outputValidator"]>;
