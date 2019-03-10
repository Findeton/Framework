export declare type FilterObject<T> = {
    [P in keyof T]?: FieldFilter<P, T>;
};
export declare type FieldFilter<P extends keyof T, T> = {
    $in?: Array<T[P]>;
    $nin?: Array<T[P]>;
    $neq?: T[P] | null;
    $gt?: T[P];
    $gte?: T[P];
    $lt?: T[P];
    $lte?: T[P];
} | T[P];
export declare type Filter<T> = {
    $and?: Array<Filter<T>>;
    $or?: Array<Filter<T>>;
} & FilterObject<T>;
