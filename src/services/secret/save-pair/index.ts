import { SecretFS } from '../../../data/file-system/index.js';
import { ISecret } from '../../../domain/secrets.js';
import { encrypt } from './encrypt.js';

type Payload = {
	value: string;
	description: string | null;
};

export class SecretSavePair {
	constructor(private readonly secrets: SecretFS) {}

	public handle = (key: string, password: string | null, payload: Payload) => {
		const secret: ISecret = {
			value: encrypt({
				input: payload.value,
				password,
				passwordLessHandler: this.secrets.passwordlessHandler,
			}),
			description: payload.description,
		};
		this.secrets.set(key, secret);
	};
}
