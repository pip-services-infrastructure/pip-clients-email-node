let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';

import { EmailDeliveryController } from 'pip-services-emaildelivery-node';
import { EmailDeliveryHttpServiceV1 } from 'pip-services-emaildelivery-node';
import { IEmailDeliveryClientV1 } from '../../src/version1/IEmailDeliveryClientV1';
import { EmailDeliveryHttpClientV1 } from '../../src/version1/EmailDeliveryHttpClientV1';
import { EmailDeliveryClientFixtureV1 } from './EmailDeliveryClientFixtureV1';

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('EmailDeliveryHttpClientV1', ()=> {
    let service: EmailDeliveryHttpServiceV1;
    let client: EmailDeliveryHttpClientV1;
    let fixture: EmailDeliveryClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let controller = new EmailDeliveryController();
        controller.configure(new ConfigParams());

        service = new EmailDeliveryHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-emaildelivery', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-emaildelivery', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        client = new EmailDeliveryHttpClientV1();
        client.setReferences(references);
        client.configure(httpConfig);

        fixture = new EmailDeliveryClientFixtureV1(client);

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
