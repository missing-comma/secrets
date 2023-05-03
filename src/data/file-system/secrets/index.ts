import convict from 'convict';
import {ISecret} from '../../../domain/secrets.js';
import {PGetBaseFS} from '../base/index.js';

export type SecretsSchema = {readonly [key: string]: ISecret};

export class SecretFS extends PGetBaseFS<SecretsSchema> {
	constructor() {
		super('secrets', convict({}));
	}
}
