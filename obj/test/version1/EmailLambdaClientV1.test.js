"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let process = require('process');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const EmailClientFixtureV1_1 = require("./EmailClientFixtureV1");
const EmailLambdaClientV1_1 = require("../../src/version1/EmailLambdaClientV1");
suite('EmailLambdaClient', () => {
    let AWS_LAMDBA_ARN = process.env["AWS_LAMDBA_ARN"] || "";
    let AWS_ACCESS_ID = process.env["AWS_ACCESS_ID"] || "";
    let AWS_ACCESS_KEY = process.env["AWS_ACCESS_KEY"] || "";
    if (!AWS_LAMDBA_ARN || !AWS_ACCESS_ID || !AWS_ACCESS_KEY)
        return;
    let config = pip_services3_commons_node_1.ConfigParams.fromTuples('connection.protocol', 'aws', 'connection.arn', AWS_LAMDBA_ARN, 'credential.access_id', AWS_ACCESS_ID, 'credential.access_key', AWS_ACCESS_KEY);
    let client;
    let fixture;
    setup((done) => {
        client = new EmailLambdaClientV1_1.EmailLambdaClientV1();
        client.configure(config);
        fixture = new EmailClientFixtureV1_1.EmailClientFixtureV1(client);
        client.open(null, done);
    });
    teardown((done) => {
        client.close(null, done);
    });
    test('Send Email to Address', (done) => {
        fixture.testSendEmailToAddress(done);
    });
    test('Send Email to Recipients', (done) => {
        fixture.testSendEmailToRecipients(done);
    });
});
//# sourceMappingURL=EmailLambdaClientV1.test.js.map