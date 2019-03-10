import { ValidatorFunction } from "../..";
export declare const isOptional: <V extends ValidatorFunction<I, O>, I, O>(validator: V) => ValidatorFunction<I, O | undefined>;
