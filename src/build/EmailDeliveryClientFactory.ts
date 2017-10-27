import { Descriptor } from 'pip-services-commons-node';
import { Factory } from 'pip-services-commons-node';

import { EmailDeliveryNullClientV1 } from '../version1/EmailDeliveryNullClientV1';
import { EmailDeliveryDirectClientV1 } from '../version1/EmailDeliveryDirectClientV1';
import { EmailDeliveryHttpClientV1 } from '../version1/EmailDeliveryHttpClientV1';
import { EmailDeliverySenecaClientV1 } from '../version1/EmailDeliverySenecaClientV1';

export class EmailDeliveryClientFactory extends Factory {
	public static Descriptor: Descriptor = new Descriptor('pip-services-emaildelivery', 'factory', 'default', 'default', '1.0');
	public static NullClientV1Descriptor = new Descriptor('pip-services-emaildelivery', 'client', 'null', 'default', '1.0');
	public static DirectClientV1Descriptor = new Descriptor('pip-services-emaildelivery', 'client', 'direct', 'default', '1.0');
	public static HttpClientV1Descriptor = new Descriptor('pip-services-emaildelivery', 'client', 'http', 'default', '1.0');
	public static SenecaClientV1Descriptor = new Descriptor('pip-services-emaildelivery', 'client', 'seneca', 'default', '1.0');
	
	constructor() {
		super();

		this.registerAsType(EmailDeliveryClientFactory.NullClientV1Descriptor, EmailDeliveryNullClientV1);
		this.registerAsType(EmailDeliveryClientFactory.DirectClientV1Descriptor, EmailDeliveryDirectClientV1);
		this.registerAsType(EmailDeliveryClientFactory.HttpClientV1Descriptor, EmailDeliveryHttpClientV1);
		this.registerAsType(EmailDeliveryClientFactory.SenecaClientV1Descriptor, EmailDeliverySenecaClientV1);
	}
	
}
