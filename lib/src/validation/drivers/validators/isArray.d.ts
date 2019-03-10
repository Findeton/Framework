import { ValidatorFunction, ValidatorOutput } from "../..";
export declare const isArray: <V extends ValidatorFunction<any, any>>(innerValidator: V) => (input: unknown) => Promise<ValidatorOutput<unknown, V>[]>;
