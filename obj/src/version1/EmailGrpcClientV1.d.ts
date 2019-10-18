import { ConfigParams } from 'pip-services3-commons-node';
import { GrpcClient } from 'pip-services3-grpc-node';
import { IEmailClientV1 } from './IEmailClientV1';
import { EmailMessageV1 } from './EmailMessageV1';
import { EmailRecipientV1 } from './EmailRecipientV1';
export declare class EmailGrpcClientV1 extends GrpcClient implements IEmailClientV1 {
    private _defaultParameters;
    constructor(config?: any);
    sendMessage(correlationId: string, message: EmailMessageV1, parameters: ConfigParams, callback?: (err: any) => void): void;
    sendMessageToRecipient(correlationId: string, recipient: EmailRecipientV1, message: EmailMessageV1, parameters: ConfigParams, callback?: (err: any) => void): void;
    sendMessageToRecipients(correlationId: string, recipients: EmailRecipientV1[], message: EmailMessageV1, parameters: ConfigParams, callback?: (err: any) => void): void;
}
