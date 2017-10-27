let process = require('process');

import { ConfigParams } from 'pip-services-commons-node';

import { EmailDeliveryClientFixtureV1 } from './EmailDeliveryClientFixtureV1';
import { EmailDeliveryLambdaClientV1 } from '../../src/version1/EmailDeliveryLambdaClientV1';

suite('EmailDeliveryLambdaClient', ()=> {
    let awsAccessId = process.env['AWS_ACCESS_ID'];
    let awsAccessKey = process.env['AWS_ACCESS_KEY'];
    let awsArn = process.env['AWS_ARN'];

    // Skip if connection is not configured
    if (awsAccessId == null || awsArn == null) return;

    let client: EmailDeliveryLambdaClientV1;
    let fixture: EmailDeliveryClientFixtureV1;

    setup((done) => {
        client = new EmailDeliveryLambdaClientV1();

        client.configure(ConfigParams.fromTuples(
            'connection.protocol', 'aws',
            'connection.arn', awsArn,
            'credential.access_id', awsAccessId,
            'credential.access_key', awsAccessKey
        ));

        fixture = new EmailDeliveryClientFixtureV1(client);

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