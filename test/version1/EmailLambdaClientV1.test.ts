let process = require('process');

import { ConfigParams } from 'pip-services-commons-node';

import { EmailClientFixtureV1 } from './EmailClientFixtureV1';
import { EmailLambdaClientV1 } from '../../src/version1/EmailLambdaClientV1';

suite('EmailLambdaClient', ()=> {
    let awsAccessId = process.env['AWS_ACCESS_ID'];
    let awsAccessKey = process.env['AWS_ACCESS_KEY'];
    let awsArn = process.env['AWS_ARN'];

    // Skip if connection is not configured
    if (awsAccessId == null || awsArn == null) return;

    let client: EmailLambdaClientV1;
    let fixture: EmailClientFixtureV1;

    setup((done) => {
        client = new EmailLambdaClientV1();

        client.configure(ConfigParams.fromTuples(
            'connection.protocol', 'aws',
            'connection.arn', awsArn,
            'credential.access_id', awsAccessId,
            'credential.access_key', awsAccessKey
        ));

        fixture = new EmailClientFixtureV1(client);

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