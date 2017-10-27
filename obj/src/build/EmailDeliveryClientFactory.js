"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const EmailDeliveryNullClientV1_1 = require("../version1/EmailDeliveryNullClientV1");
const EmailDeliveryDirectClientV1_1 = require("../version1/EmailDeliveryDirectClientV1");
const EmailDeliveryHttpClientV1_1 = require("../version1/EmailDeliveryHttpClientV1");
const EmailDeliverySenecaClientV1_1 = require("../version1/EmailDeliverySenecaClientV1");
class EmailDeliveryClientFactory extends pip_services_commons_node_2.Factory {
    constructor() {
        super();
        this.registerAsType(EmailDeliveryClientFactory.NullClientV1Descriptor, EmailDeliveryNullClientV1_1.EmailDeliveryNullClientV1);
        this.registerAsType(EmailDeliveryClientFactory.DirectClientV1Descriptor, EmailDeliveryDirectClientV1_1.EmailDeliveryDirectClientV1);
        this.registerAsType(EmailDeliveryClientFactory.HttpClientV1Descriptor, EmailDeliveryHttpClientV1_1.EmailDeliveryHttpClientV1);
        this.registerAsType(EmailDeliveryClientFactory.SenecaClientV1Descriptor, EmailDeliverySenecaClientV1_1.EmailDeliverySenecaClientV1);
    }
}
EmailDeliveryClientFactory.Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-emaildelivery', 'factory', 'default', 'default', '1.0');
EmailDeliveryClientFactory.NullClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-emaildelivery', 'client', 'null', 'default', '1.0');
EmailDeliveryClientFactory.DirectClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-emaildelivery', 'client', 'direct', 'default', '1.0');
EmailDeliveryClientFactory.HttpClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-emaildelivery', 'client', 'http', 'default', '1.0');
EmailDeliveryClientFactory.SenecaClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-emaildelivery', 'client', 'seneca', 'default', '1.0');
exports.EmailDeliveryClientFactory = EmailDeliveryClientFactory;
//# sourceMappingURL=EmailDeliveryClientFactory.js.map