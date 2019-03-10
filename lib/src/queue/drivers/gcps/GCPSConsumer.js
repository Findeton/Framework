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
const TransientError_1 = require("../../../errors/TransientError");
const inversify_1 = require("inversify");
const lodash_1 = require("lodash");
const logging_1 = require("../../../logging");
class GCPSConsumer {
    constructor(serviceAccountEmail, keyId, privateKey, subscriptionName, taskHandler, prefetchCount = 15) {
        this.subscriptionName = subscriptionName;
        this.taskHandler = taskHandler;
        this.prefetchCount = prefetchCount;
        this.isEnabled = false;
        this.ackDeadlineSeconds = 0;
        this.client = new GCPSClient_1.GCPSClient(serviceAccountEmail, keyId, privateKey);
    }
    isHealthy() {
        return this.isEnabled;
    }
    shutdown(container) {
        return __awaiter(this, void 0, void 0, function* () {
            this.isEnabled = false;
            this.logger = undefined;
        });
    }
    startup(container) {
        return __awaiter(this, void 0, void 0, function* () {
            this.isEnabled = true;
            if (container.isBound(logging_1.Logger)) {
                this.logger = container.get(logging_1.Logger);
            }
            let subscription = yield this.client.getSubscriptionData(this.subscriptionName);
            if (!lodash_1.isEmpty(subscription.pushConfig)) {
                throw new Error("The Strontium GCPS Consumer does not support Push based GCPS subscriptions. " +
                    "Please change the subscription inside Google Cloud Platform to operate on a Pull Based model if you wish " +
                    "to use this queue processor.");
            }
            this.ackDeadlineSeconds = subscription.ackDeadlineSeconds;
            this.pollAndExecute(container);
            return;
        });
    }
    ack(ackId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.acknowledge(this.subscriptionName, [ackId]);
        });
    }
    nack(ackId, requeue = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (requeue) {
                return this.client.modifyAckDeadline(this.subscriptionName, [ackId], 0);
            }
            else {
                return this.ack(ackId);
            }
        });
    }
    extendAck(ackId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.modifyAckDeadline(this.subscriptionName, [ackId], this.ackDeadlineSeconds);
        });
    }
    pollAndExecute(container) {
        return __awaiter(this, void 0, void 0, function* () {
            while (this.isEnabled) {
                let messages = yield this.client.pullTasks(this.subscriptionName, this.prefetchCount, false);
                yield Promise.all(messages.map((m) => __awaiter(this, void 0, void 0, function* () {
                    return this.executeTask(m.ackId, {
                        message: m.message.data,
                    }, container);
                })));
            }
        });
    }
    executeTask(ackId, task, applicationContainer) {
        return __awaiter(this, void 0, void 0, function* () {
            let requestContainer = new inversify_1.Container({
                autoBindInjectable: true,
                skipBaseClassChecks: true,
            });
            requestContainer.parent = applicationContainer;
            let handlerType = this.taskHandler;
            if (this.logger) {
                this.logger.info(`[GCPS - TASK - START] Event received by Consumer for topic.`, {
                    subscription: this.subscriptionName,
                });
            }
            if (handlerType === undefined) {
                if (this.logger) {
                    this.logger.error(`[GCPS - TASK - NO_IMPLEMENTATION_FAIL] No implementation found for topic.`, {
                        subscription: this.subscriptionName,
                    });
                }
                yield this.nack(ackId);
                return;
            }
            let requestHandler = requestContainer.get(handlerType);
            let ackInterval = setInterval(() => {
                this.extendAck(ackId);
            }, this.ackDeadlineSeconds * 1000);
            try {
                let validatedMessage = yield requestHandler.inputValidator(task.message);
                yield requestHandler.handle(validatedMessage);
                yield this.ack(ackId);
                if (this.logger) {
                    this.logger.info(`[GCPS - TASK - SUCCESS] Event successfully completed by Consumer.`, {
                        subscription: this.subscriptionName,
                    });
                }
            }
            catch (e) {
                if (e instanceof TransientError_1.TransientError) {
                    if (this.logger) {
                        this.logger.error("[GCPS - TASK - TRANSIENT_FAIL] Task failed with transient error. Attempting to reschedule execution.", e);
                    }
                    yield this.nack(ackId, true);
                }
                else {
                    if (this.logger) {
                        this.logger.error("[GCPS - TASK - PERMANENT_FAIL] Task failed with permanent error.", e);
                    }
                    yield this.nack(ackId);
                }
            }
            finally {
                clearInterval(ackInterval);
            }
        });
    }
}
exports.GCPSConsumer = GCPSConsumer;
//# sourceMappingURL=GCPSConsumer.js.map