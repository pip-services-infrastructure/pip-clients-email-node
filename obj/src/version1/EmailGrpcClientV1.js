"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let services = require('../../../src/protos/email_v1_grpc_pb');
let messages = require('../../../src/protos/email_v1_pb');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_grpc_node_1 = require("pip-services3-grpc-node");
const EmailGrpcConverterV1_1 = require("./EmailGrpcConverterV1");
class EmailGrpcClientV1 extends pip_services3_grpc_node_1.GrpcClient {
    constructor(config) {
        super(services.EmailClient);
        let thisConfig = pip_services3_commons_node_1.ConfigParams.fromValue(config);
        this._defaultParameters = thisConfig.getSection('parameters');
        if (config != null)
            this.configure(thisConfig);
    }
    sendMessage(correlationId, message, parameters, callback) {
        parameters = this._defaultParameters.override(parameters);
        let request = new messages.EmailMessageRequest();
        request.setMessage(EmailGrpcConverterV1_1.EmailGrpcConverterV1.fromMessage(message));
        EmailGrpcConverterV1_1.EmailGrpcConverterV1.setMap(request.getParametersMap(), parameters);
        let timing = this.instrument(correlationId, 'email.send_message');
        this.call('send_message', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = EmailGrpcConverterV1_1.EmailGrpcConverterV1.toError(response.error);
            callback(err);
        });
    }
    sendMessageToRecipient(correlationId, recipient, message, parameters, callback) {
        parameters = this._defaultParameters.override(parameters);
        let request = new messages.EmailMessageWithRecipientRequest();
        request.setMessage(EmailGrpcConverterV1_1.EmailGrpcConverterV1.fromMessage(message));
        EmailGrpcConverterV1_1.EmailGrpcConverterV1.setMap(request.getParametersMap(), parameters);
        request.setRecipient(EmailGrpcConverterV1_1.EmailGrpcConverterV1.fromRecipient(recipient));
        let timing = this.instrument(correlationId, 'email.send_message_to_recipient');
        this.call('send_message_to_recipient', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = EmailGrpcConverterV1_1.EmailGrpcConverterV1.toError(response.error);
            callback(err);
        });
    }
    sendMessageToRecipients(correlationId, recipients, message, parameters, callback) {
        parameters = this._defaultParameters.override(parameters);
        let request = new messages.EmailMessageWithRecipientsRequest();
        request.setMessage(EmailGrpcConverterV1_1.EmailGrpcConverterV1.fromMessage(message));
        EmailGrpcConverterV1_1.EmailGrpcConverterV1.setMap(request.getParametersMap(), parameters);
        request.setRecipientList(EmailGrpcConverterV1_1.EmailGrpcConverterV1.fromRecipients(recipients));
        let timing = this.instrument(correlationId, 'email.send_message_to_recipients');
        this.call('send_message_to_recipients', correlationId, request, (err, response) => {
            timing.endTiming();
            if (err == null && response.error != null)
                err = EmailGrpcConverterV1_1.EmailGrpcConverterV1.toError(response.error);
            callback(err);
        });
    }
}
exports.EmailGrpcClientV1 = EmailGrpcClientV1;
//# sourceMappingURL=EmailGrpcClientV1.js.map