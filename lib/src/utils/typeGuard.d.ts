export declare type TypeGuard<T, V extends T> = (val: T) => val is V;
export declare function notMissing<T>(input: T): input is Exclude<T, null | undefined>;
