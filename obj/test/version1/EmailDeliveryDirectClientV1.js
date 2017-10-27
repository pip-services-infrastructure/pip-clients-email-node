"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let assert = require('chai').assert;
let async = require('async');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_emaildelivery_node_1 = require("pip-services-emaildelivery-node");
const EmailDeliveryDirectClientV1_1 = require("../../src/version1/EmailDeliveryDirectClientV1");
const EmailDeliveryClientFixtureV1_1 = require("./EmailDeliveryClientFixtureV1");
suite('EmailDeliveryDirectClientV1', () => {
    let client;
    let fixture;
    suiteSetup((done) => {
        let logger = new pip_services_commons_node_4.ConsoleLogger();
        let controller = new pip_services_emaildelivery_node_1.EmailDeliveryController();
        controller.configure(new pip_services_commons_node_2.ConfigParams());
        let references = pip_services_commons_node_3.References.fromTuples(new pip_services_commons_node_1.Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger, new pip_services_commons_node_1.Descriptor('pip-services-emaildelivery', 'controller', 'default', 'default', '1.0'), controller);
        controller.setReferences(references);
        client = new EmailDeliveryDirectClientV1_1.EmailDeliveryDirectClientV1();
        client.setReferences(references);
        fixture = new EmailDeliveryClientFixtureV1_1.EmailDeliveryClientFixtureV1(client);
        client.open(null, done);
    });
    suiteTeardown((done) => {
        client.close(null, done);
    });
    test('Send Email to Address', (done) => {
        fixture.testSendEmailToAddress(done);
    });
    test('Send Email to Recipients', (done) => {
        fixture.testSendEmailToRecipients(done);
    });
});
//# sourceMappingURL=EmailDeliveryDirectClientV1.js.map