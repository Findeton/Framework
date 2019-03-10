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
const GCPSClient_1 = require("./GCPSClient");
const QueuePublisher_1 = require("../../abstract/QueuePublisher");
class GCPSPublisher extends QueuePublisher_1.QueuePublisher {
    constructor(serviceAccountEmail, keyId, privateKey) {
        super();
        this.client = new GCPSClient_1.GCPSClient(serviceAccountEmail, keyId, privateKey);
    }
    isHealthy() {
        return true;
    }
    publish(queueName, eventName, messages) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(messages)) {
                messages = [messages];
            }
            return this.client.publish(queueName, messages.map((m) => ({
                attributes: {
                    STRONTIUM_EVENT_NAME: eventName,
                },
                data: m,
            })));
        });
    }
    shutdown(container) {
        return __awaiter(this, void 0, void 0, function* () {
            container.unbind(QueuePublisher_1.QueuePublisher);
            container.unbind(GCPSPublisher);
        });
    }
    startup(container) {
        return __awaiter(this, void 0, void 0, function* () {
            container.bind(QueuePublisher_1.QueuePublisher).toConstantValue(this);
            container.bind(GCPSPublisher).toConstantValue(this);
        });
    }
}
exports.GCPSPublisher = GCPSPublisher;
//# sourceMappingURL=GCPSPublisher.js.map