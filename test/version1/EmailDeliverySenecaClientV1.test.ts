let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';
import { SenecaInstance } from 'pip-services-net-node';

import { EmailDeliveryController } from 'pip-services-emaildelivery-node';
import { EmailDeliverySenecaServiceV1 } from 'pip-services-emaildelivery-node';
import { IEmailDeliveryClientV1 } from '../../src/version1/IEmailDeliveryClientV1';
import { EmailDeliverySenecaClientV1 } from '../../src/version1/EmailDeliverySenecaClientV1';
import { EmailDeliveryClientFixtureV1 } from './EmailDeliveryClientFixtureV1';

let senecaConfig = ConfigParams.fromTuples(
    "connection.protocol", "none"
);

suite('EmailDeliverySenecaClient', () => {
    let service: EmailDeliverySenecaServiceV1;
    let client: EmailDeliverySenecaClientV1;
    let fixture: EmailDeliveryClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let controller = new EmailDeliveryController();
        controller.configure(new ConfigParams());

        service = new EmailDeliverySenecaServiceV1();
        service.configure(senecaConfig);
        let seneca = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), seneca,
            new Descriptor('pip-services-emaildelivery', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-emaildelivery', 'service', 'seneca', 'default', '1.0'), service
        );
        seneca.setReferences(references);
        controller.setReferences(references);
        service.setReferences(references);

        client = new EmailDeliverySenecaClientV1();
        client.configure(senecaConfig);
        client.setReferences(references);

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
