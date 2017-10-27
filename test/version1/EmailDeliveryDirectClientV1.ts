let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';

import { EmailDeliveryController } from 'pip-services-emaildelivery-node';
import { IEmailDeliveryClientV1 } from '../../src/version1/IEmailDeliveryClientV1';
import { EmailDeliveryDirectClientV1 } from '../../src/version1/EmailDeliveryDirectClientV1';
import { EmailDeliveryClientFixtureV1 } from './EmailDeliveryClientFixtureV1';

suite('EmailDeliveryDirectClientV1', ()=> {
    let client: EmailDeliveryDirectClientV1;
    let fixture: EmailDeliveryClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let controller = new EmailDeliveryController();
        controller.configure(new ConfigParams());

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-emaildelivery', 'controller', 'default', 'default', '1.0'), controller,
        );
        controller.setReferences(references);

        client = new EmailDeliveryDirectClientV1();
        client.setReferences(references);

        fixture = new EmailDeliveryClientFixtureV1(client);

        client.open(null, done);
    });
    
    suiteTeardown((done) => {
        client.close(null, done);
    });

    test('Send Email to Address', (done) => {
        fixture.testSendEmailToAddress(done);
    });

    test('Send Email to Recipients', (done) => {
        fixture.testSendEmailToRecipients(done);
    });

});
