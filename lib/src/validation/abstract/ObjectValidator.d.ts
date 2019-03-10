import { ValidatorFunction, ValidatorOutput } from "./ValidatorFunction";
export declare type ObjectValidator = {
    [key: string]: ValidatorFunction<any, any>;
} & Object;
export declare type ValidatedObject<O extends ObjectValidator> = {
    [P in keyof O]: ValidatorOutput<unknown, O[P]>;
};
