export declare type ValidatorFunction<I, O> = (input: I) => O | Promise<O>;
export declare type ValidatorOutput<I, P extends ValidatorFunction<I, any>> = P extends ValidatorFunction<I, infer O> ? O : ReturnType<P>;
export declare type ValidatorInput<P extends ValidatorFunction<any, any>> = P extends ValidatorFunction<infer I, any> ? I : ReturnType<P>;
