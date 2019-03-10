import { Container } from "inversify";
import { Process } from "../../runtime";
import { ObjectValidator, ValidatedObject } from "../../validation";
export declare class Environment<O extends ObjectValidator> implements Process {
    private validator;
    private validatedEnvironment?;
    constructor(validator: O);
    getKey<K extends keyof ValidatedObject<O>>(key: K): ValidatedObject<O>[K];
    isHealthy(): boolean;
    startup(container: Container): Promise<void>;
    shutdown(container: Container): Promise<void>;
}
