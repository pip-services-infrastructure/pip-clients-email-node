"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let process = require('process');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const EmailDeliveryClientFixtureV1_1 = require("./EmailDeliveryClientFixtureV1");
const EmailDeliveryLambdaClientV1_1 = require("../../src/version1/EmailDeliveryLambdaClientV1");
suite('EmailDeliveryLambdaClient', () => {
    let awsAccessId = process.env['AWS_ACCESS_ID'];
    let awsAccessKey = process.env['AWS_ACCESS_KEY'];
    let awsArn = process.env['AWS_ARN'];
    // Skip if connection is not configured
    if (awsAccessId == null || awsArn == null)
        return;
    let client;
    let fixture;
    setup((done) => {
        client = new EmailDeliveryLambdaClientV1_1.EmailDeliveryLambdaClientV1();
        client.configure(pip_services_commons_node_1.ConfigParams.fromTuples('connection.protocol', 'aws', 'connection.arn', awsArn, 'credential.access_id', awsAccessId, 'credential.access_key', awsAccessKey));
        fixture = new EmailDeliveryClientFixtureV1_1.EmailDeliveryClientFixtureV1(client);
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
//# sourceMappingURL=EmailDeliveryLambdaClientV1.test.js.map