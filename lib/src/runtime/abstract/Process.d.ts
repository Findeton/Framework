import { Container } from "inversify";
export interface Process {
    startup(container: Container): Promise<void>;
    shutdown(container: Container): Promise<void>;
    isHealthy(): boolean;
}
export declare const isProcess: (p: any) => p is Process;
