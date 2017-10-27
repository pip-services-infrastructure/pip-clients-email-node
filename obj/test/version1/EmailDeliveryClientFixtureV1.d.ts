import { IEmailDeliveryClientV1 } from '../../src/version1/IEmailDeliveryClientV1';
export declare class EmailDeliveryClientFixtureV1 {
    private _client;
    constructor(client: IEmailDeliveryClientV1);
    testSendEmailToAddress(done: any): void;
    testSendEmailToRecipients(done: any): void;
}
