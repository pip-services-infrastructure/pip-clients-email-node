let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { EmailMessageV1 } from '../../src/version1/EmailMessageV1';
import { EmailRecipientV1 } from '../../src/version1/EmailRecipientV1';
import { IEmailClientV1 } from '../../src/version1/IEmailClientV1';

export class EmailClientFixtureV1 {
    private _client: IEmailClientV1;
    
    constructor(client: IEmailClientV1) {
        this._client = client;
    }

    public testSendEmailToAddress(done) {
        let message =  <EmailMessageV1> {
            to: 'somebody@somewhere.com',
            subject: '{{subject}}',
            text: '{{text}}',
            html: '<p>{{text}}</p>'
        };

        let parameters = ConfigParams.fromTuples(
            'subject', 'Test Email To Address',
            'text', 'This is just a test'
        );

        this._client.sendMessage(
            null, message, parameters,
            (err) => {
                assert.isNull(err);
                done();
            }
        );
    }

    public testSendEmailToRecipients(done) {
        let message =  <EmailMessageV1> {
            subject: 'Test Email To Recipient',
            text: 'This is just a test'
        };

        let recipient = <EmailRecipientV1> {
            id: '1',
            email: 'somebody@somewhere.com',
            name: 'Test Recipient'
        };

        this._client.sendMessageToRecipient(
            null, recipient, message, null,
            (err) => {
                assert.isNull(err);
                done();
            }
        );
    }
        
}
