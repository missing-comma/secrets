import { SecretFS } from '../../../data/file-system/index.js';
import { decrypt } from './decrypt.js';

export class SecretGetValue {
	constructor(private readonly secrets: SecretFS) {}

	public handle = (key: string, password: string) => {
		if (!this.secrets.has(key)) {
			throw new Error(`Unknown key [ ${key} ]`);
		}
		const secret = this.secrets.get(key);
		return decrypt(secret.value, password);
	};
}
