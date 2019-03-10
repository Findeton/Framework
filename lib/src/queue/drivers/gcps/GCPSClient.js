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
const axios_1 = require("axios");
const cryptography_1 = require("../../../cryptography");
class GCPSClient {
    constructor(serviceAccountEmail, keyId, privateKey) {
        this.serviceAccountEmail = serviceAccountEmail;
        this.keyId = keyId;
        this.privateKey = privateKey;
        let sanitizedPrivateKey = privateKey.replace(/\\n/g, `
`);
        this.signer = new cryptography_1.AsymmetricJWTSigner(new cryptography_1.RSASHA256Signer(new Buffer(""), new Buffer(sanitizedPrivateKey)), "RS256", keyId);
    }
    signRequest(audience) {
        return __awaiter(this, void 0, void 0, function* () {
            let currentUnixTimestamp = Math.round(new Date().getTime() / 1000);
            return this.signer.sign({
                iss: this.serviceAccountEmail,
                sub: this.serviceAccountEmail,
                aud: audience,
                iat: currentUnixTimestamp,
                exp: currentUnixTimestamp + 3600,
            });
        });
    }
    publish(topic, messages) {
        return __awaiter(this, void 0, void 0, function* () {
            yield axios_1.default.post(`https://pubsub.googleapis.com/v1/${topic}:publish`, {
                messages: messages.map((m) => ({
                    attributes: m.attributes,
                    data: Buffer.from(JSON.stringify(m.data)).toString("base64"),
                })),
            }, {
                headers: {
                    Authorization: `Bearer ${yield this.signRequest("https://pubsub.googleapis.com/google.pubsub.v1.Publisher")}`,
                },
            });
        });
    }
    getSubscriptionData(subscriptionName) {
        return __awaiter(this, void 0, void 0, function* () {
            let subscriptionResp = yield axios_1.default.get(`https://pubsub.googleapis.com/v1/${subscriptionName}`, {
                headers: {
                    Authorization: `Bearer ${yield this.signRequest("https://pubsub.googleapis.com/google.pubsub.v1.Subscriber")}`,
                },
            });
            return subscriptionResp.data;
        });
    }
    pullTasks(subscriptionName, maxMessages = 10, returnImmediately = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let taskResp = yield axios_1.default.post(`https://pubsub.googleapis.com/v1/${subscriptionName}:pull`, {
                returnImmediately: returnImmediately,
                maxMessages: maxMessages,
            }, {
                headers: {
                    Authorization: `Bearer ${yield this.signRequest("https://pubsub.googleapis.com/google.pubsub.v1.Subscriber")}`,
                },
                timeout: 120 * 1000,
            });
            return taskResp.data.receivedMessages
                ? taskResp.data.receivedMessages.map((m) => {
                    return {
                        ackId: m.ackId,
                        message: {
                            attributes: m.attributes,
                            data: JSON.parse(Buffer.from(m.message.data, "base64").toString()),
                        },
                    };
                })
                : [];
        });
    }
    modifyAckDeadline(subscriptionName, ackIds, ackExtensionSeconds) {
        return __awaiter(this, void 0, void 0, function* () {
            yield axios_1.default.post(`https://pubsub.googleapis.com/v1/${subscriptionName}:modifyAckDeadline`, {
                ackIds: ackIds,
                ackDeadlineSeconds: ackExtensionSeconds,
            }, {
                headers: {
                    Authorization: `Bearer ${yield this.signRequest("https://pubsub.googleapis.com/google.pubsub.v1.Subscriber")}`,
                },
            });
        });
    }
    acknowledge(subscriptionName, ackIds) {
        return __awaiter(this, void 0, void 0, function* () {
            yield axios_1.default.post(`https://pubsub.googleapis.com/v1/${subscriptionName}:acknowledge`, {
                ackIds: ackIds,
            }, {
                headers: {
                    Authorization: `Bearer ${yield this.signRequest("https://pubsub.googleapis.com/google.pubsub.v1.Subscriber")}`,
                },
            });
        });
    }
}
exports.GCPSClient = GCPSClient;
//# sourceMappingURL=GCPSClient.js.map