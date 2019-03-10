import { Process } from "../abstract/Process";
export declare class Runtime implements Process {
    private processes;
    private container;
    constructor(processes: Array<Process>);
    startup(): Promise<void>;
    shutdown(): Promise<void>;
    isHealthy(): boolean;
}
