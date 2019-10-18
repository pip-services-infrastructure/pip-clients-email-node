"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmailNullClientV1 {
    sendMessage(correlationId, message, parameters, callback) {
        if (callback)
            callback(null);
    }
    sendMessageToRecipient(correlationId, recipient, message, parameters, callback) {
        if (callback)
            callback(null);
    }
    sendMessageToRecipients(correlationId, recipients, message, parameters, callback) {
        if (callback)
            callback(null);
    }
}
exports.EmailNullClientV1 = EmailNullClientV1;
//# sourceMappingURL=EmailNullClientV1.js.map