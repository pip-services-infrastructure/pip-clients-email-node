let _ = require('lodash');
let services = require('../../../src/protos/email_v1_grpc_pb');
let messages = require('../../../src/protos/email_v1_pb');

import { ConfigParams } from 'pip-services3-commons-node';
import { GrpcClient } from 'pip-services3-grpc-node';

import { IEmailClientV1 } from './IEmailClientV1';
import { EmailMessageV1 } from './EmailMessageV1';
import { EmailRecipientV1 } from './EmailRecipientV1';
import { EmailGrpcConverterV1 } from './EmailGrpcConverterV1';

export class EmailGrpcClientV1 extends GrpcClient implements IEmailClientV1 {
    private _defaultParameters: ConfigParams;
        
    constructor(config?: any) {
        super(services.EmailClient);

        let thisConfig = ConfigParams.fromValue(config);
        this._defaultParameters = thisConfig.getSection('parameters');
        if (config != null) this.configure(thisConfig);
    }

    public sendMessage(correlationId: string, message: EmailMessageV1, parameters: ConfigParams,
        callback?: (err: any) => void): void {
        parameters = this._defaultParameters.override(parameters);

        let request = new messages.EmailMessageRequest();
        request.setMessage(EmailGrpcConverterV1.fromMessage(message));
        EmailGrpcConverterV1.setMap(request.getParametersMap(), parameters);

        let timing = this.instrument(correlationId, 'email.send_message');

        this.call('send_message',
            correlationId,
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = EmailGrpcConverterV1.toError(response.error);

                callback(err);
            }
        );        
    }

    public sendMessageToRecipient(correlationId: string, recipient: EmailRecipientV1,
        message: EmailMessageV1, parameters: ConfigParams, callback?: (err: any) => void) {
        parameters = this._defaultParameters.override(parameters);

        let request = new messages.EmailMessageWithRecipientRequest();
        request.setMessage(EmailGrpcConverterV1.fromMessage(message));
        EmailGrpcConverterV1.setMap(request.getParametersMap(), parameters);
        request.setRecipient(EmailGrpcConverterV1.fromRecipient(recipient));

        let timing = this.instrument(correlationId, 'email.send_message_to_recipient');

        this.call('send_message_to_recipient',
            correlationId,
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = EmailGrpcConverterV1.toError(response.error);

                callback(err);
            }
        );        
    }

    public sendMessageToRecipients(correlationId: string, recipients: EmailRecipientV1[],
        message: EmailMessageV1, parameters: ConfigParams, callback?: (err: any) => void): void {
        parameters = this._defaultParameters.override(parameters);

        let request = new messages.EmailMessageWithRecipientsRequest();
        request.setMessage(EmailGrpcConverterV1.fromMessage(message));
        EmailGrpcConverterV1.setMap(request.getParametersMap(), parameters);
        request.setRecipientList(EmailGrpcConverterV1.fromRecipients(recipients));

        let timing = this.instrument(correlationId, 'email.send_message_to_recipients');

        this.call('send_message_to_recipients',
            correlationId,
            request, 
            (err, response) => {
                timing.endTiming();

                if (err == null && response.error != null)
                    err = EmailGrpcConverterV1.toError(response.error);

                callback(err);
            }
        );        
    }

}
