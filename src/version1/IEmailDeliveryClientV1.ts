import { ConfigParams } from 'pip-services-commons-node';

import { EmailMessageV1 } from './EmailMessageV1';
import { EmailRecipientV1 } from './EmailRecipientV1';

export interface IEmailDeliveryClientV1 {
    sendMessage(correlationId: string, message: EmailMessageV1, parameters: ConfigParams,
        callback?: (err: any) => void): void;
    sendMessageToRecipient(correlationId: string, recipient: EmailRecipientV1,
        message: EmailMessageV1, parameters: ConfigParams, callback?: (err: any) => void);
    sendMessageToRecipients(correlationId: string, recipients: EmailRecipientV1[],
        message: EmailMessageV1, parameters: ConfigParams, callback?: (err: any) => void): void;
}