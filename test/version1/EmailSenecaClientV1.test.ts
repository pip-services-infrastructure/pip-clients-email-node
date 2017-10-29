let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';
import { SenecaInstance } from 'pip-services-net-node';

import { EmailController } from 'pip-services-email-node';
import { EmailSenecaServiceV1 } from 'pip-services-email-node';
import { IEmailClientV1 } from '../../src/version1/IEmailClientV1';
import { EmailSenecaClientV1 } from '../../src/version1/EmailSenecaClientV1';
import { EmailClientFixtureV1 } from './EmailClientFixtureV1';

let senecaConfig = ConfigParams.fromTuples(
    "connection.protocol", "none"
);

suite('EmailSenecaClient', () => {
    let service: EmailSenecaServiceV1;
    let client: EmailSenecaClientV1;
    let fixture: EmailClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let controller = new EmailController();
        controller.configure(new ConfigParams());

        service = new EmailSenecaServiceV1();
        service.configure(senecaConfig);
        let seneca = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), seneca,
            new Descriptor('pip-services-email', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-email', 'service', 'seneca', 'default', '1.0'), service
        );
        seneca.setReferences(references);
        controller.setReferences(references);
        service.setReferences(references);

        client = new EmailSenecaClientV1();
        client.configure(senecaConfig);
        client.setReferences(references);

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
