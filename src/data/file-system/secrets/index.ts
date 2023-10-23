import convict from 'convict';
import { ISecret } from '../../../domain/secrets.js';
import { PGetBaseFS } from '../base/index.js';
import { PasswordLessEncryptionHandler } from '../../../services/secret/password-less-encryption-handler/index.js';

export type SecretsSchema = { readonly [key: string]: ISecret };

export class SecretFS extends PGetBaseFS<SecretsSchema> {
	public readonly passwordlessHandler: PasswordLessEncryptionHandler;

	constructor() {
		super('secrets', convict({}));

		this.passwordlessHandler = new PasswordLessEncryptionHandler();
	}
}
