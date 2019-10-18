"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let assert = require('chai').assert;
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_services_email_node_1 = require("pip-services-email-node");
const pip_services_email_node_2 = require("pip-services-email-node");
const EmailGrpcClientV1_1 = require("../../src/version1/EmailGrpcClientV1");
const EmailClientFixtureV1_1 = require("./EmailClientFixtureV1");
var httpConfig = pip_services3_commons_node_2.ConfigParams.fromTuples("connection.protocol", "http", "connection.host", "localhost", "connection.port", 3000);
suite('EmailGrpcClientV1', () => {
    let service;
    let client;
    let fixture;
    suiteSetup((done) => {
        let logger = new pip_services3_components_node_1.ConsoleLogger();
        let controller = new pip_services_email_node_1.EmailController();
        controller.configure(pip_services3_commons_node_2.ConfigParams.fromTuples("options.disabled", true));
        service = new pip_services_email_node_2.EmailGrpcServiceV1();
        service.configure(httpConfig);
        let references = pip_services3_commons_node_3.References.fromTuples(new pip_services3_commons_node_1.Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger, new pip_services3_commons_node_1.Descriptor('pip-services-email', 'controller', 'default', 'default', '1.0'), controller, new pip_services3_commons_node_1.Descriptor('pip-services-email', 'service', 'grpc', 'default', '1.0'), service);
        controller.setReferences(references);
        service.setReferences(references);
        client = new EmailGrpcClientV1_1.EmailGrpcClientV1();
        client.setReferences(references);
        client.configure(httpConfig);
        fixture = new EmailClientFixtureV1_1.EmailClientFixtureV1(client);
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
//# sourceMappingURL=EmailGrpcClientV1.test.js.map