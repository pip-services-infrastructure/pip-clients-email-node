"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmailDeliveryNullClientV1 {
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
exports.EmailDeliveryNullClientV1 = EmailDeliveryNullClientV1;
//# sourceMappingURL=EmailDeliveryNullClientV1.js.map