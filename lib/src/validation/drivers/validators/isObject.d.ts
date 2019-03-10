import { ObjectValidator, ValidatedObject } from "../..";
export declare const isObject: <V extends ObjectValidator>(validator: V) => (i: unknown) => Promise<ValidatedObject<V>>;
