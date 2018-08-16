"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_rpc_node_1 = require("pip-services-rpc-node");
class EmailHttpClientV1 extends pip_services_rpc_node_1.CommandableHttpClient {
    constructor(config) {
        super('v1/email');
        let thisConfig = pip_services_commons_node_1.ConfigParams.fromValue(config);
        this._defaultParameters = thisConfig.getSection('parameters');
        if (config != null)
            this.configure(thisConfig);
    }
    sendMessage(correlationId, message, parameters, callback) {
        parameters = this._defaultParameters.override(parameters);
        this.callCommand('send_message', correlationId, {
            message: message,
            parameters: parameters
        }, callback);
    }
    sendMessageToRecipient(correlationId, recipient, message, parameters, callback) {
        parameters = this._defaultParameters.override(parameters);
        this.callCommand('send_message_to_recipient', correlationId, {
            recipient: recipient,
            message: message,
            parameters: parameters
        }, callback);
    }
    sendMessageToRecipients(correlationId, recipients, message, parameters, callback) {
        parameters = this._defaultParameters.override(parameters);
        this.callCommand('send_message_to_recipients', correlationId, {
            recipients: recipients,
            message: message,
            parameters: parameters
        }, callback);
    }
}
exports.EmailHttpClientV1 = EmailHttpClientV1;
//# sourceMappingURL=EmailHttpClientV1.js.map