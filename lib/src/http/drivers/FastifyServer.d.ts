import { RouterMap } from "../abstract/RouterMap";
import * as Fastify from "fastify";
import { Container } from "inversify";
import { Process } from "../../runtime";
import { ConstructorOf } from "../../utils/types";
import { EndpointController } from "..";
export declare class FastifyServer implements Process {
    routes: RouterMap;
    private port;
    private host;
    protected server: Fastify.FastifyInstance;
    private isAlive;
    constructor(routes: RouterMap, port?: number, host?: string);
    isHealthy(): boolean;
    shutdown(container: Container): Promise<void>;
    startup(container: Container): Promise<void>;
    protected getMiddleware(container: Container): Array<Fastify.Middleware<any, any, any>>;
    protected getPlugins(container: Container): Array<Fastify.Plugin<any, any, any, any>>;
    protected getRequestMetadata: (request: Fastify.FastifyRequest<any, any, any, any, any>) => {
        [key: string]: any;
    };
    protected requestHandler(controller: ConstructorOf<EndpointController>, path: string, method: string): (request: Fastify.FastifyRequest<any, any, any, any, any>, response: Fastify.FastifyReply<any>) => Promise<any>;
}
