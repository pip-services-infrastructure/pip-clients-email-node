import { Descriptor } from 'pip-services3-commons-node';
import { Factory } from 'pip-services3-components-node';

import { EmailNullClientV1 } from '../version1/EmailNullClientV1';
import { EmailDirectClientV1 } from '../version1/EmailDirectClientV1';
import { EmailHttpClientV1 } from '../version1/EmailHttpClientV1';

export class EmailClientFactory extends Factory {
	public static Descriptor: Descriptor = new Descriptor('pip-services-email', 'factory', 'default', 'default', '1.0');
	public static NullClientV1Descriptor = new Descriptor('pip-services-email', 'client', 'null', 'default', '1.0');
	public static DirectClientV1Descriptor = new Descriptor('pip-services-email', 'client', 'direct', 'default', '1.0');
	public static HttpClientV1Descriptor = new Descriptor('pip-services-email', 'client', 'http', 'default', '1.0');
	
	constructor() {
		super();

		this.registerAsType(EmailClientFactory.NullClientV1Descriptor, EmailNullClientV1);
		this.registerAsType(EmailClientFactory.DirectClientV1Descriptor, EmailDirectClientV1);
		this.registerAsType(EmailClientFactory.HttpClientV1Descriptor, EmailHttpClientV1);
	}
	
}
