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
const chai_1 = require("chai");
const queue_1 = require("../../../src/queue");
describe("GCPSClient", () => {
    const client = new queue_1.GCPSClient(process.env.GCPS_SERVICE_ACCOUNT_EMAIL, process.env.GCPS_SERVICE_ACCOUNT_KEY_ID, process.env.GCPS_SERVICE_ACCOUNT_PRIVATE_KEY);
    before(function () {
        if (process.env.CI !== "true" ||
            isNaN(Number(process.env.TRAVIS_PULL_REQUEST))) {
            this.skip();
        }
    });
    beforeEach(function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.timeout(5000);
            let messages = yield client.pullTasks("projects/strontium-tests/subscriptions/strontiumIntegrationTest", 1000, true);
            if (messages.length > 0) {
                yield client.acknowledge("projects/strontium-tests/subscriptions/strontiumIntegrationTest", messages.map((m) => m.ackId));
            }
        });
    });
    it("Should publish a message and correctly reconstruct it", () => __awaiter(this, void 0, void 0, function* () {
        yield client.publish("projects/strontium-tests/topics/integrationTestTopic", [
            {
                data: "MY-INTEGRATION-TEST",
                attributes: {},
            },
        ]);
        let messages = yield client.pullTasks("projects/strontium-tests/subscriptions/strontiumIntegrationTest", 1, true);
        chai_1.expect(messages[0].message.data).to.equal("MY-INTEGRATION-TEST");
        yield client.acknowledge("projects/strontium-tests/subscriptions/strontiumIntegrationTest", [messages[0].ackId]);
    })).timeout(5000);
    it("Acking a message should remove it from the queue", () => __awaiter(this, void 0, void 0, function* () {
        yield client.publish("projects/strontium-tests/topics/integrationTestTopic", [
            {
                data: "MY-INTEGRATION-TEST",
                attributes: {},
            },
        ]);
        let messages = yield client.pullTasks("projects/strontium-tests/subscriptions/strontiumIntegrationTest", 1, true);
        chai_1.expect(messages[0].message.data).to.equal("MY-INTEGRATION-TEST");
        yield client.acknowledge("projects/strontium-tests/subscriptions/strontiumIntegrationTest", [messages[0].ackId]);
        let secondMessages = yield client.pullTasks("projects/strontium-tests/subscriptions/strontiumIntegrationTest", 1, true);
        chai_1.expect(secondMessages.length).to.equal(0);
    })).timeout(5000);
    it("Nacking a message should readd it to the queue", () => __awaiter(this, void 0, void 0, function* () {
        yield client.publish("projects/strontium-tests/topics/integrationTestTopic", [
            {
                data: "NACKED-MESSAGE",
                attributes: {},
            },
        ]);
        let messages = yield client.pullTasks("projects/strontium-tests/subscriptions/strontiumIntegrationTest", 1, true);
        chai_1.expect(messages[0].message.data).to.equal("NACKED-MESSAGE");
        yield client.modifyAckDeadline("projects/strontium-tests/subscriptions/strontiumIntegrationTest", [messages[0].ackId], 0);
        let secondMessages = yield client.pullTasks("projects/strontium-tests/subscriptions/strontiumIntegrationTest", 1, true);
        chai_1.expect(secondMessages[0].message.data).to.equal("NACKED-MESSAGE");
        yield client.acknowledge("projects/strontium-tests/subscriptions/strontiumIntegrationTest", [secondMessages[0].ackId]);
    })).timeout(5000);
    it("Should fetch a GCPS Subscription", () => __awaiter(this, void 0, void 0, function* () {
        let subscription = yield client.getSubscriptionData("projects/strontium-tests/subscriptions/strontiumIntegrationTest");
        chai_1.expect(subscription.pushConfig).to.deep.equal({});
        chai_1.expect(subscription.ackDeadlineSeconds).to.equal(10);
    }));
});
//# sourceMappingURL=GCPSClient.spec.js.map