import { EndpointController } from "./EndpointController";
import { ConstructorOf } from "../../utils/types";
export declare type RouterMap = Array<{
    method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE" | "OPTIONS";
    route: string;
    endpointController: ConstructorOf<EndpointController>;
}>;
