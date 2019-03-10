"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../errors");
const errors_2 = require("../../errors");
const errors_3 = require("../../errors");
const Fastify = require("fastify");
const inversify_1 = require("inversify");
const logging_1 = require("../../logging");
const validation_1 = require("../../validation");
class FastifyServer {
    constructor(routes, port = 8080, host = "127.0.0.1") {
        this.routes = routes;
        this.port = port;
        this.host = host;
        this.server = Fastify();
        this.isAlive = false;
        this.getRequestMetadata = (request) => ({});
        for (let route of routes) {
            switch (route.method) {
                case "GET":
                    this.server.get(route.route, this.requestHandler(route.endpointController, route.route, "GET"));
                    break;
                case "POST":
                    this.server.post(route.route, this.requestHandler(route.endpointController, route.route, "POST"));
                    break;
                case "PATCH":
                    this.server.patch(route.route, this.requestHandler(route.endpointController, route.route, "PATCH"));
                    break;
                case "PUT":
                    this.server.put(route.route, this.requestHandler(route.endpointController, route.route, "PUT"));
                    break;
                case "DELETE":
                    this.server.delete(route.route, this.requestHandler(route.endpointController, route.route, "DELETE"));
                    break;
                case "OPTIONS":
                    this.server.options(route.route, this.requestHandler(route.endpointController, route.route, "OPTIONS"));
                    break;
            }
        }
    }
    isHealthy() {
        return this.isAlive;
    }
    shutdown(container) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise((resolve) => {
                this.server.close(resolve);
            });
            this.isAlive = false;
        });
    }
    startup(container) {
        return __awaiter(this, void 0, void 0, function* () {
            this.server.decorateRequest("container", container);
            let plugins = this.getPlugins(container);
            for (let p of plugins) {
                this.server.register(p);
            }
            let middleware = this.getMiddleware(container);
            for (let m of middleware) {
                this.server.use(m);
            }
            yield this.server.listen(this.port, this.host);
            this.isAlive = true;
            let loggerInstance = container.get(logging_1.Logger);
            if (loggerInstance) {
                loggerInstance.info(`Fastify HTTP Server started on port ${this.server.server.address().port}`, this.server.server.address());
            }
        });
    }
    getMiddleware(container) {
        return [];
    }
    getPlugins(container) {
        return [];
    }
    requestHandler(controller, path, method) {
        return (request, response) => __awaiter(this, void 0, void 0, function* () {
            let applicationContainer = request.container;
            let requestContainer = new inversify_1.Container({
                autoBindInjectable: true,
                skipBaseClassChecks: true,
            });
            requestContainer.parent = applicationContainer;
            requestContainer.bind("request").toConstantValue(request);
            requestContainer.bind("response").toConstantValue(response);
            let endpointController = requestContainer.get(controller);
            if (endpointController === undefined) {
                throw new errors_2.InvalidControllerError(path);
            }
            let inputValidatorSchema = endpointController.inputValidator;
            let validatedInput;
            let rawResponse;
            try {
                let validator = validation_1.isObject({
                    body: inputValidatorSchema.body,
                    headers: validation_1.isObject(inputValidatorSchema.headers),
                    query: validation_1.isObject(inputValidatorSchema.query),
                    params: validation_1.isObject(inputValidatorSchema.params),
                    meta: validation_1.isObject(inputValidatorSchema.meta),
                });
                validatedInput = yield validator({
                    body: method === "GET" ? undefined : request.body,
                    headers: request.headers,
                    query: request.query,
                    params: request.params,
                    meta: this.getRequestMetadata(request),
                });
                rawResponse = yield endpointController.handle(validatedInput);
            }
            catch (e) {
                if (e instanceof errors_1.HTTPError) {
                    response.code(e.statusCode);
                    return e.toResponseBody();
                }
                else {
                    let logger = requestContainer.get(logging_1.Logger);
                    if (logger) {
                        logger.error("[HTTP - REQUEST - FAILED]", e);
                    }
                    let publicError = new errors_3.InternalServerError();
                    response.code(publicError.statusCode);
                    return publicError.toResponseBody();
                }
            }
            try {
                let validatedOutput = yield endpointController.outputValidator(rawResponse);
                if (validatedOutput === undefined) {
                    return response.send();
                }
                return validatedOutput;
            }
            catch (e) {
                let logger = requestContainer.get(logging_1.Logger);
                if (logger) {
                    logger.error(`[HTTP - VALIDATION - FAILED] An error occurred validating the output of ${controller.name}. Check that you are returning the correct value.`, e);
                }
                let publicError = new errors_3.InternalServerError();
                response.code(publicError.statusCode);
                return publicError.toResponseBody();
            }
        });
    }
}
exports.FastifyServer = FastifyServer;
//# sourceMappingURL=FastifyServer.js.map