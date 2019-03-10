/// <reference types="validator" />
import NormalizeEmailOptions = ValidatorJS.NormalizeEmailOptions;
export declare const normalizeEmail: (options?: NormalizeEmailOptions | undefined) => <I>(input: I) => string;
