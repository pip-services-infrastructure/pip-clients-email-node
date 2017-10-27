import { ConfigParams } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { DirectClient } from 'pip-services-net-node';

import { IEmailDeliveryClientV1 } from './IEmailDeliveryClientV1';
import { EmailMessageV1 } from './EmailMessageV1';
import { EmailRecipientV1 } from './EmailRecipientV1';

//import { IEmailDeliveryController } from 'pip-services-emaildelivery-node';

export class EmailDeliveryDirectClientV1 extends DirectClient<any> implements IEmailDeliveryClientV1 {
    private _defaultParameters: ConfigParams;

    public constructor(config?: any) {
        super();
        this._dependencyResolver.put('controller', new Descriptor("pip-services-emaildelivery", "controller", "*", "*", "*"));

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