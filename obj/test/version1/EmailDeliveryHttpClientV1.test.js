"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let assert = require('chai').assert;
let async = require('async');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_emaildelivery_node_1 = require("pip-services-emaildelivery-node");
const pip_services_emaildelivery_node_2 = require("pip-services-emaildelivery-node");
const EmailDeliveryHttpClientV1_1 = require("../../src/version1/EmailDeliveryHttpClientV1");
const EmailDeliveryClientFixtureV1_1 = require("./EmailDeliveryClientFixtureV1");
var httpConfig = pip_services_commons_node_2.ConfigParams.fromTuples("connection.protocol", "http", "connection.host", "localhost", "connection.port", 3000);
suite('EmailDeliveryHttpClientV1', () => {
    let service;
    let client;
    let fixture;
    suiteSetup((done) => {
        let logger = new pip_services_commons_node_4.ConsoleLogger();
        let controller = new pip_services_emaildelivery_node_1.EmailDeliveryController();
        controller.configure(new pip_services_commons_node_2.ConfigParams());
        service = new pip_services_emaildelivery_node_2.EmailDeliveryHttpServiceV1();
        service.configure(httpConfig);
        let references = pip_services_commons_node_3.References.fromTuples(new pip_services_commons_node_1.Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger, new pip_services_commons_node_1.Descriptor('pip-services-emaildelivery', 'controller', 'default', 'default', '1.0'), controller, new pip_services_commons_node_1.Descriptor('pip-services-emaildelivery', 'service', 'http', 'default', '1.0'), service);
        controller.setReferences(references);
        service.setReferences(references);
        client = new EmailDeliveryHttpClientV1_1.EmailDeliveryHttpClientV1();
        client.setReferences(references);
        client.configure(httpConfig);
        fixture = new EmailDeliveryClientFixtureV1_1.EmailDeliveryClientFixtureV1(client);
        service.open(null, (err) => {
            client.open(null, done);
        });
    });
    suiteTeardown((done) => {
        client.close(null);
        service.close(null, done);
    });
    test('Send Email to Address', (done) => {
        fixture.testSendEmailToAddress(done);
    });
    test('Send Email to Recipients', (done) => {
        fixture.testSendEmailToRecipients(done);
    });
});
//# sourceMappingURL=EmailDeliveryHttpClientV1.test.js.map