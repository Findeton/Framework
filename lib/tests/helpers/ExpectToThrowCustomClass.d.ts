import { ConstructorOf } from "../../src/utils/types";
export declare const expectToThrowCustomClass: (candidateFunction: Function, classContructor: ConstructorOf<any>) => void;
export declare const expectToThrowCustomClassAsync: (candidateFunction: Function, classContructor: ConstructorOf<any>) => Promise<void>;
