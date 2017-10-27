import { ConfigParams } from 'pip-services-commons-node';

import { IEmailDeliveryClientV1 } from './IEmailDeliveryClientV1';
import { EmailMessageV1 } from './EmailMessageV1';
import { EmailRecipientV1 } from './EmailRecipientV1';

export class EmailDeliveryNullClientV1 implements IEmailDeliveryClientV1 {

    public sendMessage(correlationId: string, message: EmailMessageV1, parameters: ConfigParams,
        callback?: (err: any) => void): void {
        if (callback) callback(null);
    }

    public sendMessageToRecipient(correlationId: string, recipient: EmailRecipientV1,
        message: EmailMessageV1, parameters: ConfigParams, callback?: (err: any) => void) {
        if (callback) callback(null);
    }

    public sendMessageToRecipients(correlationId: string, recipients: EmailRecipientV1[],
        message: EmailMessageV1, parameters: ConfigParams, callback?: (err: any) => void): void {
        if (callback) callback(null);
    }

}