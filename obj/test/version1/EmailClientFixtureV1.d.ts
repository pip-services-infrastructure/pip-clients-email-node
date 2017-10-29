import { IEmailClientV1 } from '../../src/version1/IEmailClientV1';
export declare class EmailClientFixtureV1 {
    private _client;
    constructor(client: IEmailClientV1);
    testSendEmailToAddress(done: any): void;
    testSendEmailToRecipients(done: any): void;
}
