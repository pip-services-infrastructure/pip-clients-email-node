import { Descriptor } from 'pip-services3-commons-node';
import { Factory } from 'pip-services3-components-node';

import { EmailNullClientV1 } from '../version1/EmailNullClientV1';
import { EmailDirectClientV1 } from '../version1/EmailDirectClientV1';
import { EmailHttpClientV1 } from '../version1/EmailHttpClientV1';
import { EmailLambdaClientV1 } from '../version1/EmailLambdaClientV1';
import { EmailCommandableGrpcClientV1 } from '../version1/EmailCommandableGrpcClientV1';
import { EmailGrpcClientV1 } from '../version1/EmailGrpcClientV1';

export class EmailClientFactory extends Factory {
	public static Descriptor: Descriptor = new Descriptor('pip-services-email', 'factory', 'default', 'default', '1.0');
	public static NullClientV1Descriptor = new Descriptor('pip-services-email', 'client', 'null', 'default', '1.0');
	public static DirectClientV1Descriptor = new Descriptor('pip-services-email', 'client', 'direct', 'default', '1.0');
	public static HttpClientV1Descriptor = new Descriptor('pip-services-email', 'client', 'http', 'default', '1.0');
	public static LambdaClientV1Descriptor = new Descriptor('pip-services-email', 'client', 'lambda', 'default', '1.0');
	public static CommandableGrpcClientV1Descriptor = new Descriptor('pip-services-email', 'client', 'commandable-grpc', 'default', '1.0');
	public static GrpcClientV1Descriptor = new Descriptor('pip-services-email', 'client', 'grpc', 'default', '1.0');
	
	constructor() {
		super();

		this.registerAsType(EmailClientFactory.NullClientV1Descriptor, EmailNullClientV1);
		this.registerAsType(EmailClientFactory.DirectClientV1Descriptor, EmailDirectClientV1);
		this.registerAsType(EmailClientFactory.HttpClientV1Descriptor, EmailHttpClientV1);
		this.registerAsType(EmailClientFactory.LambdaClientV1Descriptor, EmailLambdaClientV1);
		this.registerAsType(EmailClientFactory.CommandableGrpcClientV1Descriptor, EmailCommandableGrpcClientV1);
		this.registerAsType(EmailClientFactory.GrpcClientV1Descriptor, EmailGrpcClientV1);
	}
	
}
