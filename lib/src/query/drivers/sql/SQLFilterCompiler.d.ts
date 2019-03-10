import { FilterCompiler } from "../..";
export declare const compileSQLFilter: FilterCompiler<[string, Array<any>]>;
export declare const concatQueryStringsWithConjunction: (queries: [string, any[]][], conjunction: "AND" | "OR") => [string, any[]];
