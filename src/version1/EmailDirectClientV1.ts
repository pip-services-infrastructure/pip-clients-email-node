import { ConfigParams } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { DirectClient } from 'pip-services-rpc-node';

import { IEmailClientV1 } from './IEmailClientV1';
import { EmailMessageV1 } from './EmailMessageV1';
import { EmailRecipientV1 } from './EmailRecipientV1';

//import { IEmailController } from 'pip-services-email-node';

export class EmailDirectClientV1 extends DirectClient<any> implements IEmailClientV1 {
    private _defaultParameters: ConfigParams;

    public constructor(config?: any) {
        super();
        this._dependencyResolver.put('controller', new Descriptor("pip-services-email", "controller", "*", "*", "*"));

        let thisConfig = ConfigParams.fromValue(config);
        this._defaultParameters = thisConfig.getSection('parameters');
        if (config != null) this.configure(thisConfig);
    }
    
    public sendMessage(correlationId: string, message: EmailMessageV1, parameters: ConfigParams,
        callback?: (err: any) => void): void {
        parameters = this._defaultParameters.override(parameters);
        let timing = this.instrument(correlationId, 'email.send_message');
        this._controller.sendMessage(correlationId, message, parameters, (err) => {
            timing.endTiming();
            if (callback) callback(err);
        });
    }

    public sendMessageToRecipient(correlationId: string, recipient: EmailRecipientV1,
        message: EmailMessageV1, parameters: ConfigParams, callback?: (err: any) => void) {
        parameters = this._defaultParameters.override(parameters);
        let timing = this.instrument(correlationId, 'email.send_message_to_recipient');
        this._controller.sendMessageToRecipient(
            correlationId, recipient, message, parameters, 
            (err) => {
                timing.endTiming();
                if (callback) callback(err);
            }
        );
    }

    public sendMessageToRecipients(correlationId: string, recipients: EmailRecipientV1[],
        message: EmailMessageV1, parameters: ConfigParams, callback?: (err: any) => void): void {
        parameters = this._defaultParameters.override(parameters);
        let timing = this.instrument(correlationId, 'email.send_message_to_recipients');
        this._controller.sendMessageToRecipients(
            correlationId, recipients, message, parameters, 
            (err) => {
                timing.endTiming();
                if (callback) callback(err);
            }
        );
    }

}