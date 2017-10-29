import { ConfigParams } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { CommandableLambdaClient } from 'pip-services-aws-node';

import { EmailMessageV1 } from './EmailMessageV1';
import { EmailRecipientV1 } from './EmailRecipientV1';
import { IEmailClientV1 } from './IEmailClientV1';

export class EmailLambdaClientV1 extends CommandableLambdaClient implements IEmailClientV1 {
    private _defaultParameters: ConfigParams;

    constructor(config?: any) {
        super('email');

        let thisConfig = ConfigParams.fromValue(config);
        this._defaultParameters = thisConfig.getSection('parameters');
        if (config != null) this.configure(thisConfig);
    }

    public sendMessage(correlationId: string, message: EmailMessageV1, parameters: ConfigParams,
        callback?: (err: any) => void): void {
        parameters = this._defaultParameters.override(parameters);
        this.callCommand(
            'send_message',
            correlationId,
            {
                message: message,
                parameters: parameters
            },
            callback
        );
    }

    public sendMessageToRecipient(correlationId: string, recipient: EmailRecipientV1,
        message: EmailMessageV1, parameters: ConfigParams, callback?: (err: any) => void) {
        parameters = this._defaultParameters.override(parameters);
        this.callCommand(
            'send_message_to_recipient',
            correlationId,
            {
                recipient: recipient,
                message: message,
                parameters: parameters
            },
            callback
        );
    }

    public sendMessageToRecipients(correlationId: string, recipients: EmailRecipientV1[],
        message: EmailMessageV1, parameters: ConfigParams, callback?: (err: any) => void): void {
        parameters = this._defaultParameters.override(parameters);
        this.callCommand(
            'send_message_to_recipients',
            correlationId,
            {
                recipients: recipients,
                message: message,
                parameters: parameters
            },
            callback
        );
    }

}
