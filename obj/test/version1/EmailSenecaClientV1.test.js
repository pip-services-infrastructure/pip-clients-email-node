"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let assert = require('chai').assert;
let async = require('async');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_email_node_1 = require("pip-services-email-node");
const pip_services_email_node_2 = require("pip-services-email-node");
const EmailSenecaClientV1_1 = require("../../src/version1/EmailSenecaClientV1");
const EmailClientFixtureV1_1 = require("./EmailClientFixtureV1");
let senecaConfig = pip_services_commons_node_2.ConfigParams.fromTuples("connection.protocol", "none");
suite('EmailSenecaClient', () => {
    let service;
    let client;
    let fixture;
    suiteSetup((done) => {
        let logger = new pip_services_commons_node_4.ConsoleLogger();
        let controller = new pip_services_email_node_1.EmailController();
        controller.configure(new pip_services_commons_node_2.ConfigParams());
        service = new pip_services_email_node_2.EmailSenecaServiceV1();
        service.configure(senecaConfig);
        let seneca = new pip_services_net_node_1.SenecaInstance();
        let references = pip_services_commons_node_3.References.fromTuples(new pip_services_commons_node_1.Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger, new pip_services_commons_node_1.Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), seneca, new pip_services_commons_node_1.Descriptor('pip-services-email', 'controller', 'default', 'default', '1.0'), controller, new pip_services_commons_node_1.Descriptor('pip-services-email', 'service', 'seneca', 'default', '1.0'), service);
        seneca.setReferences(references);
        controller.setReferences(references);
        service.setReferences(references);
        client = new EmailSenecaClientV1_1.EmailSenecaClientV1();
        client.configure(senecaConfig);
        client.setReferences(references);
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
//# sourceMappingURL=EmailSenecaClientV1.test.js.map