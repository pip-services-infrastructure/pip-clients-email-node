"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let process = require('process');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const EmailClientFixtureV1_1 = require("./EmailClientFixtureV1");
const EmailLambdaClientV1_1 = require("../../src/version1/EmailLambdaClientV1");
suite('EmailLambdaClient', () => {
    let awsAccessId = process.env['AWS_ACCESS_ID'];
    let awsAccessKey = process.env['AWS_ACCESS_KEY'];
    let awsArn = process.env['AWS_ARN'];
    // Skip if connection is not configured
    if (awsAccessId == null || awsArn == null)
        return;
    let client;
    let fixture;
    setup((done) => {
        client = new EmailLambdaClientV1_1.EmailLambdaClientV1();
        client.configure(pip_services_commons_node_1.ConfigParams.fromTuples('connection.protocol', 'aws', 'connection.arn', awsArn, 'credential.access_id', awsAccessId, 'credential.access_key', awsAccessKey));
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