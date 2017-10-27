import { ConfigParams } from 'pip-services-commons-node';
import { DirectClient } from 'pip-services-net-node';
import { IEmailDeliveryClientV1 } from './IEmailDeliveryClientV1';
import { EmailMessageV1 } from './EmailMessageV1';
import { EmailRecipientV1 } from './EmailRecipientV1';
export declare class EmailDeliveryDirectClientV1 extends DirectClient<any> implements IEmailDeliveryClientV1 {
    private _defaultParameters;
    constructor(config?: any);
    sendMessage(correlationId: string, message: EmailMessageV1, parameters: ConfigParams, callback?: (err: any) => void): void;
    sendMessageToRecipient(correlationId: string, recipient: EmailRecipientV1, message: EmailMessageV1, parameters: ConfigParams, callback?: (err: any) => void): void;
    sendMessageToRecipients(correlationId: string, recipients: EmailRecipientV1[], message: EmailMessageV1, parameters: ConfigParams, callback?: (err: any) => void): void;
}
