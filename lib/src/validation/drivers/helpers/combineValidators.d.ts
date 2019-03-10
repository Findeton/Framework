import { ValidatorFunction } from "../../abstract/ValidatorFunction";
export declare function combineValidators<I, O1, O2>(V1: ValidatorFunction<I, O1>, V2: ValidatorFunction<O1, O2>): ValidatorFunction<I, O2>;
export declare function combineValidators<I, O1, O2, O3>(V1: ValidatorFunction<I, O1>, V2: ValidatorFunction<O1, O2>, V3: ValidatorFunction<O2, O3>): ValidatorFunction<I, O3>;
export declare function combineValidators<I, O1, O2, O3, O4>(V1: ValidatorFunction<I, O1>, V2: ValidatorFunction<O1, O2>, V3: ValidatorFunction<O2, O3>, V4: ValidatorFunction<O3, O4>): ValidatorFunction<I, O4>;
export declare function combineValidators<I, O1, O2, O3, O4, O5>(V1: ValidatorFunction<I, O1>, V2: ValidatorFunction<O1, O2>, V3: ValidatorFunction<O2, O3>, V4: ValidatorFunction<O3, O4>, V5: ValidatorFunction<O4, O5>): ValidatorFunction<I, O5>;
