"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;
const pip_services_commons_node_1 = require("pip-services-commons-node");
class EmailClientFixtureV1 {
    constructor(client) {
        this._client = client;
    }
    testSendEmailToAddress(done) {
        let message = {
            to: 'somebody@somewhere.com',
            subject: '{{subject}}',
            text: '{{text}}',
            html: '<p>{{text}}</p>'
        };
        let parameters = pip_services_commons_node_1.ConfigParams.fromTuples('subject', 'Test Email To Address', 'text', 'This is just a test');
        this._client.sendMessage(null, message, parameters, (err) => {
            assert.isNull(err);
            done();
        });
    }
    testSendEmailToRecipients(done) {
        let message = {
            subject: 'Test Email To Recipient',
            text: 'This is just a test'
        };
        let recipient = {
            id: '1',
            email: 'somebody@somewhere.com',
            name: 'Test Recipient'
        };
        this._client.sendMessageToRecipient(null, recipient, message, null, (err) => {
            assert.isNull(err);
            done();
        });
    }
}
exports.EmailClientFixtureV1 = EmailClientFixtureV1;
//# sourceMappingURL=EmailClientFixtureV1.js.map