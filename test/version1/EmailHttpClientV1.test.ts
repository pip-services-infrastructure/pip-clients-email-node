let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { EmailController } from 'pip-services-email-node';
import { EmailHttpServiceV1 } from 'pip-services-email-node';
import { IEmailClientV1 } from '../../src/version1/IEmailClientV1';
import { EmailHttpClientV1 } from '../../src/version1/EmailHttpClientV1';
import { EmailClientFixtureV1 } from './EmailClientFixtureV1';

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('EmailHttpClientV1', ()=> {
    let service: EmailHttpServiceV1;
    let client: EmailHttpClientV1;
    let fixture: EmailClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let controller = new EmailController();
        controller.configure(new ConfigParams());

        service = new EmailHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-email', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-email', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        client = new EmailHttpClientV1();
        client.setReferences(references);
        client.configure(httpConfig);

        fixture = new EmailClientFixtureV1(client);

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
