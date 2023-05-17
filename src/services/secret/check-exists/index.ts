import { SecretFS } from '../../../data/file-system/index.js';

export class SecretCheckExists {
	constructor(private readonly secrets: SecretFS) {}

	public handle = (key: string): boolean => {
		return this.secrets.has(key);
	};
}
