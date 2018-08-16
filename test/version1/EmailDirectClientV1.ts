let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-components-node';

import { EmailController } from 'pip-services-email-node';
import { IEmailClientV1 } from '../../src/version1/IEmailClientV1';
import { EmailDirectClientV1 } from '../../src/version1/EmailDirectClientV1';
import { EmailClientFixtureV1 } from './EmailClientFixtureV1';

suite('EmailDirectClientV1', ()=> {
    let client: EmailDirectClientV1;
    let fixture: EmailClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let controller = new EmailController();
        controller.configure(new ConfigParams());

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-email', 'controller', 'default', 'default', '1.0'), controller,
        );
        controller.setReferences(references);

        client = new EmailDirectClientV1();
        client.setReferences(references);

        fixture = new EmailClientFixtureV1(client);

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
